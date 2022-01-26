<template>
  <div>
        <div class="bggg"></div>
<!-- success, warning, danger, info, primary, secondary, dark, light -->
    <b-navbar toggleable="lg" type="dark" variant="danger">
      <b-navbar-brand href="#">
        <router-link to="/">
          <img
            src="@/assets/houselogo.png"
            class="d-inline-block align-middle"
            width="90px"
            alt="Kitten"
            style="opacity:1;"
          />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"
            ><router-link :to="{ name: 'Home' }" class="link"
              ><b-icon icon="star-fill" animation="fade" font-scale="3"></b-icon> HOME</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'Board' }" class="link"
              ><b-icon icon="three-dots" animation="cylon" font-scale="3"></b-icon>
              게시판</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'Instargram' }" class="link"
              ><b-icon icon="circle-fill" animation="throb" font-scale="3"></b-icon>
              번역가이드</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'House' }" class="link"
              ><b-icon icon="three-dots-vertical" animation="cylon-vertical" font-scale="4"></b-icon>
              아파트정보</router-link
            ></b-nav-item
          >
        <!-- <b-icon icon="arrow-clockwise" animation="spin" font-scale="4"></b-icon>
        <b-button variant="danger">파파고 api</b-button> -->

        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center"
            ><b-avatar
              variant="primary"
              v-text="userInfo ? userInfo.userid.charAt(0).toUpperCase() : ''"
            ></b-avatar
            >{{ userInfo.username }}({{ userInfo.userid }})님
            환영합니다.</b-nav-item
          >
          <b-nav-item class="align-self-center"
            ><router-link
              :to="{ name: 'MyPage' }"
              class="link align-self-center"
              >내정보보기</router-link
            ></b-nav-item
          >
          <b-nav-item
            class="link align-self-center"
            @click.prevent="onClickLogout"
            >로그아웃</b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="people" font-scale="2"></b-icon>
            </template>
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'SignUp' }" class="link"
                ><b-icon icon="person-circle"></b-icon> 회원가입</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'SignIn' }" class="link"
                ><b-icon icon="key"></b-icon> 로그인</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
      
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

// import { Vue } from 'vue'
// import { BootstrapVue, BIcon, BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'

// Vue.use(BootstrapVue)
// Vue.component('BIcon', BIcon)
// Vue.component('BIconArrowUp', BIconArrowUp)
// Vue.component('BIconArrowDown', BIconArrowDown)


const memberStore = "memberStore";



export default {
  name: "NaviBar",
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      if (this.$route.path != "/") this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style>
.bggg{
  background-image: url('~@/assets/house1.png');
  background-repeat: no-repeat;
  margin-bottom: 0px;
  padding-top: 1rem;
  padding-bottom: 1rem;
  position: relative;
  margin-bottom: 3rem;
  padding-top: calc(8rem + 2px);
  padding-bottom: 6rem;
  background-color: #6c757d;
  background-size: cover;
  background-attachment: scroll;
}
</style>
