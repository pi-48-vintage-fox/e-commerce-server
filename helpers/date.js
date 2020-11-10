
function today() {
  return Date.now() - new Date().getTimezoneOffset() * 60 * 1000
}

function tomorrow() {
  return today() + 24*60*60*1000
}

function toDateString(date) {
  return new Date(new Date(date).toISOString().split('T')[0])
}

function timezoneOffset() {
  return  new Date().getTimezoneOffset() * 60 * 1000 * -1
}

let months = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
}

function convertToWesternFormat(date) {
  console.log({date})
  let year = date.getFullYear()
  let month = months[date.getMonth() + 1]
  let day = date.getDate()

  return `${month} ${day}, ${year}`
}
module.exports = { today, tomorrow, timezoneOffset, toDateString, months, convertToWesternFormat }
