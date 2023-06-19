// import people from './users.js'
// let users = people
import * as usersDao from './users-dao.js';

const UserController = (app) => {
   app.get('/api/users', findAllUsers);
   app.get('/api/users/:uid', findUserById);
   app.post('/api/users', createUser);
   app.delete('/api/users/:uid', deleteUser);
   app.put('/api/users/:uid', updateUser);
}
const createUser = async (req, res) => {
  const newUser = req.body;
  // newUser._id = (new Date()).getTime() + '';
  // users.push(newUser);
  const insertedUser = await usersDao.createUser(newUser);
  res.json(insertedUser);
}
const deleteUser = async (req, res) => {
  //const userId = req.params['uid'];
  const userId = req.params.id;
  const status = await usersDao.deleteUser(userId);
  // users = users.filter(usr => usr._id !== userId);
  res.json(status);
}
const updateUser = async(req, res) => {
 const userId = req.params['uid'];
 //const userId = req.params.id;
 const updates = req.body;
//  users = users.map((usr) =>
//    usr._id === userId ?
//      {...usr, ...updates} :
//      usr
//  );
  const status = await usersDao.updateUser(userId, updates);
  const user = await usersDao.findUserById(userId);
  req.session["currentUser"] = user;
  res.json(status);
}
const findUserById = async (req, res) => {
  const userId = req.params.uid;
  const user = await usersDao.findUserById(userId);
  // const user = users
  //   .find(u => u._id === userId);
  res.json(user);
}
const findAllUsers = async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  if (username && password) {
    const user = await usersDao.findUserByCredentials(username, password);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } else if (username) {
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } else {
    const users = await usersDao.findAllUsers();
    res.json(users);
  }
};

// const findUsers = async (req, res) => {
//   //   const type = req.query.type
//   // if(type) {
//   //   const usersOfType = users
//   //     .filter(u => u.type === type)
//   //   res.json(usersOfType)
//   //   return
//   // }
//   const users = await usersDao.findAllUsers();
//   res.json(users)
// }
export default UserController