const loginRouter = require('express').Router();
const renderTemplate = require('../utils/renderTemplate');
//! bcrypt
const bcrypt = require('bcrypt');
const Login = require('../views/Login');
const { User } = require('../../db/models');

loginRouter.get('/', (req, res) => {
  renderTemplate(Login, null, res);
});

loginRouter.post('/', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    if (!user) {
      console.log('User not found');
      res.redirect('/register');
    } else {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        req.session.login = user.login;
        req.session.save(() => {
          console.log('Session saved. Correct password');
          res.redirect('/');
        });
      } else {
        console.log('Wrong password');
        res.redirect('/login');
      }
    }
  } catch (error) {
    console.log(`loginRouter => ${error}`);
  }
});

module.exports = loginRouter;
