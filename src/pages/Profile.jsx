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
      <dl className="profile">
        <dt>Email</dt>
        <dd>{user.email}</dd>
        {user.name && (
          <>
            <dt>Имя</dt>
            <dd>{user.name}</dd>
          </>
        )}
      </dl>
      <button className="btn">Редактировать</button>
    </>
  );
};

export default Profile;
