<template>
  <b-container class="bv-example-row mt-3 text-center member-text-center">
    <h3 class="underline-steelblue" style="color: white">
      <b-icon icon="person-check-fill" ></b-icon> 회원서비스
    </h3>
    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: "Member",
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(72, 190, 233, 0.3) 30%
  );
}

.member-text-center {
  background: #34495e;
} 

/* .bottomText {
  //text-align: center;
} */
</style>
