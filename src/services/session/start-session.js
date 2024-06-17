const uuid = require('uuid')
const { io}  = require('socket.io-client');
const socket = io('http://localhost:4000');

function streamData(data){
  socket.emit('dataEvent', data);
}

const makeRequest = async ({
    url, service, body, params, method,
  }) => {
      const res =  await fetch(url)
      .then(function(response) {
      return response.json();
      })
      .then(function(json) {
      console.log(json)
      return json
  });
    return res
  }

async function getSessionLocation()
{  
    const res =  await makeRequest({
        url: "http://ip-api.com/json",
        method: 'get'
    })
    return res
}


const startSession = async() =>{
    let loc =  await getSessionLocation()
    print(loc)
    let session = {
        "topic":"session-data",
        "session_id": uuid.v4(),
        "start_time": Date.now(),
        "end_time" : null,
        "latitude": loc?.lat,
        "longitude": loc?.lng,
        "country": loc?.country,
        "region": loc?.regionName,
        "city": loc?.city,
        "device": "getDeviceInfo()",
    }
    session = { ...session, ...loc}
    console.log(session)

    streamData(session )

    return session
}

export default startSession