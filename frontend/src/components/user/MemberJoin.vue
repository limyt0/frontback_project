<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3 class="h3">회원가입하기</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3 text-left1" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError">아이디 또는 비밀번호를 확인하세요.</b-alert>
            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                id="userid"
                v-model="newuser.userid"
                label-for="userid"
                required
                placeholder="아이디 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="newuser.userpwd"
                label-for="userpwd"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="사용자이름:" label-for="username">
              <b-form-input
                id="username"
                v-model="newuser.username"
                label-for="username"
                required
                placeholder="사용자이름 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이메일:" label-for="email">
              <b-form-input
                id="email"
                v-model="newuser.email"
                label-for="email"
                required
                placeholder="이메일 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-button
              type="button"
              variant="primary"
              class="m-1 btn1"
              @click="confirm"
              >회원가입</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { userJoin } from "@/api/member";
const memberStore = "memberStore";

export default {
  name: "userJoin",
  data() {
    return {
      newuser: {
        userid: null,
        username: null,
        userpwd: null,
        email: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm"]),
    confirm() {
      console.log("memberJoin vue/confirm");
      //this.userJoined();
      userJoin(
        {
          userid: this.newuser.userid,
          username: this.newuser.username,
          userpwd: this.newuser.userpwd,
          email: this.newuser.email,
        },
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "회원가입이 완료되었습니다.!";
          }
          alert(msg);
          //this.moveList();
          this.$router.push({ name: "Home" });
        },
        (error) => {
          console.log(error);
        }
      );

      
      
    },
  },
};
</script>

<style>
.h3{
  color: white;
  text-align: center;
  margin: 30px;
}
.btn1 {
  position:relative;
  left:40%;
  transform: translateX(-50%);
  margin-bottom: 40px;
  width:80%;
  height:40px;
  background: linear-gradient(125deg,#81ecec,#6c5ce7,#81ecec);
  background-position: left;
  background-size: 200%;
  color:white;
  font-weight: bold;
  border:none;
  cursor:pointer;
  transition: 0.4s;
  display:inline;
}

.btn:hover {
  background-position: right;
}

</style>
