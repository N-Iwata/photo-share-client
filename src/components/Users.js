import { useQuery, useMutation } from "@apollo/client";
import { GetAllUsers } from "../graphql/query";
import { AddFakeUsers } from "../graphql/mutation";

const Users = () => {
  const { data, error, loading, refetch } = useQuery(GetAllUsers);
  const [
    addFakeUsers,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(AddFakeUsers, {
    variables: { count: 1 },
    refetchQueries: [GetAllUsers, "getAllUsers"],
  });

  if (loading) return "GetAllUsers Loading...";
  if (error) return `GetAllUsers Error! ${error.message}`;

  if (mutationLoading) return "AddFakeUsers Loading...";
  if (mutationError) return `AddFakeUsers Error! ${mutationError.message}`;

  return (
    <div>
      <p>{data.totalUsers} Users</p>
      <button onClick={() => refetch()}>Refetch Users</button>
      <button onClick={() => addFakeUsers()}>Add Fake Users</button>
      <ul>
        {data.allUsers.map((user) => (
          <li key={user.githubLogin}>
            <img src={user.avater} width={48} height={48} alt="" />
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
