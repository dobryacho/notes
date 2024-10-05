import { Suspense, useEffect, useState } from "react";
import "./App.css";
import ListNotes from "./components/ListNotes/ListNotes";
import Test from "./components/test/Test";
import { NotesType } from "./types";

function App() {
  const [myArr, setMyArr] = useState<NotesType[]>([]);
  const [updateNotes, setUpdateNotes] = useState<boolean>(true);
  useEffect(() => {
    fetch("http://localhost:3000/newpost/").then((res) =>
      res.json().then((res: NotesType[]) =>
        setMyArr(() => {
          const arr = res.sort((a, b) => {
            if (a.notesArray.every((note) => note.check) && !b.notesArray.every((note) => note.check)) {
              return 1
            }
            if (b.notesArray.every((note) => note.check) && !a.notesArray.every((note) => note.check)) {
              return -1
            }
            console.log(
              Number(b?.notesArray[b.notesArray.length - 1]?.dateCreate),
              Number(a?.notesArray[a.notesArray.length - 1]?.dateCreate)
            );

            return (
              Number(b?.notesArray[b.notesArray.length - 1]?.dateCreate) -
              Number(a?.notesArray[a.notesArray.length - 1]?.dateCreate)
            );
          });
          return arr;
        })
      )
    );
  }, [updateNotes]);

  return (
    <>
      <Test setUpdateNotes={setUpdateNotes} myArr={myArr} />
      <Suspense fallback={<div>loading</div>}>
        <ListNotes myArr={myArr} setMyArr={setMyArr} />
      </Suspense>
    </>
  );
}

export default App;
