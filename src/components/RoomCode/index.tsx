import { Tooltip } from "@mui/material";
import { useState } from "react";
import copyImg from "../../assets/images/copy.svg";

import "./index.scss";
import AlertPopUp from "../AlertPopUp";

type roomCodeType = {
  code: string;
};

export default function RoomCode({ code }: roomCodeType) {
  const [open, setOpen] = useState(false);

  function copyRoomCodeToClipboard() {
    setOpen(true);
    navigator.clipboard.writeText(code);
    setTimeout(() => {
      setOpen(false);
    }, 3000); // 5 segundos
  }

  return (
    <>
      {open && <AlertPopUp />}
      <Tooltip title="Clique para copiar o código da sala">
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
          <div>
            <img src={copyImg} alt="imagem copiar" />
          </div>
          <span>{open ? "Copiado" : `#${code}`}</span>
        </button>
      </Tooltip>
    </>
  );
}
