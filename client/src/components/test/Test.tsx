import { ChangeEvent, FormEvent, useState } from "react";
import { NotesType } from "../../types";
import style from "./test.module.css";

type Props = {
  setUpdateNotes: (arg: (prev: boolean) => boolean) => void;
  myArr: NotesType[];
};

function Test({ setUpdateNotes, myArr }: Props) {
  const [inputs, setInputs] = useState({
    name: "",
    text: "",
    comment: "",
    check: false,
  });
  const [selectCat, setSelectCat] = useState(false);

  const hadleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSelect = (e) => {
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
    }).then(() => setUpdateNotes((prev) => !prev));
  };

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
          <button>send</button>
        </form>
      </div>
      <div>
        <select name="cat" id="" onChange={handleSelect}>
          <option value=""></option>
          {myArr.map((cat) => (
            <option value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Test;
