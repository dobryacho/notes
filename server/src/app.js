require("dotenv").config();
const express = require("express"); // экспресс, сервер
const morgan = require("morgan"); // морган для логирования
const path = require("path"); // путь
const cors = require("cors");
const fs = require("fs");
const { EOL } = require("os");

const session = require("express-session"); // сессия для кукисов
const noteRouter = require("./routes/note.router");
const FileStore = require("session-file-store")(session); // сторедж для кукисов
//! npm i express-session session-file-store bcrypt

// const dbConnectionCheckMdw = require('./middlewares/dbCheck'); // как мидла
// const dbConnectionCheck = require('../db/dbConnectCheck'); // без доп.нагрузки на бд

const app = express();
app.locals.user = { login: "" }; // локальная переменная

const { PORT } = process.env; // порт из вайла енв

const sessionConfig = {
  name: "cookieName", // не забудь указать то же имя и при удалении куки
  store: new FileStore(),
  secret: process.env.SESSION_SECRET, // SESSION_SECRET в .env или ?? 'Mellon'
  resave: false, // если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 24 * 1000 * 60 * 60, // время жизни в ms, 24(h)*1000(ms)*60(sec)*60(min) = 86400000
    httpOnly: true, // секьюрность, оставляем true
  },
};

app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: true })); // для получения body
app.use(express.json()); // для получения json
app.use(express.static("d:/foto/всякое/Новая папка/новый отбор")); // определяем путь для клиентской части
app.use(session(sessionConfig)); // инициализация кукисов
// app.use(dbConnectionCheckMdw);
// dbConnectionCheck();

//! подключи mdw
// app.use("/login", secureRoute, loginRouter);
// app.use("/register", secureRoute, regRouter);
// app.use("/", checkUser, indexRouter);

app.use("/newpost", noteRouter);

app.get("/*", (req, res) => {
  // res.status(404).send('404'); редирект со всех несуществвующих страниц
  console.log("12");

  res.end("/");
});

app.listen(PORT, "0.0.0.0", function () {
  console.log(`Server listening at localhost:${this.address().port}`);
});
