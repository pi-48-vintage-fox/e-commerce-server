const axios = require('axios')

const weather = async _ => {
    const cuaca = await axios({
        method: 'GET',
        url: `${process.env.PRIV_WEATHER_API_URL}?exclude=minutely,hourly&appid=${process.env.PRIV_WEATHER_KEY}`
    })

    return cuaca.data
}

module.exports = weather