import { useEffect, useState } from 'react';
import { uniqueId } from 'lodash-es';
import {
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
} from 'lucide-react';
import { getTaskId, getTaskIndex } from './utils'
import './styles/main.scss'

const App = () => {
  const [newTaskText, setTaskText] = useState('');
  const [editedText, setEditedText] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: uniqueId(),
      text: newTaskText,
      done: false,
      isEdit: false,
    };

    setTasks([newTask, ...tasks]);
    setTaskText('');
  };

  const deleteTask = (e) => {
    const taskId = getTaskId(e);
    setTasks([
      ...tasks.filter((task) => task.id !== taskId),
    ]);
  };

  const setEdit = (e) => {
    const taskId = getTaskId(e);
    const taskIndex = getTaskIndex(tasks, taskId);
    setTasks([
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        isEdit: !tasks[taskIndex].isEdit,
      },
      ...tasks.slice(taskIndex + 1),
    ]);
    setEditedText(tasks[taskIndex].text);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const taskId = getTaskId(e);
    const taskIndex = getTaskIndex(tasks, taskId);
    setTasks([
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        text: editedText,
        isEdit: false,
      },
      ...tasks.slice(taskIndex + 1),
    ]);
  };

  const setDone = (e) => {
    const taskId = getTaskId(e);
    const taskIndex = getTaskIndex(tasks, taskId);

    setTasks([
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: e.target.checked,
      },
      ...tasks.slice(taskIndex + 1),
    ]);
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
          autoFocus
        />

        <button type="submit" className="add-task__btn">
          <Plus />
        </button>
      </form>

      <ul className="tasks">
        {tasks.map(({ id, text, done, isEdit }) => (
          <li
            key={id}
            id={id}
            className="task"
          >
            {!isEdit && (
              <label className="task__label">
                <input
                  id={`done-${id}`}
                  className="task__checkbox"
                  type="checkbox"
                  value={done}
                  onChange={setDone}
                />
                {text}
              </label>
            )}

            {isEdit && (
              <form
                id="edit-form"
                onSubmit={saveEdit}
                className="task__form"
              >
                <input
                  className="task__input"
                  id={`name-${id}`}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  autoFocus={isEdit}
                  required
                />
              </form>
            )}

            <div className="task__btns">
              {!isEdit && (
                <>
                  <button
                    id={`edit-${id}`}
                    onClick={setEdit}
                    className="task__btn edit"
                    type="button"
                  >
                    <Edit3 size={20} className="task__btn-icon" />
                  </button>

                  <button
                    id={`delete-${id}`}
                    onClick={deleteTask}
                    className="task__btn danger"
                    type="button"
                  >
                    <Trash2 size={20} className="task__btn-icon" />
                  </button>
                </>
              )}

              {isEdit && (
                <>
                  <button
                    id={`save-${id}`}
                    onClick={saveEdit}
                    className="task__btn"
                    type="submit"
                    form="edit-form"
                  >
                    <Check size={20} className="task__btn-icon" />
                  </button>

                  <button
                    id={`cancel-${id}`}
                    onClick={setEdit}
                    className="task__btn neutral"
                    type="button"
                  >
                    <X size={20} className="task__btn-icon" />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
