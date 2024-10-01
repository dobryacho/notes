import React from "react";

function ButtonShow({
  show,
  ...props
}: {
  show: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      {...props}
      style={{
        width: "90%",
        height: "30px",
        paddingTop: "0px",
        paddingBottom: "0px",
        alignSelf: "center",
      }}
    >
      {show ? "скрыть" : "показать"}
    </button>
  );
}

export default ButtonShow;
