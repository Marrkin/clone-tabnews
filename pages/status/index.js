import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Página de Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI, {
    //O primeiro param no useSWR é a key, e ela é injetada na função fetcher!
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText} </div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading) {
    return (
      <>
        <br /> Carregando...
      </>
    );
  }
  return (
    <>
      <br />
      <b>Database</b>
      <br />
      Version: {data.dependencies.database.version}
      <br />
      Max connections: {data.dependencies.database.max_connections}
      <br />
      Opened connections: {data.dependencies.database.opened_connections}
    </>
  );
}
