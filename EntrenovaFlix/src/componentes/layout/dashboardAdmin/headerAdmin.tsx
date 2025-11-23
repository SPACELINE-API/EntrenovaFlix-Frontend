import '../../../styles/headerRH.css';
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';

interface HeaderAdminProps {
    userName?: string;
    userAvatar?: string;
    pageTitle?: string;
}

function HeaderAdmin({ userName = "PLACEHOLDER", userAvatar, pageTitle  }: HeaderAdminProps) {
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

        <header className="header-RH">
            <div className="header-RH-content">
                <h2 className="header-RH-title">{pageTitle}</h2>

                <div 
                    className="user-menu" 
                    onClick={() => setOpen(!open)}
                >
                    <div className="user-avatar">
                        {userAvatar ? (
                            <img src={userAvatar} alt={userName} />
                        ) : (
                            <div className="avatar-placeholder">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <span className="user-display-name">
                        {userName.toUpperCase()}
                    </span>
                    <span className={`arrow ${open ? "open" : ""}`}><IoIosArrowDown/></span>
                    {open && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>
                                <FaArrowRightFromBracket/>  Logout
                            </button>
                        </div>
                    )}
                </div>
            </div> 
        </header>
    );
}

export default HeaderAdmin;