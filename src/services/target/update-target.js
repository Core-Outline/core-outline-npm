const { io}  = require('socket.io-client');
const socket = io('http://localhost:4000');

function streamData(data){
  socket.emit('dataEvent', data);
}

export const targetReached = async(session_id) =>{
    streamData({"topic":"target-data", "session_id" : session_id })
}

export const registerClick = async(session_id, item_id) =>{
    streamData({"topic":"click-data", "session_id" : session_id, "item_clicked": item_id })
}

