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
      res.json().then((res) => setMyArr(res))
    );
  }, [updateNotes]);
  return (
    <>
      <Test setUpdateNotes={setUpdateNotes} myArr={myArr}/>
      <Suspense fallback={<div>loading</div>}>
        <ListNotes myArr={myArr} setMyArr={setMyArr} />
      </Suspense>
    </>
  );
}

export default App;
