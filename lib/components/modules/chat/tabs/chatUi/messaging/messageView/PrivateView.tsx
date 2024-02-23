import React, { FC } from 'react'
interface Props {
    socket: any;
    roomId: string;
    respond: any;
  }
const PrivateView:FC<Props> = ({socket, roomId, respond}) => {
  return (
    <div>PrivateView</div>
  )
}

export default PrivateView