import { useState } from 'react';
import Form from '../components/Home/Form';
import List from '../components/Home/List';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <Form tasks={tasks} setTasks={setTasks} />
      <List tasks={tasks} setTasks={setTasks} />
    </>
  );
};

export default Home;
