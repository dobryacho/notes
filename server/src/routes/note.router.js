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
  console.log(name);
  
  return JSON.parse(await fs.readFile(`./notesDB/${name}.txt`));
}

async function writeTable(name, data) {
  await fs.writeFile(`./notesDB/${name}.txt`, JSON.stringify(data), "utf-8");
}

noteRouter.get("/", async (req, res) => {
  const response = await fs.readdir("./notesDB/");
  const arr = Promise.all(
    response.map(async (note) => {
      const reg = note.match(/(.*?)(\.txt)$/)[1];
      const re = { name: reg, notesArray: await getTable(reg) };
      return re;
    }),
  );
  res.json(await arr);
});

noteRouter.patch("/", async (req, res) => {
  try {
    const { name, id } = req.body;
    const table = await getTable(name);
    const updateTable = table.map((note) => (note.id === id
      ? { ...note, check: !note.check } : note));
    await writeTable(name, updateTable);
    res.end();
  } catch (error) {
    console.log(error);
  }
});

noteRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const { name, text } = req.body;
    const textParse = JSON.parse(text);
    textParse.id = Math.floor(Math.random() * 1000000);
    textParse.name = name;

    const getFIle = await checkFileExists(`./notesDB/${name}.txt`);
    if (getFIle) {
      console.log(await getTable('test'));
      const jsonRes = await getTable(name);
      jsonRes.push(textParse);
      console.log(jsonRes, '2');
      await writeTable(name, jsonRes);
      
    } else {
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
