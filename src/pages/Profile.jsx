import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const [name, setName] = useState('');
  const { user } = useAuth();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      Скоро тут будет профиль и редактирование
      <dl className="dl">
        <dt className="dt">Email</dt>
        <dd className="dd">{user.email}</dd>
        {user.name && (
          <>
            <dt className="dt">Имя</dt>
            <dd className="dd">{user.name}</dd>
          </>
        )}
      </dl>
      <button className="btn">Редактировать</button>
    </>
  );
};

export default Profile;
