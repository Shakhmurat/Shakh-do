export const getTaskId = (e) => e.target.id.split('-')[1];
export const getTaskIndex = (tasks, id) => tasks.findIndex((task) => task.id === id);
