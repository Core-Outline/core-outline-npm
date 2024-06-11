const uuid = require('uuid')

function createSessionUUID()
{
    return uuid.v4()
}
module.exports = createSessionUUID