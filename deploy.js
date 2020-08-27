const Client = require('ssh2-sftp-client')
const ora = require('ora')
const chalk = require('chalk')
const path = require('path')
const buildPathDev = path.resolve(__dirname, './dist')
const { deployConfigFn } = require('./configs/rc.js')

const client = new Client()

async function main() {
  try {
    const {
      host,
      port,
      username,
      password,
      buildPathServer,
    } = await deployConfigFn()

    await client.connect({
      host,
      port,
      username,
      password,
    })
    const isExits = await client.exists(buildPathServer)
    if (!isExits) {
      await client.mkdir(buildPathServer, true)
    } else {
      await client.rmdir(buildPathServer, true)
    }
    let loading = ora(chalk.yellowBright('uploading...'))
    loading.color = 'yellow'
    client.on('upload', (info) => {
      loading.start()
    })
    const uploadRes = await client.uploadDir(buildPathDev, buildPathServer)
    loading.succeed()
    console.log(chalk.blue(`上传${uploadRes}`))
  } finally {
    client.end()
  }
}

main()
  .then((msg) => {
    console.log(chalk.green('上传成功'))
  })
  .catch((err) => {
    console.log(`main error: ${err.message}`)
  })
