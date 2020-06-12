import { postgre } from "./lib.ts";
const Client = postgre.Client;

const Db = new Client({
  user: "postgres",
  password: "latte-a1",
  database: "db",
  hostname: "localhost",
  port: 5432,
});

export { Db };
