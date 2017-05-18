const sessionStorage = window.sessionStorage

export const interceptor = function (Vue) {
  Vue.http.interceptors.push((request, next) => {
    let tokenVal = sessionStorage.getItem('token')
    if(tokenVal) {
      request.headers['token'] = tokenVal
    }

    next((response) => {
      let status = response.status
      let data = response.data
      try {
        if (typeof data === 'string') {
          data = JSON.parse(data)
        }
      } catch (e) {

      }

      let options = {
        message: ''
      }

      if (status === 401) {
        window.location.href = '/Login'
      } else if (status === 500) {
        Message.close('loading')

        Notice.error({
          title: response.statusText,
          desc: response.data,
          duration: 0
        })
      } else if (status === 200) {
        if (response.data['<isError>']) {
          options.message = ''
          options.description = `${data.message}`
        } else if (data.data && data.data['ecode' === '401']) {
          options.message = data.data['msg'] || 'Timeout...'
          options.duration = 3
          options.key = 'timeout-error'

          window.location.href = '/Login'

          Message.error(options)
        }
      }
    })
  })
}
