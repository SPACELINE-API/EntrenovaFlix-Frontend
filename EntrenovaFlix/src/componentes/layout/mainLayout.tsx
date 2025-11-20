import { Outlet } from 'react-router-dom';
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import Header from './header';
import '../../styles/global.css'

interface DashboardRHLayoutProps {
  userAvatar?: string;
  pageTitle?: string;
}

interface DecodedToken {
  role: 'admin' | 'rh' | 'user';
  nome: string;
  sobrenome: string; 
  email: string;
}

function MainLayout({ userAvatar }: DashboardRHLayoutProps) {
  const [userName, setUserName] = useState<string>("Usuário");

  useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const decodedToken: DecodedToken = jwtDecode(token);
          const fullName = decodedToken.sobrenome
            ? `${decodedToken.nome} ${decodedToken.sobrenome}`
            : decodedToken.nome;
  
          setUserName(fullName || "Usuário");
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      }
    }, []); 

  
  return (
    <div className='bodyMain' >
      <Header userName={userName} userAvatar={userAvatar}/>
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
}
export default MainLayout;