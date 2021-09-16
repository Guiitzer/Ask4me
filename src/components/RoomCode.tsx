import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type roomCodeType = {
  code: string
}

export default function RoomCode({code} :roomCodeType) {
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(code)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="imagem copiar" />
      </div>
      <span>Sala #{code}</span>
    </button>
  )
}
