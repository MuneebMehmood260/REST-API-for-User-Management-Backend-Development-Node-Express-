let users = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 28 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 32 }
];
let nextId = 4;
const getAllUsers = () => {
  return users;
};
const getUserById = (id) => {
  return users.find(user => user.id === id);
};
const createUser = (userData) => {
  const newUser = {
    id: nextId++,
    ...userData
  };
  users.push(newUser);
  return newUser;
};
const updateUser = (id, userData) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...userData };
    return users[index];
  }
  return null;
};
const deleteUser = (id) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    return deletedUser[0];
  }
  return null;
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};