const fetch = require('axios');

async function makeRequest(bodyData) {
    const options = {
        headers: { 'Content-Type': 'application/json; charset-utf-8' },
    };

    const response = await fetch.post(
        'http://68.183.118.35/jobe/index.php/restapi/runs',
        JSON.stringify(bodyData),
        options,
    );

    const data = await response.data;
    console.log(data);

    return data;
}

module.exports = makeRequest;
