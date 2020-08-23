export function handleFetchQueue(fetchFnList, max, callback) {
  const fetchTotal = fetchFnList.length
  const requestsQueue = []
  const results = []
  let i = 0
  const handleRequest = (fetchFn) => {
    const req = fetchFn()
      .then((res) => {
        console.log('当前并发： ' + requestsQueue)
        const len = results.push(res)
        if (len < fetchTotal && i + 1 < fetchTotal) {
          requestsQueue.shift()
          handleRequest(fetchFnList[++i]['requestFn'])
        } else if (len === fetchTotal) {
          'function' === typeof callback && callback(results)
        }
      })
      .catch((e) => {
        // if (e.config && e.config.data && e.config.data.get('file')) {

        // }
        console.log('e', e)
        // console.log('e.config.data', e.config.data.get('file'))
        results.push({
          ajaxError: true,
          msg: '网络请求错误',
          filename: fetchFnList[i]['filename'],
        })
        if (results.length < fetchTotal && i + 1 < fetchTotal) {
          requestsQueue.shift()
          handleRequest(fetchFnList[++i]['requestFn'])
        }
        if (results.length === fetchTotal) {
          'function' === typeof callback && callback(results)
        }
      })
    if (requestsQueue.push(req) < max && fetchFnList[++i]) {
      handleRequest(fetchFnList[i]['requestFn'])
    }
  }
  handleRequest(fetchFnList[i]['requestFn'])
}
