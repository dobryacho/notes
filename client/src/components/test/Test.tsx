import { ChangeEvent, FormEvent, useState } from "react";
import { NotesType } from "../../types";
import style from "./test.module.css";

type Props = {
  setUpdateNotes: (arg: (prev: boolean) => boolean) => void;
  myArr: NotesType[];
};

const initialInputs = {
  name: "",
  text: "",
  comment: "",
  check: false,
};

function Test({ setUpdateNotes, myArr }: Props) {
  const [inputs, setInputs] = useState(initialInputs);
  const [selectCat, setSelectCat] = useState(false);
  const [select, setSelect] = useState("");

  const hadleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
    if (e.target.value) {
      setInputs((pre) => ({ ...pre, name: e.target.value }));
      setSelectCat(true);
    } else {
      setInputs((pre) => ({ ...pre, name: "" }));
      setSelectCat(false);
    }
  };

  const hadleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, text, comment, check } = inputs;
    fetch("http://localhost:3000/newpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        text: JSON.stringify({ text, comment, check }),
      }),
    }).then(() => {
      setUpdateNotes((prev) => !prev);
      setSelect("");
      setSelectCat(false);
    });
    setInputs(initialInputs);
  };

  function calcProc() {
    const allNotes = myArr.reduce((acc, el) => acc + el.notesArray.length, 0);
    const notesThrutly = myArr.reduce(
      (acc, el) => acc + el.notesArray.filter((elka) => elka.check).length,
      0
    );
    const result = Math.floor((notesThrutly * 100) / allNotes);
    return result || 0;
  }

  return (
    <div className={style.form}>
      <div>
        <form onSubmit={hadleSend}>
          <input
            type="text"
            name="name"
            placeholder="name"
            required
            onChange={hadleInputs}
            disabled={selectCat}
            value={inputs.name}
            className={style.input}
          />
          <input
            type="text"
            name="text"
            placeholder="text"
            required
            onChange={hadleInputs}
            value={inputs.text}
            className={style.input}
          />
          <input
            type="text"
            name="comment"
            placeholder="comment"
            required
            onChange={hadleInputs}
            value={inputs.comment}
            className={style.input}
          />
          <button className={style.button}>send</button>
          <h1 style={{ float: "inline-end" }}>{calcProc()}%</h1>
        </form>
      </div>
      <div>
        <select name="cat" id="" onChange={handleSelect} value={select}>
          <option value="">[новая тема]</option>
          {myArr.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Test;
