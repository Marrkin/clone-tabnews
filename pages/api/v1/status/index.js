import database from "infra/database.js";

async function status(request, response) {
  //Aqui é o nosso CONTROLLER
  const updatedAt = new Date().toISOString();

  //dbVersion
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  //maxConnections
  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnectionsResult.rows[0].max_connections;

  //activeConnections
  const databaseName = process.env.POSTGRES_DB;

  const openedConnectionsResult = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1 ;",
    values: [databaseName],
  });

  const openedConnectionsValue = openedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(maxConnectionsValue),
        opened_connections: openedConnectionsValue,
      },
    },
  }); //Aqui é o nosso retorno à VIEW
}

export default status;
