const regRouter = require("express").Router();
const renderTemplate = require("../utils/renderTemplate");
//! bcrypt .hash(pass, 10) Для хэширования
const bcrypt = require("bcrypt");
const Register = require("../views/Register");
const { User } = require("../../db/models");

regRouter.get("/", (req, res) => {
  renderTemplate(Register, null, res);
});

regRouter.post("/", async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    if (user) {
      console.log(`User with login ${login} already exists`);
      res.json({ err: `User with login ${login} already exists` });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ login, password: hash });
      // res.app.locals.user.login = login;
      req.session.login = newUser.login;
      // console.log(req.session);
      req.session.save(() => {
        //! json для fetch
        res.json({ regDone: `Registraion success ${login}` });
        // res.redirect('/');
      });
    }
  } catch (error) {
    res.send(`regRouter => ${error}`);
  }
});

module.exports = regRouter;
