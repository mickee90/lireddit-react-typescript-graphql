import "reflect-metadata";

// Enables env variables from .env
require("dotenv").config();

import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config"
import express from "express";
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from "type-graphql"
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";


const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false
    }),
    context: () => ({ em: orm.em })
  });

  apolloServer.applyMiddleware({app})

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  })
  // const post = orm.em.create(Post, {title: "my first post"});
  // await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log(posts);

  // This won't create a new instance of the Post class which means
  // the null fields won't be populated and the migration will fail
  // await orm.em.nativeInsert(Post, {title: "my first post 2"})
}

main().catch(err => {
  console.log(err);
});