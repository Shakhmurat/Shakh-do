import { Center, Loader } from '@mantine/core';
import {
  updateTask,
  deleteTask,
} from '../../api/tasks';
import { useAuth } from '../../contexts/AuthContext';
import { getTaskId, getTaskIndex } from '../../utils/task';
import Item from "./Item";

const List = ({ children, tasks, setTasks, loading, error }) => {
  const { user: { uid } } = useAuth();

  const handleDeleteTask = async (e) => {
    const taskId = getTaskId(e);
    try {
      await deleteTask(uid, taskId);
      setTasks(
        tasks.filter((task) => task.id !== taskId),
      );
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  const handleUpdateTask = async (e, update) => {
    const taskId = getTaskId(e);
    const taskIndex = getTaskIndex(tasks, taskId);
    try {
      await updateTask(uid, taskId, update);
      setTasks([
        ...tasks.slice(0, taskIndex),
        {
          ...tasks[taskIndex],
          ...update,
        },
        ...tasks.slice(taskIndex + 1),
      ]);
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  const setDone = (e) => {
    handleUpdateTask(e, { done: e.target.checked });
  };

  return (
    <>
      {children}

      <ul className="tasks">
        {loading && (
          <Center>
            <Loader />
          </Center>
        )}

        {error && (
          <Center>
            Произошла ошибка при загрузке задач. Попробуйте позже.
          </Center>
        )}

        {!loading && tasks.length === 0 && (
          <Center>
            У вас пока нет задач. Добавьте первую задачу!
          </Center>
        )}

        {!loading && tasks.length > 0 && tasks.map(({ id, text, done, isEdit }) =>
          <Item
            key={id}
            id={id}
            uid={uid}
            text={text}
            done={done}
            isEdit={isEdit}
            setDone={setDone}
            handleDeleteTask={handleDeleteTask}
            handleUpdateTask={handleUpdateTask}
          />
        )}
      </ul>
    </>
  );
};

export default List;

