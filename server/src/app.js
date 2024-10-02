require("dotenv").config();
const express = require("express"); // экспресс, сервер
const morgan = require("morgan"); // морган для логирования
const path = require("path"); // путь
const cors = require("cors");
const fs = require("fs");
const { EOL } = require("os");

const session = require("express-session"); // сессия для кукисов
const noteRouter = require("./routes/note.router");
//! npm i express-session session-file-store bcrypt

// const dbConnectionCheckMdw = require('./middlewares/dbCheck'); // как мидла
// const dbConnectionCheck = require('../db/dbConnectCheck'); // без доп.нагрузки на бд

const app = express();
app.locals.user = { login: "" }; // локальная переменная

const { PORT } = process.env; // порт из вайла енв
const ANOTER_POTR = 3004;

app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: true })); // для получения body
app.use(express.json()); // для получения json
app.use(express.static("d:/foto/всякое/Новая папка/новый отбор")); // определяем путь для клиентской части
// app.use(dbConnectionCheckMdw);
// dbConnectionCheck();

//! подключи mdw
// app.use("/login", secureRoute, loginRouter);
// app.use("/register", secureRoute, regRouter);
// app.use("/", checkUser, indexRouter);

app.use("/newpost", noteRouter);

app.get("/*", (req, res) => {
  // res.status(404).send('404'); редирект со всех несуществвующих страниц
  console.log(" >>> ", "на звездочку перешлис", new Date());

  res.end("/");
});

app.listen(3000, "0.0.0.0", function () {
  console.log(`Server listening at localhost:${this.address().port}`);
});
