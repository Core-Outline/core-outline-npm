

const getCurrentDate =()=> new Date().toJSON().slice(0, 10);

module.exports = {
    getCurrentDate
}