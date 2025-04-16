import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getUsers,
  saveUser,
} from "../utils/auth";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  console.log(localStorage);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsers()
    const isExists = users.some((u) => u.email === email);

    if (isExists) {
      alert('Пользователь с такой почтой уже существует');
      return;
    }

    saveUser({ email, password });
    alert('Регистрация успешна!');
    navigate('/login');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="margin-bottom-16">Создайте аккаунт</h2>

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
          placeholder="Придумайте пароль"
        />
        <span className="form__hint">Не менее 8 символов</span>
      </div>

      <button className="btn form__btn">Зарегистрироваться</button>

      <div className="form__row align-items-center margin-top-16">
        <span className="form__hint">Есть аккаунт? <Link to="/login">Войти</Link></span>
      </div>
    </form>
  )
};

export default Register;