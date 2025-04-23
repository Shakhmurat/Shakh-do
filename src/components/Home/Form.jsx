import { useState } from 'react';
import { Plus } from 'lucide-react';
import { addTask } from '../../api/tasks';
import { useAuth } from '../../contexts/AuthContext';

const Form = ({ tasks, setTasks }) => {
  const [newTaskText, setTaskText] = useState('');
  const { user: { uid } } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      text: newTaskText,
      done: false,
      isEdit: false,
    };

    try {
      const savedTask = await addTask(uid, newTask);
      setTasks([savedTask, ...tasks]);
      setTaskText('');
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
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
        name="task"
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