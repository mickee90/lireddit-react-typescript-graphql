import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import {Request, Response} from 'express'

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  // Check why this ain't working.. Backup with :any atm
  // req: Request & { session: Express.Session };
  req: Request & any;
  res: Response;
}