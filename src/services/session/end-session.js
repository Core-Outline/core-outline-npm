
const { io}  = require('socket.io-client');
const socket = io('http://52.35.48.129:4000');

function streamData(data){
    socket.emit('dataEvent', data);
  }

const endSession = async(session_id, end_date) =>{
    streamData({
        topic:"update-session-data",
        session_id,
        end_date
    })
}


// endSession('41d600e4-6c17-4626-bff4-8c173f904104', new Date(Date.now()).toLocaleString())
export default endSession