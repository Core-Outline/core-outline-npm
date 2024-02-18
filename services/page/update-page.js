const request = reqire('../../lib/index.js')
const { trackingConfigs, appConfigs } = require('../../config/index.js')

const updatePage = async(time_in, session_id, time_out) =>{
    const res = await(
        request({
            url:  appConfigs.BASE_URL,
            service: trackingConfigs.UPDATE_PAGE,
            body: {
                'session_id':session_id,
                'time_in':time_in,
                'time_out':time_out
            },
            method:'POST',
            params:{
                Authorization: `Bearer ${token}`
            }
        })
    )
}

module.exports = updatePage