import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsPersonCheckFill, BsCheckCircleFill } from "react-icons/bs";
import api from "../../services/apiService";
import "../../styles/diagnosticoAdmin.css";

import GraficoLinhaProps from "../../componentes/graficos/diagnosticoAdmin";
import GraficoColunaProps from "../../componentes/graficos/trilhasAdmin";
import HobbiesPraticados from "../../componentes/graficos/hobbies";

interface Empresa {
  nome: string;
  total_usuarios: number;
  cnpj: string;
}

function parseNome(raw: string): string {
  // Caso venha como "{'nome': 'Entrenova'}"
  try {
    if (raw.startsWith("{") && raw.endsWith("}")) {
      const parsed = JSON.parse(raw.replace(/'/g, '"'));
      return parsed.nome || raw;
    }
    return raw;
  } catch {
    return raw;
  }
}

function DiagnosticoAdmin() {
  const { cnpj } = useParams();
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const resp = await api.get(`empresas`);
        const empresas: any[] = resp.data;

        const empresaFiltrada = empresas.find(e => e.cnpj === cnpj);

        if (empresaFiltrada) {
          setEmpresa({
            ...empresaFiltrada,
            nome: parseNome(empresaFiltrada.nome),
          });
        } else {
          setEmpresa(null);
        }
      } catch (err) {
        console.error("Erro ao carregar diagnóstico:", err);
        setEmpresa(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresa();
  }, [cnpj]);

  if (loading) {
    return <h1 className="titulo">Carregando diagnóstico...</h1>;
  }

  if (!empresa) {
    return <h1 className="titulo">Empresa não encontrada</h1>;
  }

  return (
    <>
      <h1 className="titulo">Diagnóstico da empresa {empresa.nome}</h1>

      <div className="iconUser">
        <BsPersonCheckFill size={27} />
        <p>{empresa.total_usuarios} Usuários ativos</p>
      </div>

      <div className="graficos-container">
        <GraficoLinhaProps />
        <HobbiesPraticados />
      </div>

      <GraficoColunaProps />

      <div className="card-historico">
        <h1>Histórico de atividade</h1>

        <div className="item-historico">
          <div className="historico-icon">
            <BsCheckCircleFill size={20} />
            <div className="line"></div>
          </div>

          <div className="historico-conteudo">
            <div className="titulo-linha">
              <span className="titulo-atividade">Atividade concluída</span>
              <span className="data">22/09/2025</span>
            </div>

            <p className="descricao">Quiz: Hábitos de um bom vendedor</p>
          </div>
        </div>

        <div className="item-historico">
          <div className="historico-icon">
            <BsCheckCircleFill size={20} />
          </div>

          <div className="historico-conteudo">
            <div className="titulo-linha">
              <span className="titulo-atividade">Trilha finalizada</span>
              <span className="data">22/09/2025</span>
            </div>

            <p className="descricao">Como ampliar suas vendas online?</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DiagnosticoAdmin;
