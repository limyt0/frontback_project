<template>

  <div class="mt-4">
    <b-spinner label="Spinning"></b-spinner>
    <b-spinner type="grow" label="Spinning"></b-spinner>
    <b-spinner variant="primary" label="Spinning"></b-spinner>
    <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
    <b-spinner variant="success" label="Spinning"></b-spinner>
    <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
    <h4>일에 치여 바쁜 직장인들과 외국인들을 위한 Happy House</h4>
    <b-card :img-src="require('@/assets/foreign.jpeg')" img-alt="Card image" img-left class="mb-3">
      <b-card-text>
        외국에서 놀러온 빠예호씨는 한국말이 서툴러 집을 구하기가 어려웠습니다. <br>
        그는 해피 하우스를 통해서 새로운 삶의 터전을 마련 했습니다. <br>
        빠예호: 오우 하쿡 불고기 마시써효

      </b-card-text>
    </b-card>

    <b-card :img-src="require('@/assets/worker.jpeg')" img-alt="Card image" img-right>
      <b-card-text>
        잦은 야근과 거래처 미팅으로 바쁜 삶을 보내는 김싸피씨는 직장 근처의 새로운 집 정보 찾기가 어려웠습니다. <br>
        그는 해피 하우스를 통해 새로운 보금자리를 마련 했습니다. <br>
        김싸피: 싸피 6기 12반 화이팅~
      </b-card-text>
    </b-card>

  <b-card-group deck>
    <b-card title="임영택" :img-src="require('@/assets/lim.jpeg')" img-alt="Image" img-top>
      <b-card-text>
        오버워치 그랜드 마스터 <br>
        즐기는 개발자
      </b-card-text>
      <template #footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>

    <b-card title="한정섭" :img-src="require('@/assets/han2.jpeg')" img-alt="Image" img-top>
      <b-card-text>
        이태원 포커리움 프리롤 이벤트 우승 <br>
        집념있는 개발자

      </b-card-text>
      <template #footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>


  </b-card-group>


  </div>





</template>

<script>
export default {
  name: "Main",
  props: {
    msg: String,
  },
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
</style>
