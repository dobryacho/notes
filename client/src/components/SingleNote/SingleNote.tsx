import React, { Dispatch, SetStateAction } from "react";
import { NotesArray, NotesType } from "../../types";

type Props = {
  notes: NotesArray;
  setMyArr: Dispatch<SetStateAction<NotesType[]>>;
  index: number;
  setUpdateProc: (arg: (pre: boolean)=>boolean)=>void
};

function SingleNote({ notes, setMyArr, index, setUpdateProc }: Props) {
  const handleChek = () => {
    fetch("http://localhost:3000/newpost/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ id: notes.id, name: notes.name }),
    }).then((res) => {
      if (res.ok) {
        return setMyArr((pre) => {
          setUpdateProc((pre)=>!pre);
          pre[index].notesArray.map(
            (note) => note.id === notes.id && (note.check = !note.check)
          );
          return [...pre];
        });
      }
    });
  };

  return (
    <div
      className="note"
      onClick={handleChek}
    >
      <h4>
        <input
          type="checkbox"
          name="123"
          id=""
          value="123"
          checked={notes.check}
          onChange={handleChek}
        />{" "}
        {notes.text}
      </h4>
      <h5>{notes.comment}</h5>
    </div>
  );
}

export default SingleNote;
