import { handleFetchQueue } from './handleFetchQueue.js'

/**
 *字节转换
 *
 * @param {*} bytes 字节大小
 * @param {*} byteType 传入的固定转换单位，不会再转成其他单位
 * @param {*} isRender false的话返回的是数值用于比大小的场景，true的话返回的是字符串，如 “1 MB” 这种形式，用于页面渲染
 * @returns 返回如isRender描述那样
 */
function byteToSize(bytes, byteType, isRender) {
  if (!bytes || typeof(Number(bytes)) != 'number') return;
  bytes = Number(bytes);
  if (bytes === 0) return '0 B';
  if (typeof(byteType) === 'boolean' && isRender === undefined) isRender = byteType;
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = byteType && sizes.includes(byteType) ? sizes.indexOf(byteType) : Math.floor(Math.log(bytes) / Math.log(k));
  const resultSize = (bytes / Math.pow(k, i));
  return isRender ? `${resultSize.toPrecision(3)}${sizes[i]}` : resultSize;
}


export { handleFetchQueue, byteToSize }
