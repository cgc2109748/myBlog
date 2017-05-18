<template lang="html">
  <div class="mainframe" :style="{ width: carsouselWidth}">
    <background></background>
    <div class="banner">
      <div class="user-info">
        <h3 class="user-name clearfix">
          <span>果粒橙</span>
          <div class="signicon author"></div>
        </h3>
        <p class="about-info">
          <span class="gender boy" title="男"></span> {{ '深圳 Web前端工程师' }}
        </p>
        <p class="user-desc">
          {{ '这里是个人信息简介' }}
        </p>
        <p></p>
      </div>
    </div>
    <div class="container wrapper">
      <v-row :gutter="30">
        <v-col :xs="5" :sm="5" :md="5" :lg="5">
          <div class="menu">
            <div class="user-pic">
              <div class="user-pic-bg"></div>
              <img :src="'/static/img/user-img.jpg'" alt="">
            </div>
          </div>
          <v-menu mode="vertical" class="menu-vertical-demo">
            <!-- <v-menu-item-group title="分组一"> -->
              <v-menu-item
                default-active="1"
                :index="item.index"
                @click="menuClick(item.router)"
                v-for="item in menuDataJson">
                <i class="fa" :class="classHandler(item.icon)"></i>{{ item.text }}
              </v-menu-item>
            <!-- </v-menu-item-group> -->
          </v-menu>
        </v-col>
        <v-col :xs="18" :sm="18" :md="18" :lg="18">
          <div class="content">
            <router-view :key="routerKey"></router-view>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Background from 'components/Background.vue'
// import {Carousel, CarouselItem} from 'components/carousel'
import {vCol, vRow} from 'components/grid'
import vMenu from 'components/menu'
import vMenuItem from 'components/menu-item'
import vMenuItemGroup from 'components/menu-item-group'
import {auth} from 'src/api'
export default {
  components: {
    Background,
    vMenu,
    vMenuItem,
    vMenuItemGroup,
    vCol,
    vRow
    // vImage,
    // Carousel,
    // CarouselItem
  },
  data () {
    return {
      carsouselWidth: '',
      menuDataJson: [
        {text: '主页', index: '1', icon: 'home', router: ''},
        {text: '记事本', index: '2', icon: 'book', router: 'Notepad'},
        {text: '相册', index: '3', icon: 'photo', router: 'Album'},
        {text: '游记', index: '4', icon: 'plane', router: 'Travels'},
        {text: '登出', index: '5', icon: 'sign-out', router: 'Logout'}
      ]
    }
  },
  mounted () {
    this.refreshAuth()
    this.setCarouselWidth()
  },
  methods: {
    refreshAuth () {
      // debugger
      // this.$router.push('/refresh')
      //   .then((res) => {
      //     if (!res.success) {
      //       this.$router.push('/Login')
      //     }
      //   })
    },
    setCarouselWidth () {
      this.carsouselWidth = window.innerWidth + 'px'
    },
    classHandler (clz) {
      return `fa-${clz}`
    },
    menuClick (router) {
      if (router !== 'Logout') {
        this.$router.push(`/${router}`)
      } else {
        auth.logout()
      }
    }
  },
  computed: {
    routerKey () {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
    }
  }
}
</script>

<style lang="scss">
  .menu {
    width: 200px;
    left: 0;
    margin-top: -170px;

    .user-pic {
      position: relative;

      .user-pic-bg {
        width: 200px;
        height: 200px;
        background-color: #fff;
        opacity: .2;
        border-radius: 100px;
        transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -o-transition: all .3s;
      }

      img {
        position: absolute;
        left: 4px;
        top: 4px;
        width: 192px;
        height: 192px;
        border-radius: 95px;
        transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -o-transition: all .3s;
      }
    }

  }

  .content {
    margin-top: 30px;
  }
</style>
