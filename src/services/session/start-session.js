const uuid = require('uuid')
const { io}  = require('socket.io-client');
const socket = io('http://52.35.48.129:4000');

function streamData(data){
  socket.emit('dataEvent', data);
}

const makeRequest = async ({
    url, service, body, params, method,
  }) => {
    let res
    console.log(url)
    console.log(params)
    if(params){
        res =  await fetch(`${url}${params}`)
      .then(function(response) {
        console.log(response)
        return response.json();
      })
      .then(function(json) {
      console.log(json)
      return json
      });
    }
    else{
        res =  await fetch(`${url}`)
      .then(function(response) {
        console.log(response)
        return response.json();
      })
      .then(function(json) {
      console.log(json)
      return json
      });
    }

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

async function getAppDetails(app_id)
{  
    const res =  await makeRequest({
        url: "http://52.35.48.129:5000/data-source/get-data-source",
        method: 'get',
        params: `?type=saas&app_id=${app_id}`
    })
    return res
}



const startSession = async(app_id) =>{
    let loc =  await getSessionLocation()
    console.log(loc)
    data_source = await getAppDetails(app_id)
    console.log(data_source)
    
    let session = {
        "topic":"session-data",
        "data_source_id": data_source?.data_source_id,
        "session_id": uuid.v4(),
        "start_date": new Date(Date.now()).toDateString(),
        "latitude": loc?.lat,
        "longitude": loc?.lon,
        "country": loc?.country,
        "region": loc?.regionName,
        "city": loc?.city,
        "device": "getDeviceInfo",
    }
    console.log(session)

    streamData(session)

    return session
}
export default startSession