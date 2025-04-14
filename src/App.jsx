import { useState } from 'react';
import { uniqueId } from 'lodash-es';
import { CircleCheck, Trash2, Edit3 } from 'lucide-react';

const App = () => {
  const [newTaskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: uniqueId(),
      text: newTaskText,
      done: false,
    }

    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  return (
    <>
      <h1>Hello, Shakh do</h1>

      <form
        className="add-task__form"
        onSubmit={handleSubmit}
      >
        <input
          value={newTaskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Какие планы на сегодня?"
          className="add-task__input"
          type="text"
          required
        />

        <button type="submit" className="add-task__btn">
          Добавить
        </button>
      </form>

      <ul className="tasks">
        {tasks.map(({ id, text, done }) => (
          <li
            key={id}
            id={id}
            className="task"
          >
            <input
              className="task__checkbox"
              type="checkbox"
              value={done}
            />
            {text}
            <div className="task__btns">
              <button>
                <Edit3 size={20} className="text-blue-500 cursor-pointer" />
              </button>

              <button>
                <Trash2 size={20} className="text-red-500 cursor-pointer" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
