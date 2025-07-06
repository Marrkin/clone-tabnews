import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json(); //Aqui estamos pegando a resposta HTTP e Parseando para json para usar como um objeto js

      //UpdatedAt
      expect(responseBody.updated_at).toBeDefined();
      const parsedDate = new Date(responseBody.updated_at).toISOString(); //Certifica de que realmente é um objeto Date
      expect(responseBody.updated_at).toEqual(parsedDate);

      //DatabaseVersion
      expect(responseBody.dependencies.database.version).toBe("16.0");

      //maxConnections
      expect(responseBody.dependencies.database.max_connections).toBe(100);

      //activeConnections
      expect(responseBody.dependencies.database.opened_connections).toBe(1);
    });
  });
});
