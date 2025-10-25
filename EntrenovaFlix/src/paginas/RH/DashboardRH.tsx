import { GoShield } from "react-icons/go";
import React, { useState, useEffect, ElementType } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FaRegUserCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";
import Card from "../../componentes/layout/dashboard/Card";
import InfoLinha from "../../componentes/layout/dashboard/InfoLinha";
import GraficoLinha from "../../componentes/layout/dashboard/GraficoFrequencia";

interface DecodedToken {
  role: 'admin' | 'rh' | 'user';
  nome: string;
  email: string;
}

function DashboardRH() {

    const [userName, setUserName] = useState<string>("Usuário");
    const acessos = [400, 500, 600, 700, 340, 480]

    useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token); 
        setUserName(decodedToken.nome || "Usuário"); 
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, []);

    return (
        <div>
            <h1 className="titulo">Bem Vindo, {userName}</h1>
            <h2 className="visaoGeral-subtitulo">Todos os indicadores abaixo foram calculados com base nas trilhas ativas</h2>

            <div className="paineis">
                <div className="painelSecundario">
                    <FaRegUserCircle className="painel-icone" />
                    <h2 className="painel-titulo">Atividade dos usuários</h2>
                    <h4 className="painel-estatisticas">56% dos usuários concluíram todas as atividades</h4>
                    <h4 className="painel-estatisticas">15% dos usuários acessaram todos os materiais</h4>
                    <h4 className="painel-estatisticas">37% é o percentual de acerto dos quizzes</h4>
                    <h4 className="painel-estatisticas">31% dos usuários concluíram as atividades em uma semana</h4>
                    <h4 className="painel-estatisticas">80% dos usuários concluíram as atividades em duas semanas</h4>
                </div>

                <div className="painelPrincipal">
                    <div className="visaoGeral-cards">
                        <Card titulo="Visualização" valor="290" icone={<FaEye />} tipo="DashboardRH"></Card>
                        <Card titulo="Participação" valor="187" icone={<FaCheck />} tipo="DashboardRH"></Card>
                        <Card titulo="Conclusão" valor="163" icone={<MdEmojiPeople />} tipo="DashboardRH"></Card>
                    </div>

                    <GraficoLinha 
                        acessos={acessos}
                    />

                    <div className="infoLinhas">
                        <InfoLinha icone={<GoShield className="visaoGeral-icone" />} titulo="Problemas enfrentados na empresa atualmente" subtitulo="Dificuldade com vendas" />
                        <InfoLinha icone={<FaLightbulb className="visaoGeral-icone" />} titulo="Solução proposta" subtitulo="Trilha vendas online - 7 materiais" />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DashboardRH;