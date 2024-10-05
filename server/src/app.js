require("dotenv").config();
const express = require("express"); // экспресс, сервер
const morgan = require("morgan"); // морган для логирования
const path = require("path"); // путь
const cors = require("cors");
const fs = require("fs");
const { EOL } = require("os");
const ExcelJS = require("exceljs");

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
async function checkFileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (err) {
    return false;
  }
}

// app.get("/newpost", (req, res) => {
//   const workbook = new ExcelJS.Workbook();
//   //   // Создаем новый workbook
//   const sheet = workbook.addWorksheet("Первая");
//   const sheet2 = workbook.addWorksheet("Вторая");

//   sheet.getCell("A1").value = 10;
//   sheet.getCell("B1").value = { formula: "A1 * 2" };
//   sheet.addRow([3, " Sam ", new Date()]);
//   sheet2.columns = [
//     { header: "Id", key: "id", width: 10 },
//     { header: "Name", key: "name", width: 32 },
//     {
//       header: "D.O.B.",
//       key: "DOB",
//       width: 10,
//       outlineLevel: 1,
//     },
//     {
//       header: "new head",
//       key: "new",
//       width: 50,
//       border: true,
//       values: ["123", "123", "345", "345"],
//     },
//   ];

//   sheet2.addTable({
//     name: 'MyTable',
//     ref: 'A1',
//     headerRow: true,
//     totalsRow: true,
//     style: {
//       theme: 'TableStyleDark3',
//       showRowStripes: true,
//     },
//     columns: [
//       {name: 'Date', totalsRowLabel: 'Totals:', filterButton: true},
//       {name: 'Amount', totalsRowFunction: 'sum', filterButton: false},
//     ],
//     rows: [
//       [new Date('2019-07-20'), 70.10],
//       [new Date('2019-07-21'), 70.60],
//       [new Date('2019-07-22'), 70.10],
//     ],
//   });
  
//   const dobCol = sheet2.getColumn(3);

//   for (let i = 0; i < 30; i += 1) {
//     if (i < 1) {
//       sheet.getCell(`C${i + 1}`).value = 10;
//     } else {
//       sheet.getCell(`C${i + 1}`).value = 10 + sheet.getCell(`C${i}`).value;
//     }
//   }

//   for (let i = 1; i < 30; i += 1) {
//     if (i < 2) {
//       sheet2.getCell(`C${i + 1}`).value = new Date();
//     } else {
//       sheet2.getCell(`C${i + 1}`).value = `${
//         sheet2.getCell(`C${i}`).value
//       } годс`;
//     }
//   }
//   dobCol.header = "Date of Birth";

//   sheet2.getColumn(4).outlineLevel = 0;
//   sheet2.getColumn(5).outlineLevel = 1;
//   workbook.xlsx
//     .writeFile("./notesDB/example.xlsx")
//     .then(() => {
//       console.log("Файл успешно сохранен");
//     })
//     .catch((error) => {
//       console.log("Ошибка при сохранении файла:", error);
//     });

//   res.end();
// });

//   // workbook.xlsx.readFile('./notesDB/example2.xlsx')
//   //   .then(() => {
//   //     // Перебираем все листы в файле
//   //     workbook.eachSheet((sheet, sheetId) => {
//   //       console.log(`Лист ${sheetId}: ${sheet.name}`);

//   //       // Перебираем все строки в листе
//   //       sheet.eachRow((row, rowNumber) => {
//   //         console.log(`Строка ${rowNumber}: ${JSON.stringify(row.values)}`);
//   //       });
//   //     });
//   //   })

app.use("/newpost", noteRouter);

app.get("/*", (req, res) => {
  // res.status(404).send('404'); редирект со всех несуществвующих страниц
  console.log(" >>> ", "на звездочку перешлис", new Date());

  res.end("/");
});

app.listen(3000, "0.0.0.0", function () {
  console.log(`Server listening at localhost:${this.address().port}`);
});
