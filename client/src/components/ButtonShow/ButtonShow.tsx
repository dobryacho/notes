import { useState } from "react";
import style from "./buttonShow.module.css";

function ButtonShow({
  handleDeleteCat,
  show,
  ...props
}: {
  handleDeleteCat: () => void;
  show: boolean;
  onClick?: () => void;
}) {
  const [confirm, setConfirm] = useState(true);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <button {...props} className={!show ? style.button : style.button_pushed}>
        {show ? "скрыть" : "показать"}
      </button>
      {confirm ? (
        <button
          style={{ width: "20%" }}
          className={style.delete}
          onClick={() => setConfirm(false)}
        >
          Удалить
        </button>
      ) : (
        <>
          <button className={style.delete} onClick={handleDeleteCat}>
            Да
          </button>
          <button onClick={() => setConfirm(true)} className={style.delete}>
            Нет
          </button>
        </>
      )}
    </div>
  );
}

export default ButtonShow;
