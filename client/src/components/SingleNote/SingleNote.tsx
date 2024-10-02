import React, { Dispatch, SetStateAction } from "react";
import { NotesArray, NotesType } from "../../types";

type Props = {
  notes: NotesArray;
  setMyArr: Dispatch<SetStateAction<NotesType[]>>;
  index: number;
  setUpdateProc: (arg: (pre: boolean) => boolean) => void;
};

function SingleNote({ notes, setMyArr, index, setUpdateProc }: Props) {
  const handleChek = (
    e: React.MouseEvent<HTMLDivElement | HTMLInputElement>
  ) => {
    e.stopPropagation();
    fetch("http://localhost:3000/newpost/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ id: notes.id, name: notes.name }),
    }).then((res) => {
      if (res.ok) {
        return setMyArr((pre) => {
          setUpdateProc((pre) => !pre);
          pre[index].notesArray.map(
            (note) => note.id === notes.id && (note.check = !note.check)
          );
          return [...pre];
        });
      }
    });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    fetch("http://localhost:3000/newpost/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: notes.id, name: notes.name }),
    }).then(() => {
      setUpdateProc((pre) => !pre);
      setMyArr((pre) => {
        const newArr = pre[index].notesArray.filter(
          (note) => note.id !== notes.id
        );
        return pre.map((note, i) =>
          i === index ? { ...note, notesArray: newArr } : note
        );
      });
    });
  };

  return (
    <>
      <div className="note" onClick={handleChek}>
        <h4>
          <input
            type="checkbox"
            name="123"
            id=""
            checked={notes.check}
            onClick={handleChek}
            onChange={()=>{}}
          />{" "}
          {notes.text}
        </h4>
        <h5>{notes.comment}</h5>
        <button onClick={handleDelete}>delete</button>
      </div>
    </>
  );
}

export default SingleNote;
