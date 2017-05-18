import Vue from 'vue'
export const API_PRE = '/api/'
export const getApiJson = (url, args = {}, _ignoreError) => {
  const promise = new Promise((resolve, reject) => {
    // Vue.http.get(url, args)
    Vue.http.get(url, {
      params: args
    })
    .then((res) => {
      if (res.data.success) {
        resolve(res.data)
      } else {
        console.error(res)
        if (!_ignoreError) {
          Notice.error({
            title: '错误',
            desc: res.data && res.data && res.data.msg,
            duration: 0
          })
        }
      }
      reject(res.data)
    })
  })
  .catch((err) => {
    reject(err)
  })
  return promise
}

export const invoke = function (url, args, params = {}, ignoreError) {
  let _params
  let _ignoreError = false
  for (let i = 2;i < arguments.length; i++) {
    const _arg = arguments[i]
    if (typeof _arg === 'boolean') {
      _ignoreError = _arg
    } else if (typeof _arg === 'object') {
      _params = _arg
    }
  }
  url = _.trim(url)

  if (!/^\/?api\//i.test(url)) {
    url = API_PRE + url
  }

  let promise = new Promise((resolve, reject) => {
    Vue.http.post(url, JSON.stringify(_.extend({args: args}, _params)))
    .then((res) => {
      if (res.data.success) {
        resolve(res.data)
      } else {
        console.error(res)
        if(!_ignoreError) {
          Notice.error({
            titile: '错误',
            desc: res.data && res.data && res.data.msg,
            duration: 0
          })
        }
        reject(res.data)
      }
    })
    .catch((err) => {
      reject(err)
    })
  })
  return promise
}
