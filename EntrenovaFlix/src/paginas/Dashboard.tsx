import Card from "../componentes/layout/dashboardColab/CardColab";
import CardUsuario from "../componentes/layout/dashboardColab/CardUsuario";
import "../styles/dashboard.css";
import CardConquistas from "../componentes/layout/dashboardColab/CardConquistas";
import { useEffect, useState } from "react";
import aprimoramentoService from "../services/aprimoramentoService";
import GraficoHobbies from "../componentes/layout/dashboardColab/GraficoHobbies";

function Dashboard() {
  const recommendedCategory = JSON.parse(
    localStorage.getItem("recommendedCategory") || "null"
  );

  const diagnosticSkills = JSON.parse(
    localStorage.getItem("diagnosticSkills") || "[]"
  );

  const mainRecommendation = localStorage.getItem("mainRecommendation");

  const [respostas, setRespostas] = useState<any[]>([]);

  useEffect(() => {
    const carregarRespostas = async () => {
      try {
        const data = await aprimoramentoService.listarRespostas();
        setRespostas(data);
      } catch (e) {
        console.error(e);
      }
    };

    carregarRespostas();
  }, []);

  return (
    <div className="dashboard-colaborador">
      <div className="secao-1">
        <h1 className="titulo-dashboard">Perfil e nível de engajamento</h1>
        <h2 className="legenda">
          Faça mais atividades para desbloquear novos níveis e conquistas!
        </h2>

        <div className="perfil-usuario">
          <CardUsuario nome="Nome usuário" nivel="Nível prata" />
          <CardConquistas />
        </div>

        <div className="cards-colab-engajamento">
          <Card titulo="Como ampliar as vendas online?" subtitulo="Vendas" valor="10%" />
          <Card titulo="Produtividade dos funcionários" subtitulo="Equipe" valor="90%" />
          <Card titulo="Comunicação interna da empresa" subtitulo="Equipe" valor="100%" />
          <Card titulo="Aprendendo a trabalhar em equipe" subtitulo="Equipe" valor="40%" />
        </div>
      </div>

      <h1 className="titulo-dashboard-secao2">Aprimoramento pessoal</h1>

      <div className="secao-2">

        <div className="container-grafico">
            <GraficoHobbies titulo="Hobbies em alta" subtitulo="Mais praticados pelos colaboradores" categorias={["Leitura", "Caminhada", "Desenho", "Cozinhar"]} valores={[20, 30, 21, 24]}/>
        </div>

        {recommendedCategory && (
          <div className="card-aprimoramento">
            <div className="card-aprimoramento-titulo-container">
              <h3 className="card-aprimoramento-titulo">
                Dimensão a ser trabalhada com prioridade:{" "}
              </h3>
              <span
                className="card-aprimoramento-titulo"
                style={{ color: "#5449CC" }}
              >
                {recommendedCategory.title}
              </span>
            </div>

            <div className="card-aprimoramento-texto">
              {mainRecommendation || "Inicie por esta área para gerar impacto rápido."}
            </div>
          </div>
        )}

        <div className="cards-categorias-row">
          {diagnosticSkills.map((item: any) => (
            <div key={item.categoria} className="card-categoria">
              <h4 className="card-aprimoramento-titulo">{item.categoria}</h4>

              <div className="card-categoria-section">
                <strong className="card-aprimoramento-subtitulo">Pontos fortes</strong>
                <p className="card-aprimoramento-texto">
                  {item.fortes.join(" ")}
                </p>
              </div>

              <div className="card-categoria-section">
                <strong className="card-aprimoramento-subtitulo">Pontos a melhorar</strong>
                <p className="card-aprimoramento-texto">
                  {item.fracos.join(" ")}
                </p>
              </div>

              <div className="card-categoria-section">
                <strong className="card-aprimoramento-subtitulo">Soft skills sugeridas</strong>
                <p className="card-aprimoramento-texto">
                  {item.softSkills.join(" ")}
                </p>
              </div>
            </div>
          ))}

          {respostas.map((item: any, index: number) => (
            <div key={index} className="card-categoria">
              <h4 className="card-aprimoramento-titulo">{item.titulo}</h4>
              <p className="card-aprimoramento-texto">{item.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;