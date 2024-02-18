const request = reqire('../../lib/index.js')
const { trackingConfigs } = require('../../config/index.js')

const startSession = async(device, browser, latitude, longitude) =>{
    const res = await(
        request({
            url:`https://api.coreoutline.com`,
            service: trackingConfigs.START_SESSION,
            body: {
                'device':device,
                'browser':browser,
                'latitude':latitude,
                'longitude':longitude
            },
            method:'POST',
            params:{
                Authorization: `Bearer ${token}`
            }
        })
    )
}


module.exports = startSession