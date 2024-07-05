const { io}  = require('socket.io-client');
const socket = io('http://52.35.48.129:4000');

function streamData(data){
  socket.emit('dataEvent', data);
}

export const targetReached = async(session_id) =>{
    streamData({"topic":"update-session-data", "session_id" : session_id, "click_through": true })
}

export const registerClick = async(session_id, item_id) =>{
    streamData({"topic":"update-session-data", "session_id" : session_id, "item_clicked": item_id })
}

