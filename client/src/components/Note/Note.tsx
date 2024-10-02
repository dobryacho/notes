import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SingleNote from "../SingleNote/SingleNote";
import { NotesArray, NotesType } from "../../types";
import ButtonShow from "../ButtonShow/ButtonShow";

type Props = {
  name: string;
  array: NotesArray[];
  index: number;
  setMyArr: Dispatch<SetStateAction<NotesType[]>>;
};

function Note({ name, array, index, setMyArr }: Props) {
  const chekedCategory = array.every((note) => note.check);
  const [pocent, setProcent] = useState(0);
  const [updateProc, setUpdateProc] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cheked = array.filter((note) => note.check).length;
    if (cheked === 0) {
      setProcent(0);
      return;
    }
    setProcent(Math.floor((cheked * 100) / array.length));
    // array.length
  }, [updateProc, array]);

  const handleDeleteCat = () => {
    fetch("http://localhost:3000/newpost/cat", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }).then(() =>
      setMyArr((prev) => prev.filter((note) => note.name !== name))
    );
  };

  return (
    <div
      style={{
        width: "400px",
        padding: "10px",
        margin: "10px",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        maxHeight: "fit-content",
      }}
      className={"card-default" + (pocent === 100 ? " card_done" : "")}
      // className={classWithProc() + ' card-default'}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>
          <input
            type="checkbox"
            name=""
            id=""
            checked={chekedCategory}
            disabled
          />{" "}
          {name}
        </h2>
        <div
          style={{
            width: "50px",
            minWidth: "50px",
            height: "50px",
            borderRadius: "50px",
            border: "2px solid white",
            alignContent: "center",
            textAlign: "center",
          }}
          className={
            pocent === 0
              ? "card"
              : pocent <= 20
              ? "card_20"
              : pocent <= 40
              ? "card_40"
              : pocent <= 60
              ? "card_60"
              : pocent <= 80
              ? "card_80"
              : pocent < 100
              ? "card_99"
              : "card_done"
          }
        >
          {pocent}
        </div>
      </div>
      <ButtonShow
        handleDeleteCat={handleDeleteCat}
        show={show}
        onClick={() => setShow((prev) => !prev)}
      />
      <div
        style={{
          borderRadius: "10px",
          // backgroundColor: "#6161a5",
          display: show ? "block" : "none",
        }}
      >
        {array.map((note) => (
          <SingleNote
            notes={note}
            setMyArr={setMyArr}
            index={index}
            setUpdateProc={setUpdateProc}
            key={note.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Note;
