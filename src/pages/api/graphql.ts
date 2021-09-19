import { NextApiResponse, NextApiRequest } from "next";
import { ApolloServer } from "apollo-server-micro";
import { resolvers } from "@gql/Resolvers";
import { typeDefs } from "@gql/TypeDefs";
import { connectToDatabase } from "@util/api/DatabaseManager";

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

  // CORS Preflight Handling
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await connectToDatabase();
  // 이게 도대체 await apolloServer.start()과 무슨 차이가 있길래 이걸로 해야만 성공하는 것일까
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
