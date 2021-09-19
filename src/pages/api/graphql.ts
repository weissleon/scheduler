import { NextApiResponse, NextApiRequest } from "next";
import { ApolloServer, gql } from "apollo-server-micro";
const typeDefs = gql`
  type Query {
    name: String
  }
`;

const resolvers = {
  Query: {
    name: (parent: any, args: any, context: any) => {
      return "Denis Cho";
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
const startServer = apolloServer.start();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // 이게 무슨 역할인지는 모르겠지만, 그냥 개 중요하다는 것만 알아두자.
  // CORS preflight Request 가 OPTIONS METHOD라는데, 알아봐야 한다.
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  // 이게 도대체 await apolloServer.start()과 무슨 차이가 있길래 이걸로 해야만 성공하는 것일까
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
