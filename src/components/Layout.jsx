import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <h1 className="header__logo">Shakh do</h1>
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item">
              <Link to="/">Задачи</Link>
            </li>
            <li className="header__item login_item">
              {user ? (
                <Link to="/profile">Профиль</Link>
              ) : (
                <Link to="/login">Войти</Link>
              )}
            </li>
            {user && (
              <li className="header__item">
                <button className="btn" onClick={handleLogout}>
                  Выйти
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        Сделано с интересом⚡
      </footer>
    </>
  )
};

export default Layout;