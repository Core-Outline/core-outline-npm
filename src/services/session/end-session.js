const request = require('../../lib/index.js')
const { trackingConfigs, appConfigs } = require('../../config/index.js')

const endSession = async(session_id, token) =>{
    const res = await(
        request({
            url:  appConfigs.BASE_URL,
            service: trackingConfigs.END_SESSION,
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

export default endSession