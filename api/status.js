const axios = require('axios')

module.exports = async function status () {
  const trackStatus = await axios.get('https://www.greenhelldriving.nuerburgring.de/api/v1/common/trackInfo')

  if (trackStatus) {
    return trackStatus.data.data
  }
}
