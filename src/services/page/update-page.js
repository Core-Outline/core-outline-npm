const { io}  = require('socket.io-client');
const socket = io('http://localhost:4000');

function streamData(data){
  socket.emit('dataEvent', data);
}

const updatePage = async(session_id, location) =>{
    let page = {}

    page = {
        "topic":"page-data",
        "session_id": session_id,
        "start_date": Date.now(),
        "end_date": null,
        "page_name": location,
    } 

    streamData(page)
    return page
      
}


export default updatePage