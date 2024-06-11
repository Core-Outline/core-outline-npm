const { io}  = require('socket.io-client');
const socket = io('http://localhost:4000');

function streamData(data){
  socket.emit('dataEvent', data);
}

module.exports = streamData
