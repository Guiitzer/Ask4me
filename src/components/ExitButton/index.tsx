import { Tooltip } from "@mui/material";
import { useHistory } from "react-router-dom";
import exitImg from "../../assets/images/exit.svg"

import "./index.scss";

export default function ExitButton() {
  const { push } = useHistory();

  return (
    <>
      <Tooltip title="Sair para o página inicial">
        <button className="exit" onClick={()=> push('/') }>
          <div className="exit-content">
            <img className="exit-img" src={exitImg} alt="imagem sair" />
          </div>
          <span>Sair</span>
        </button>
      </Tooltip>
    </>
  );
}
