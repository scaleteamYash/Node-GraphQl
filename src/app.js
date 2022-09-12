import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import connectDb from "./Db/connectDb";
import typeDefs from "./typeDefs/index";
import resolvers from "./resolvers/index";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import { createServer } from "http";

dotenv.config();

const app = express();
const port = process.env.PORT;

const DATABASE_URL = process.env.DATABASE_URL;
connectDb(DATABASE_URL);

app.use(cors());
app.use("/src", express.static("src"));

const startServer = async () => {
  const httpServer = createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      if (req.header("token")) {
        const loginUser = jwt.verify(
          req.header("token"),
          process.env.JWT_SECRET
        );
        return loginUser;
      }
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startServer();
