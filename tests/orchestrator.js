import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 20,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      await response.json(); //Se retornar um erro, o retry faz ele rodar de novo até que retorne um json
    }
  }
}

export default {
  waitForAllServices,
};
