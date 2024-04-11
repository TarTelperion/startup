const db = require('./database')

process.on('SIGINT', () => {
  console.log('Interrupted, closing...')
  process.exit(0)
})

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason)
  process.exit(1)
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  process.exit(1)
})

const main = async (args) => {
  console.log('Harness called with args:', args)
  // do stuff here:
}

const runner = async () => {
  const args = process.argv.slice(2)
  try {
    await main(...args)
  } catch (error) {
    console.error('Error:', error)
  }
}

runner()
  .then(() => {
    console.log('Runner completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Runner execution failed:', error)
  })
