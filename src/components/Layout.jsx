import { Outlet, Link } from "react-router-dom";

const Layout = () => (
  <>
    <header className="header">
      <h1 className="header__logo">Shakh do</h1>
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item">
            <Link to="/">Мои задачи</Link>
          </li>
          <li className="header__item login_item">
            <Link to="/login">Войти</Link>
          </li>
          <li className="header__item">
            <Link to="/register">Зарегистрироваться</Link>
          </li>
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
);

export default Layout;