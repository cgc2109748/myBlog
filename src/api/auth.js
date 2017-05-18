import {getApiJson, invoke} from './base'
// import store from 'src/stroe'
const sessionStorage = window.sessionStorage

export const auth = {
  user: {
    authenticated :false
  },

  login (creds) {
    return getApiJson('api/User.Login', creds)
      .then((res) =>{
        if (res) {
          let user = {
            loginName: res.records.loginName,
            name: res.records.name,
            token: res.token
          }
          this.user.authenticated = true
          sessionStorage.token = res.token
          sessionStorage.user = JSON.stringify(user)
        }
      })
      .catch((res) => {
        // debugger
      })
  },

  logout () {
    invoke('api/User.Logout', {})
      .then((res) => {
        if (res.success) {
          sessionStorage.removeItem('token')
          this.user.authenticated = false
          router.push('/Login')
        } else {
          Message.error('登出失败!')
        }
      }).catch((e) => {
        sessionStorage.removeItem('token')
        this.user.authenticated = false
        router.push('/Login')
      })
  },

  refreshAuth () {
    let _token = sessionStorage.getItem('token')
    if (!_.isEmpty(_token)) {
      this.user.authenticated = true
      // if (_.isEmpty(store.getters.getUserInfo.userId)) {
      //   store.dispatch('setUserInfo', JSON.parse(sessionStorage.user || '{}'))
      // }
    } else {
      this.user.authenticated = false
    }
  },
  checkAuth () {
    return this.user.authenticated
  }
}
