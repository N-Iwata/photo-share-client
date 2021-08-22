import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GitHubAuth } from "../graphql/mutation";

const AuthrizedUser = () => {
  const history = useHistory();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [githubAuth, { data, loading, error }] = useMutation(GitHubAuth);
  console.log("data: ", data);

  useEffect(() => {
    if (window.location.search.match(/code=/)) {
      setIsSigningIn(true);
      const code = window.location.search.replace("?code=", "");
      githubAuth({
        variables: { code },
        update(cache, result) {
          authorizationComplete(cache, result);
        },
      });
    }
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

  return (
    <>
      {loading ? (
        <p>...loading</p>
      ) : (
        <button onClick={reqestCode} disabled={isSigningIn}>
          SignIn with GitHub
        </button>
      )}
    </>
  );
};

export default AuthrizedUser;
