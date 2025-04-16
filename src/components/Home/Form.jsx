import { useState } from 'react';
import { uniqueId } from 'lodash-es';
import { Plus } from 'lucide-react';


const Form = ({ tasks, setTasks }) => {
  const [newTaskText, setTaskText] = useState('');

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
  }

  return(
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

      <button type="submit" className="btn-icon add-task__btn">
        <Plus size={20} />
      </button>
    </form>
  )
};

export default Form;