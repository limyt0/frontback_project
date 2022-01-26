<template>
  <b-row class="mt-4 mb-4 text-center">
    <!-- <b-col class="sm-3">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col> -->
    
    <!-- <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col> -->
    <b-col class="sm-3">
      <b-form-select
        v-model="sidoCode"
        :options="sidos"
        @change="gugunList"
      ></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select
        v-model="gugunCode"
        :options="guguns"
        @change="dongList"
      ></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select
        v-model="dongCode"
        :options="dongs"
        @change="searchApt"
      ></b-form-select>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

/*
  namespaced: true를 사용했기 때문에 선언해줍니다.
  index.js 에서 modules 객체의 '키' 이름입니다.

  modules: {
    키: 값
    memberStore: memberStore,
    houseStore: houseStore
  }  
*/
const houseStore = "houseStore";

var root = "";

// 마커를 담을 배열입니다
var markers = [];

var map = {};//초기화


export default {
  name: "HouseSearchBar",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "dongs", "houses_mark"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=5e694abc3eab4123ed980e71f0be8e16&​libraries=services,clusterer,drawing";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      console.log("init map");
      const container = document.getElementById("map");
      // const options = {
      //   center: new kakao.maps.LatLng(33.450701, 126.570667),
      //   level: 5,
      // };
      
      const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      map = new kakao.maps.Map(container, mapOption);
      // 장소 검색 객체를 생성합니다
      //this.ps = new kakao.maps.services.Places();
      this.infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      // 커스텀 오버레이를 생성합니다
      this.customOverlay;
      //주소-좌표 변환 객체를 생성합니다
      //this.geocoder = new kakao.maps.services.Geocoder();
    },
    removeMarker() {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
          markers = [];
    },
    getListItem(index, place) {
      var el = document.createElement("li");
      var itemStr = `
        <span class="markerbg marker_${index + 1}></span>
        <div class="info"><h5>${place.aptName}</h5> <button>관심등록</button>
        <span>${place.sidoName} ${place.gugunName} ${place.dongName} ${place.jibun}</span>
      `;
      el.innerHTML = itemStr;
      el.className = "item";

      return el;
    },
    displayMarkers(places) {
      console.log("displayMarkers!!");
      var fragment = document.createDocumentFragment();
      var bounds = new kakao.maps.LatLngBounds();
      this.listStr = "";
      
      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();
        for(var i=0; i<places.length; i++) {
        var placePosition = new kakao.maps.LatLng(places[i].lat, places[i].lng);
        var marker = this.addMarker(placePosition, i);
        var itemEl = this.getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
        
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);
        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker, title, code, place) {
          kakao.maps.event.addListener(marker, "click", function () {
            this.displayInfowindow(marker, title, place);
            console.log(title + " " + code);
          });

            kakao.maps.event.addListener(map, "click", function () {
              console.log(this.customOverlay);
              this.customOverlay.setMap(null);
            });

            itemEl.onmouseover = function () {
              this.displayInfowindow(marker, title);
            };

            itemEl.onmouseout = function () {
              this.customOverlay.setMap(null);
            };
          })(marker, places[i].aptName, places[i].aptCode, places[i]);

          fragment.appendChild(itemEl);
        }
        // 마커를 생성하고 지도에 표시합니다 

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    },
    addMarker(position, idx) { 
      //addMarker(position, idx, title){}
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },
    
    displayInfowindow(marker, title, place) {
      console.log("displayInfowindow!!");
        console.log(title);
        var content = `
          <div class="overlaybox">
            <div class="boxtitle">${title}</div>
            <div class="first"><img src="${root}/img/apt.png" style="width:247px; height:136px;" alt=""></div>
            <ul>
              <li class="up">
                <span class="title">건축년도</span>
                <span class="count">${place.buildYear}</span>
              </li>
              <li>
                <span class="title">주소</span>
                <span class="count">${place.sidoName} ${place.gugunName} ${place.dongName} ${place.jibun}</span>
              </li>
              <li>
                <span class="title">최신거래금액</span>
                <span class="count">${place.recentPrice}</span>
              </li>
              <li>
                <span class="last" id="recenthistor" data-toggle="modal" data-target="#myModal">아파트정보 update</span>
              </li>
            </ul>
          </div>
        `;
        var position = new kakao.maps.LatLng(marker.getPosition().getLat()+0.00033, marker.getPosition().getLng()-0.00003);
        this.customOverlay = new kakao.maps.CustomOverlay({
          position: position,
          content: content,
          xAnchor: 0.3,
          yAnchor: 0.91,
        });
        this.customOverlay.setMap(this.map);
    },
    removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    },
    ...mapActions(houseStore, ["getSido", "getGugun", "getDong", "getHouseList", "getHouseList_mark"]),
    ...mapMutations(houseStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_DONG_LIST"]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      console.log("HouseSearchBar/gugunList");
      console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    dongList() {
      console.log("HouseSearchBar/dongList");
      console.log(this.gugunCode);
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode) this.getDong(this.gugunCode);
    },
    searchApt() {
      console.log(this.dongCode);
      if (this.gugunCode) this.getHouseList(this.gugunCode, this.dongCode);
      if (this.dongCode) this.getHouseList_mark(this.dongCode);
      console.log(this.houses_mark);
      this.displayMarkers(this.houses_mark);
      console.log("HouseSearchBar/searchApt");
    },
  },
};

</script>

<style></style>
