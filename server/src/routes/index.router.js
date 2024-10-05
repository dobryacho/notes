// const indexRouter = require('express').Router();
const { Router } = require('express');
const indexRouter = new Router();

const renderTemplate = require('../utils/renderTemplate');
const Home = require('../views/Home');

indexRouter.get('/', (req, res) => {
  // const { login } = req.app.locals.user;
  const { login } = req.session;
  // console.log(login);
  renderTemplate(Home, { login }, res);
});

indexRouter.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('cookieName');
    res.redirect('/');
  });
  // res.app.locals.user.login = '';
});

module.exports = indexRouter;
