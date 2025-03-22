import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();

  const defaultMigrationsOptions = {
    dbClient: dbClient,
    dir: join("infra", "migrations"),
    migrationsTable: "pgmigrations",
    direction: "up",
    dryRun: true,
    verbose: true,
  };

  if (request.method === "GET") {
    //Instanciar
    const pendingMigrations = await migrationRunner(defaultMigrationsOptions);
    await dbClient.end();
    return response.status(200).json(pendingMigrations); //Aqui é o nosso retorno à VIEW
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    });

    await dbClient.end();
    return migratedMigrations.length == 0
      ? response.status(200).json(migratedMigrations)
      : response.status(201).json(migratedMigrations);
  }

  return response.status(405).end(); //Method not Allowed
}
