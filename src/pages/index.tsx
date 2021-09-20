import { NextPage } from "next";
import { useQuery } from "react-query";
import { gql, request } from "graphql-request";
const Home: NextPage = () => {
  const fetchUsers = async () => {
    return await request(
      "/api/graphql",
      gql`
        query {
          users {
            name
            email
            _id
          }
        }
      `
    );
  };

  const { isLoading, isError, data, error } = useQuery("users", fetchUsers);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Oops... Something went wrong</div>;

  console.log(data);
  return <div>Hello World</div>;
};

export default Home;
