import '../../../styles/headerRH.css';

interface HeaderAdminProps {
    userName?: string;
    userAvatar?: string;
}

function HeaderAdmin({ userName = "PLACEHOLDER", userAvatar }: HeaderAdminProps) {
    return (
        <header className="header-RH">
            <div className="header-RH-content">
                <h2 className="header-RH-title">DASHBOARD PARA GESTÃO DE CLIENTES</h2>

                <div className="header-RH-user">
                    <div className="user-avatar">
                        {userAvatar ? (
                            <img src={userAvatar} alt={userName} />
                        ) : (
                            <div className="avatar-placeholder">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div className="user-info">
                        <span className="user-display-name">{userName.toUpperCase()}</span>
                    </div>
                </div>
            </div> 
        </header>
    );
}

export default HeaderAdmin;