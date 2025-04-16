import Item from "./Item";

const List = ({ tasks, setTasks }) => {
  return (
    <ul className="tasks">
      {tasks.map(({ id, text, done, isEdit }) =>
        <Item
          key={id}
          id={id}
          text={text}
          done={done}
          isEdit={isEdit}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}
    </ul>
  );
};

export default List;

