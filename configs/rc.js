const inquirer = require('inquirer')
const ini = require('ini')
const chalkPipe = require('chalk-pipe')

const { DEPLOY_CONFIG } = require('./constants.js')
// const link = chalkPipe('blue.underline');
const error = chalkPipe('bgRed.#cccccc')
const warning = chalkPipe('orange.bold')
const tip = chalkPipe('bgBlue')
const defaultChoices = [...Object.keys(DEPLOY_CONFIG), 'custom']

const defaultPrompt = [
  {
    type: 'list',
    name: 'deployConfig',
    message: '请选择你要部署的服务器',
    choices: defaultChoices,
  },
]
const customInputConfig = {
  input: [
    {
      name: 'host',
      message: tip('请输入需要部署的服务器地址'),
    },
    {
      name: 'port',
      message: tip('请输入端口号'),
    },
    {
      name: 'username',
      message: tip('请输入用户名'),
    },
    {
      type: 'password',
      name: 'password',
      message: tip('请输入密码'),
    },
    {
      name: 'buildPathServer',
      message: tip('请输入部署地址'),
    },
  ],
  editor: [
    {
      type: 'editor',
      name: 'deployConfig',
      message: tip(
        '请输入{host: x，port: x, username: x, password: x, serverPath: x}格式'
      ),
      validate: (answer) => {
        const { host, port, username, password, buildPathServer } = eval(
          `(${answer})`
        )
        console.log(host, port, username, password, buildPathServer, 11111)
        if (host && port && username && password && buildPathServer) {
          return true
        } else {
          return error('host,port,username,password,buildPathServer不能为空')
        }
      },
    },
  ],
}
const customInputSelect = [
  {
    type: 'checkbox',
    name: 'inputType',
    message: tip('请选择输入方式(只能选择一种方式)'),
    choices: [{ name: 'input', checked: true }, { name: 'editor' }],
    validate: (answer) => {
      if (answer.length === 1) {
        return true
      } else {
        return warning('只能选择一种输入方式')
      }
    },
  },
]
function customConfigFn() {
  return inquirer.prompt(customInputSelect)
}
function customInputPromptFn(type) {
  return inquirer.prompt(customInputConfig[type])
}

const deployConfigFn = async () => {
  const res = await inquirer
    .prompt(defaultPrompt)
    .then(async ({ deployConfig }) => {
      let configs = {}
      if (deployConfig === 'custom') {
        const { inputType } = await customConfigFn()
        const res = await customInputPromptFn(inputType)
        configs =
          inputType[0] === 'editor' ? eval(`(${res.deployConfig})`) : res
      } else {
        configs = DEPLOY_CONFIG[deployConfig]
      }
      return configs
    })
  return res
}
module.exports = { deployConfigFn }
