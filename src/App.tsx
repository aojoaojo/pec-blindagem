import { useEffect, useState } from "react";
import "./App.css";
import type { vote } from "./types";
import GraficoResultadoGeral from "./components/graph-geral";
import GraficoVotosPorPartido from "./components/graph-por-partido";
import GraficoVotosPorEstado from "./components/graph-por-estado";
import TabelaVotosResponsiva from "./components/table-votes";

function App() {
  const [data, setData] = useState<vote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = window.innerWidth <= 768;
  console.log(import.meta.env.BASE_URL + "/dados-pec-blindagem.json");
  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "/dados-pec-blindagem.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Não foi possível buscar os dados. Status: " + response.status
          );
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setError(null);
      })
      .catch((error) => {
        console.error("Erro ao buscar o arquivo JSON:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="App w-100 d-flex flex-column align-items-center">
      <header className="App-header p-5 mt-3">
        <h1>Dados Carregados do JSON</h1>
      </header>
      <div className="d-flex flex-column align-items-center gap-5 mb-5">
        <div className="d-flex flex-column flex-md-row gap-5 justify-content-center">
          <div>
            <GraficoResultadoGeral isMobile={isMobile} dados={data} />
          </div>
          <div>
            <GraficoVotosPorPartido isMobile={isMobile} dados={data} />
          </div>
        </div>
        <div>
          <GraficoVotosPorEstado isMobile={isMobile} dados={data} />
        </div>
        <div style={{ maxHeight: "800px", overflowY: "auto", width: "90%" }}>
          <TabelaVotosResponsiva dados={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
