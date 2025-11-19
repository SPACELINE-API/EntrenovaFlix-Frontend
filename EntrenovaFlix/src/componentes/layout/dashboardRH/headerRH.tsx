import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import "../../../styles/headerRH.css";

interface HeaderRHProps { 
    userName?: string; 
    userAvatar?: string; 
    pageTitle?: string; 
}

function HeaderRH({ userName = "PLACEHOLDER", userAvatar, pageTitle }: HeaderRHProps) {
    const [open, setOpen] = useState(false);

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
                            <button onClick={() => console.log("logout")}>
                                <FaArrowRightFromBracket/>  Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default HeaderRH;
