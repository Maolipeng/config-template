
const Client = require('ssh2-sftp-client');
const path = require('path');
const { deployConfig } = require('./configs')
const client = new Client();
const buildPathDev = path.resolve(__dirname, './dist');

const { host, port, username, password, buildPathServer } = deployConfig;
if (!host || !port || !username || !password || !buildPathServer) {
  console.error('请填写部署服务器配置');
  return;
}

const config = {
  host,
  port,
  username,
  password
}

async function main() {
  try {
    await client.connect(config);
    const isExits = await client.exists(buildPathServer)
    if (!isExits) {
      await client.mkdir(buildPathServer, true)
    } else {
      await client.rmdir(buildPathServer, true)
    }
    client.on('upload', info => {
      console.log(`uploading: Uploaded ${info.source}`);
    });
    const uploadRes = await client.uploadDir(buildPathDev, buildPathServer)
    console.log('uploadRes', uploadRes);
  } finally {
    client.end();
  }
}

main()
  .then(msg => {
    console.log('上传成功');
  })
  .catch(err => {
    console.log(`main error: ${err.message}`);
  });
