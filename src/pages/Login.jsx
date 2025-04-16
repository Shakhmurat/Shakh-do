import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { findUser } from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = findUser(email, password);

    if (!user) {
      alert('Пользователь не найден');
      return
    }

    login(user);
    navigate('/');
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <h2 className="margin-bottom-16">С возвращением</h2>

      <div className="form__row">
        <label className="form__label">Почта</label>
        <input
          className="form__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          required
          placeholder="Введите почту"
          autoFocus
        />

      </div>
      <div className="form__row">
        <label className="form__label">Пароль</label>
        <input
          className="form__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          required
          minLength={8}
          placeholder="Введите пароль"
        />
        <span className="form__hint">Не менее 8 символов</span>
      </div>

      <button className="btn form__btn">Войти</button>

      <div className="form__row align-items-center margin-top-16">
        <span className="form__hint">Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></span>
      </div>
    </form>
  )
};

export default Login;