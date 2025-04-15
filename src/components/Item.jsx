import { useState } from 'react';
import {
  Trash2,
  Edit3,
  Check,
  X,
} from 'lucide-react';
import { getTaskId, getTaskIndex } from '../utils';

const Item = ({
  id,
  text,
  done,
  isEdit,
  tasks,
  setTasks,
 }) => {
  const [editedText, setEditedText] = useState('');

  const deleteTask = (e) => {
    const taskId = getTaskId(e);
    setTasks([
      ...tasks.filter((task) => task.id !== taskId),
    ]);
  };

  const updateTask = (e, update) => {
    const taskId = getTaskId(e);
    const taskIndex = getTaskIndex(tasks, taskId);
    setTasks([
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        ...update,
      },
      ...tasks.slice(taskIndex + 1),
    ]);
  };

  const setEdit = (e) => {
    setEditedText(text);
    updateTask(e, { isEdit: !isEdit });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    updateTask(e,
      {
        isEdit: false,
        text: editedText,
      }
    );
  };

  const setDone = (e) => {
    updateTask(e, { done: e.target.checked });
  };

  return (
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
            checked={done}
            onChange={setDone}
          />
          {text}
        </label>
      )}

      {isEdit && (
        <form
          id={`form-${id}`}
          onSubmit={saveEdit}
          className="task__form"
        >
          <input
            className="task__input"
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
              className="task__btn"
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
              form={`form-${id}`}
              className="task__btn"
              type="submit"
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
  )
};

export default Item;