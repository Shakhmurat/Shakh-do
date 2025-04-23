import { useState } from 'react';
import {
  Trash2,
  Edit3,
  Check,
  X,
} from 'lucide-react';

const Item = ({
  id,
  text,
  done,
  isEdit,
  setDone,
  handleDeleteTask,
  handleUpdateTask,
 }) => {
  const [editedText, setEditedText] = useState('');

  const setEdit = (e) => {
    setEditedText(text);
    handleUpdateTask(e, { isEdit: !isEdit });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    handleUpdateTask(e,
      {
        isEdit: false,
        text: editedText,
      }
    );
  };

  return (
    <li
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
            type="text"
            name="editedText"
            placeholder="Новое название задачи"
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
              className="btn-icon task__btn"
              type="button"
            >
              <Edit3 size={20} className="task__btn-icon" />
            </button>

            <button
              id={`delete-${id}`}
              onClick={handleDeleteTask}
              className="btn-icon task__btn danger"
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
              className="btn-icon task__btn"
              type="submit"
            >
              <Check size={20} className="task__btn-icon" />
            </button>

            <button
              id={`cancel-${id}`}
              onClick={setEdit}
              className="btn-icon task__btn neutral"
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