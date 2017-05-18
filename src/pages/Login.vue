<template>
  <div class="login-container">
    <background></background>
    <div class="login-box">
      <div class="login-panel">
        <!-- <h3>登录</h3> -->
        <login-input title="用户名" name="username" @change="change" style="marginTop: 40px"></login-input>
        <login-input title="密码" name="password" @change="change" type="password"></login-input>
        <a class="login-btn" @click="login">登陆</a>
      </div>
    </div>
    <!-- <div class="login">
      <el-input v-model="userArgs.username" placeholder="用户名"></el-input>
      <el-input v-model="userArgs.passowrd" placeholder="密码" type="password"></el-input>
      <el-button type="button" name="button" @click="serch">查询</el-button>
      <el-button type="button" name="button" @click="register">注册</el-button>
    </div> -->
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from '@/api/resize-event';
import loginInput from 'components/loginInput.vue'
import Background from 'components/Background.vue'
import {auth} from 'src/api'
export default {
  components: {
    loginInput,
    Background
  },
  name: 'hello',
  data () {
    return {
      mainWidth: window.innerWidth,
      height: '100%',
      msg: '',
      userArgs: {
        username: '',
        password: ''
      },
      bgImage: '../assets/img/login-bg.jpg'
    }
  },
  mounted() {
    this.heightHandeler();
    this.windowResizeListener = _.throttle(()=>{
      this.mainWidth = window.innerWidth;
    }, 50);
    addResizeListener(document.querySelector('body'), this.windowResizeListener);
  },
  methods: {
    heightHandeler(){
      // this.left  = window.screen.width  / 2 + 'px';
      this.height = document.body.scrollHeight + 'px';
    },
    login () {
      auth.login({
        loginName: this.userArgs.username,
        password: this.userArgs.password
      }).then((res) => {
        router.push({path: '/'})
        Message.close('loading')
      }).catch((err) => {
        if (err.msg) {
          Message.error(err.msg)
        } else {
          console.error(err)
        }
        // this.button_disabled = false
        Message.close('loading')
      })
    },
    register () {
      this.serch();
      this.$http.post('/api/User.Register', this.userArgs)
      .then((res) => {
        if(res)
        this.$message.info('注册成功!')
        console.log('success');
      })
      .catch((err) => {
        this.$message.error(`${err.message}`, 'ERROR!')
        console.error(err);
      })
    },
    change (name, val) {
      this.userArgs[name] = val
      // this.$set(this.userArgs[name], val)
    }
  }
}
</script>

<style lang="scss">

.login-container{
  margin: 0;
  padding: 0;
  border: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login-panel {
    .login-btn {
      color: #afb3b8;
      border: none;
      background: transparent;
      padding: 8px 14px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: color .3s ease;

      &:hover {
        color: rgba(45, 120, 244, 0.8);
      }
      &:active {
        color: rgba(45, 120, 244, 0.8);
      }
      &:visited {
        color: rgba(45, 120, 244, 0.8);
        border: none;
      }
    }
  }

  .login-box {
    position: relative;
    height: 280px;
    width: 300px;
    z-index: 1;
    background-color: hsla(0,0%,100%,.5);
    max-width: 480px;
    margin: 0 auto;
    padding: 15px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0,0,0,.2), 0 5px 5px 0 rgba(0,0,0,.24);
    border-radius: 15px;
    transition: all .3s;
    overflow: hidden;
  }
}
</style>
