const makeRequest = async ({
  url, service, body, params, method,
}) => {
    return await fetch(url)
    .then(function(response) {
    return response.json();
    })
    .then(function(json) {
    console.log(json)
});
}

module.exports = makeRequest;