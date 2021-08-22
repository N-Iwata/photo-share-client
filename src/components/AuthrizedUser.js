import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GitHubAuth } from "../graphql/mutation";
import { GetAllUsers } from "../graphql/query";

const AuthrizedUser = () => {
  const history = useHistory();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [
    githubAuth,
    {
      data: githubAuthData,
      loading: githubAuthLoading,
      error: githubAuthError,
    },
  ] = useMutation(GitHubAuth);
  const {
    data: getAllUsersData,
    error: getAllUsersError,
    loading: getAllUsersLoading,
    refetch,
  } = useQuery(GetAllUsers);

  useEffect(() => {
    if (window.location.search.match(/code=/)) {
      setIsSigningIn(true);
      const code = window.location.search.replace("?code=", "");
      githubAuth({
        variables: { code },
        update(cache, result) {
          authorizationComplete(cache, result);
        },
        refetchQueries: [GetAllUsers, "GetAllUsers"],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reqestCode = () => {
    const clientID = process.env.REACT_APP_CLIENT_ID;
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
  };

  const authorizationComplete = (cache, { data }) => {
    localStorage.setItem("token", data.githubAuth.token);
    history.replace("/");
    setIsSigningIn(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    refetch();
  };

  if (githubAuthLoading) return <p>...loading</p>;
  if (githubAuthError) return <p>{githubAuthError}</p>;
  if (getAllUsersLoading) return <p>...loading</p>;
  if (getAllUsersError) return <p>{githubAuthError}</p>;

  return (
    <>
      {getAllUsersData && getAllUsersData.me ? (
        <div>
          <img src={getAllUsersData.me.avatar} width={48} height={48} alt="" />
          <h1>{getAllUsersData.me.name}</h1>
          <button onClick={logout}>logout</button>
        </div>
      ) : (
        <button onClick={reqestCode} disabled={isSigningIn}>
          SignIn with GitHub
        </button>
      )}
    </>
  );
};

export default AuthrizedUser;
