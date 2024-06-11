const { locationConfigs } = require("../../config/index.js")
// const { makeRequest } = require("../index.js")

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
        url: locationConfigs.LOCATION_ENDPOINT,
        method: 'get'
    })
    console.log('Loc', res)
    return res
}
module.exports = getSessionLocation