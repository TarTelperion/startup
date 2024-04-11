const { DateTime } = require('luxon')

const getNow = () => {
  return DateTime.now().toISO()
}

module.exports = { getNow }
