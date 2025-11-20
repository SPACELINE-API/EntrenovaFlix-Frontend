import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import authService from '../../services/authService';
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import '../../styles/global.css';

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
}

function Header({
  userName = "Usuário",
  userAvatar
}: HeaderProps) {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

  return (
    <header className='headerContainer1'>

      <div className='user-menu1' onClick={() => setOpen(!open)}>

        <div className="user-avatar1">
          {userAvatar ? (
            <img src={userAvatar} alt={userName} />
          ) : (
            <div className="avatar-placeholder1">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <span>{userName}</span>
        <IoIosArrowDown className={`arrow1 ${open ? "open" : ""}`} />
        {open && (
          <div className="dropdown-menu1">
            <button onClick={handleLogout}>
              <FaArrowRightFromBracket /> Logout
            </button>
          </div>
        )}
      </div>

      <nav className='navigation'>
        <NavLink to="/colaboradores" end>Trilhas</NavLink>
        <NavLink to="/colaboradores/forum" end>Fórum</NavLink>
        <NavLink to="/colaboradores/dashboard" end>Dashboard</NavLink>
      </nav>

      <div className='brandLogo'>
        <span>ENTRENOVAFLIX</span>
      </div>

    </header>
  );
}

export default Header;
