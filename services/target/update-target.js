const request = reqire('../../lib/index.js')
const { trackingConfigs, appConfigs } = require('../../config/index.js')

const targetReached = async(session_id) =>{
    const res = await(
        request({
            url:  appConfigs.BASE_URL,
            service: trackingConfigs.TARGET_REACHED,
            body: {
                'session_id':session_id
            },
            method:'POST',
            params:{
                Authorization: `Bearer ${token}`
            }
        })
    )
}

module.exports = targetReached