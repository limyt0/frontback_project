<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        :img-src="require('@/assets/instruction1.png')"
      >
              <h1>페이지 구글 번역 이용하기</h1>
        <p> 마우스 우클릭을하여 베트남 언어로 번역이 가능합니다.
          </p></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide :img-src="require('@/assets/instruction2.png')">
        <h1>번역된 언어(베트남)</h1>
        <p> 해당 페이지에서 다른 언어(베트남)으로 변경된 것을 확인할 수 있습니다.
          </p>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide :img-src="require('@/assets/instruction3.png')">
              <h1>추가 언어 설정 방법</h1>
        <p> 다른 언어를 이용하기 위해 구글 계정에서 설정으로 들어 갑니다.
          </p>
      
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            :src="require('@/assets/instruction4.png')"
            alt="image slot"
          >
        </template>
                <h1>언어 설정 들어가기</h1>
        <p> 빨간색으로 표시된 부분을 클릭하여 추가 언어 설정이 가능 합니다.
          </p>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide  :img-src="require('@/assets/instruction5.png')">
        <h1>언어 고급 설정</h1>
        <p> 해당 페이지에서 기본 언어 지정 및 번역 옵션을 추가할 수 있습니다.
          </p>
      </b-carousel-slide>
    </b-carousel>

  </div>
</template>

<script>
export default {
  name: "Instargram",
  
};
</script>

<style scoped>

h1{color: red;}
p{color: black;}
</style>
