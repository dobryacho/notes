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

  const classWithProc = () => {
    if (pocent === 100) {
      return "card_done";
    } else if (pocent >= 80 && pocent < 100) {
      return "card_99";
    } else if (pocent >= 60) {
      return "card_80";
    } else if (pocent >= 40) {
      return "card_60";
    } else if (pocent >= 20) {
      return "card_40";
    } else if (pocent > 0) {
      return "card_20";
    } else {
      return "card";
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        margin: "10px",
        borderRadius: "10px",
        display:'flex',
        flexDirection:'column'
      }}
      className={classWithProc()}
    >
      <h2>
        {name}
        {" " + pocent + "% "}
        <input
          type="checkbox"
          name=""
          id=""
          checked={chekedCategory}
          disabled
        />
      </h2>
      <ButtonShow show={show} onClick={() => setShow((prev) => !prev)}/>
      
      <div
        style={{
          padding: "5px",
          margin: "5px",
          borderRadius: "10px",
          backgroundColor: "#6161a5",
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
