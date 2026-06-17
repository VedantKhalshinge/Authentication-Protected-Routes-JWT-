// In-memory database for users
const users = [];

const findUserByEmail = (email) => {
  return users.find(u => u.email === email);
};

const createUser = (user) => {
  users.push(user);
  return user;
};

const findUserById = (id) => {
  return users.find(u => u.id === id);
};

module.exports = {
  users,
  findUserByEmail,
  createUser,
  findUserById
};
