import { Dispatch, SetStateAction } from "react";
import Note from "../Note/Note";
import React from "react";
import { NotesType } from "../../types";

type Props = {
  myArr: NotesType[];
  setMyArr: Dispatch<SetStateAction<NotesType[]>>;
};

function ListNotes({ myArr, setMyArr }: Props) {
  
  return (
    <>    
        {myArr?.map((note, index) => (
          <React.Fragment key={note.name}>
            <Note
              name={note.name}
              array={note.notesArray}
              index={index}
              setMyArr={setMyArr}
            />
          </React.Fragment>
        ))}
    </>
  );
}

export default ListNotes;
