const { io}  = require('socket.io-client');
const socket = io('http://52.35.48.129:4000');

function streamData(data){
  socket.emit('dataEvent', data);
}

const updatePage = async(session_id, location, is_terminal=false) =>{
    let page = {}

    page = {
        "topic":"page-data",
        "session_id": session_id,
        "start_date": new Date(Date.now()).toDateString(),
        "page_name": location,
        "is_terminal": is_terminal
    } 

    streamData(page)
    return page
      
}



export default updatePage