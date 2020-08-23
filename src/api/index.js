import ajax from '@/services/ajax';

const getApisMap = () => {
  const requireFiles = require.context('./resources', false, /\.js$/);
  return requireFiles.keys().reduce((res, item) => ({...res, ...requireFiles(item)}), {})
}
const apiMaps = getApisMap();
const methodsGenerator = (apis) => {
  return Object.keys(apis).reduce((res,item) => {
    const {method, url, ...rest} = apis[item];
    if (!method || !url) {
      console.error(`${item}缺少必填参数method或者url`);
    } else {
      res[item] = params => ajax[method](url, {...params, ...rest });
    } 
    return res;
  }, {})
}

const resources = methodsGenerator(apiMaps);
export default resources;
