export const getUsers = () => (
  JSON.parse(localStorage.getItem('users')) || []
);

export const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const findUser = (email, password) => {
  const users = getUsers();
  return users.find((u) => u.email === email && u.password === password);
};

export const loginUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getCurrentUser = () => (
  JSON.parse(localStorage.getItem('currentUser'))
);

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};