import { gql, useQuery } from "@apollo/client";

const GetAllUsers = gql`
  query {
    allUsers {
      githubLogin
      name
      avater
    }
    totalUsers
  }
`;

const Users = () => {
  const { data, error, loading, refetch } = useQuery(GetAllUsers);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <p>{data.totalUsers} Users</p>
      <button onClick={() => refetch()}>Refetch Users</button>
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
