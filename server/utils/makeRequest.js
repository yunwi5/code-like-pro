const fetch = require('axios');

async function makeRequest(bodyData) {
    const options = {
        headers: { 'Content-Type': 'application/json; charset-utf-8' },
    };

    try {
        const response = await fetch.post(
            'http://68.183.118.35/jobe/index.php/restapi/runs',
            JSON.stringify(bodyData),
            options,
        );

        const data = await response.data;
        return data;
    } catch (err) {
        console.log('Run code error');
        console.log(err.message);
        return {};
    }
}

module.exports = makeRequest;
