import { up } from "infra/migrations/1742140436096_test-migration";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  if (request.method === "GET") {
    //Instanciar
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dir: join("infra", "migrations"),
      migrationsTable: "pgmigrations",
      direction: "up",
      dryRun: true,
      verbose: true,
    });
    return response.status(200).json(migrations); //Aqui é o nosso retorno à VIEW
  }

  if (request.method === "POST") {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dir: join("infra", "migrations"),
      migrationsTable: "pgmigrations",
      direction: "up",
      dryRun: false,
      verbose: true,
    });
    return response.status(200).json(migrations);
  }

  return response.status(405).end(); //Method not Allowed
}
