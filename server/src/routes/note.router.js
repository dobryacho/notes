const noteRouter = require("express").Router();
const fs = require("fs").promises;

async function checkFileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (err) {
    return false;
  }
}

async function getTable(name) {
  return JSON.parse(await fs.readFile(`../notesDB/${name.trim()}.txt`));
}

async function writeTable(name, data) {
  await fs.writeFile(
    `../notesDB/${name.trim()}.txt`,
    JSON.stringify(data),
    "utf-8"
  );
}

noteRouter.delete("/cat", async (req, res) => {
  console.log(" >>> ", "удаление категории", new Date());
  try {
    const { name } = req.body;
    await fs.rm(`../notesDB/${name.trim()}.txt`);
    res.end();
  } catch (error) {
    console.log(error);
  }
});

noteRouter.get("/", async (req, res) => {
  console.log(" >>> ", "получение всего списка", new Date());
  try {
    const response = await fs.readdir("../notesDB/");
    const arr = Promise.all(
      response.map(async (note) => {
        const reg = note.match(/(.*?)(\.txt)$/)[1];
        const re = { name: reg, notesArray: await getTable(reg) };
        return re;
      })
    );
    res.json(await arr);
  } catch (error) {
    console.log(error);
  }
});

noteRouter.patch("/", async (req, res) => {
  console.log(" >>> ", "изменение", new Date());
  try {
    const { name, id } = req.body;
    const table = await getTable(name);
    const updateTable = table.map((note) =>
      note.id === id ? { ...note, check: !note.check } : note
    );
    await writeTable(name, updateTable);
    res.end();
  } catch (error) {
    console.log(error);
  }
});

noteRouter.delete("/", async (req, res) => {
  console.log(" >>> ", "удаление задачи", new Date());
  try {
    const { name, id } = req.body;
    const table = await getTable(name);
    const updateTable = table.filter((note) => id !== note.id);
    await writeTable(name, updateTable);
    res.end();
  } catch (error) {
    console.log(error);
  }
});

noteRouter.post("/", async (req, res) => {
  try {
    const dateNow = new Date();
    const time = `${
      dateNow.getHours() < 10 ? `0${dateNow.getHours()}` : dateNow.getHours()
    }${
      dateNow.getMinutes() < 10
        ? `0${dateNow.getMinutes()}`
        : dateNow.getMinutes()
    }`;
    const day =
      dateNow.getDate() < 10 ? `0${dateNow.getDate()}` : dateNow.getDate();
    const month =
      dateNow.getMonth() + 1 < 10
        ? `0${dateNow.getMonth() + 1}`
        : dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();
    const { name, text } = req.body;
    const textParse = JSON.parse(text);
    textParse.id = Math.floor(Math.random() * 1000000);
    textParse.name = name;
    textParse.dateCreate = `${year}${month}${day}${time}`;

    const getFIle = await checkFileExists(`../notesDB/${name}.txt`);
    if (getFIle) {
      console.log(" >>> ", "добавление задачи к категории", new Date());
      const jsonRes = await getTable(name);
      jsonRes.push(textParse);
      await writeTable(name, jsonRes);
    } else {
      console.log(" >>> ", "создание категории", new Date());
      const arr = [];
      arr.push(textParse);
      await writeTable(name, arr);
    }
    const result = await getTable(name);
    res.json(result || "");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = noteRouter;
