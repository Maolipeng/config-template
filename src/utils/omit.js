/**
 * 删除对象的key
 * @param obj
 * @param keys
 * @returns {{[p: string]: *}}
 */
const omit = (obj, keys) => {
  const forkObj = {...obj}
  keys.forEach(key => {
    delete forkObj[key]
  })
  return forkObj
}
export default omit
