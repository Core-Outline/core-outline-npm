const { io}  = require('socket.io-client');
const socket = io('http://52.35.48.129:4000');

function streamData(data){
  socket.emit('dataEvent', data);
}

module.exports = streamData
