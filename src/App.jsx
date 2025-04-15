import { useState } from 'react';
import Form from './components/Form';
import List from './components/List';
import './styles/main.scss';

const App = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <h1>Hello, Shakh do</h1>

      <Form tasks={tasks} setTasks={setTasks} />
      <List tasks={tasks} setTasks={setTasks} />
    </>
  );
};

export default App;
