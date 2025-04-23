import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getTasks } from '../api/tasks';
import Form from '../components/Home/Form';
import List from '../components/Home/List';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks(user.uid);
        setTasks(fetchedTasks);
        setLoading(false);
      } catch (error) {
        setError('Ошибка при загрузке задач. Перезагрузите страницу или попробуйте позже.');
        console.error('Ошибка при загрузке задач:', error.message);
      }
    };

    fetchTasks();
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <List
      tasks={tasks}
      setTasks={setTasks}
      loading={loading}
      error={error}
    >
      <Form tasks={tasks} setTasks={setTasks} />
    </List>
  );
};

export default Home;
