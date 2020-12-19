import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core"
import path from "path";
import { User } from "./entities/User";

// export as Parameters<...> works kind of the same way as 
// "as const" below, but it cast the object to exactly what the init
// function expects to recieve
export default { 
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/
  }, 
  entities: [Post, User],
  dbName: "lireddit",
  password: "postgres", 
  type: 'postgresql',
  debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];


// export as const to be more explicit of the exported types.
// without it the dbName and type would be of type string
// export default { 
//   entities: [Post],
//   dbName: 'lireddit',
//   type: 'postgresql',
//   debug: !__prod__
// } as const;