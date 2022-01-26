import { sidoList, gugunList, dongList, houseList, houseList_mark } from "@/api/house.js";
//import MyCustom from "@/components/house/HouseList.vue";
// import Vue from "vue";

// Vue.use(MyCustom)

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "시도 선택" }],
    guguns: [{ value: null, text: "구군 선택" }],
    dongs: [{ value: null, text: "동 선택" }],
    houses: [],
    houses_mark: [],
    house: null,
  },

  getters: {},

  mutations: {
    SET_SIDO_LIST: (state, sidos) => {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST: (state, guguns) => {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    SET_DONG_LIST: (state, dongs) => {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, text: dong.dongName });
        //state.guguns.push({ value: dong.gugunCode, text: dong.gugunName });
        console.log(dong);
      });
    },
    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [{ value: null, text: "시도 선택" }];
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [{ value: null, text: "구군 선택" }];
    },
    CLEAR_DONG_LIST: (state) => {
      state.dongs = [{ value: null, text: "동 선택" }];
    },
    SET_HOUSE_LIST: (state, houses) => {
      console.log("houseStore/SET_HOUSE_LIST");
      console.log(houses);
      state.houses = houses;
    },
    SET_DETAIL_HOUSE: (state, house) => {
      state.house = house;
    },
    SET_HOUSE_MARK: (state, houses_mark) => {
      state.houses_mark = houses_mark;
    },
  },

  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          //console.log(data);
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = {
        sido: sidoCode,
      };
      gugunList(
        params,
        ({ data }) => {
          console.log(commit, data);
          console.log("houseStore/gugunList");
          //console.log(data);
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDong: ({ commit }, gugunCode) => {
      const params = {
        gugun: gugunCode,
      };
      dongList(
        //첫번째 data
        params,
        //두번째 성공시 실행하는 함수
        ({ data }) => {
          console.log(commit, data);
          console.log("houseStore/dongList");
          //console.log(data);
          commit("SET_DONG_LIST", data);
        },
        //세번째 실패시 실행하는 함수
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseList: ({ commit }, gugunCode, dongCode) => {
      console.log(gugunCode);
      // const params = {
      //   dong: dongCode,
      // };
      // houseList(
      //   params,
      //   ({ data }) => {
      //     console.log(commit, data);
      //     console.log("houseStore/houseList");
      //     //console.log(data);
      //     commit("SET_HOUSE_LIST", data);
      //   },
      //   (error) => {
      //     console.log(error);
      //   }
      // );
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      // const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
      //     "9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D";
      
      const SERVICE_KEY = "9puyfjWSTimHTrGrgBpVZsQSg2dWeHL%2B4GsMRKZxLN4hg1KGcPOfgF9Sn86Dd3%2BNhCjf433pV0kXa9T%2F7BK1EA%3D%3D";
      const params = {
        LAWD_CD: gugunCode,
        DEAL_YMD: "202110",
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      houseList(
        params,
        (response) => {
          console.log(response);
          console.log(params);
          console.log(response.data);
          console.log(response.data.response);
          console.log(response.data.response.body);
          console.log(response.data.response.body.items);
          console.log(response.data.response.body.items.item);
          console.log(response.data.response.body.items.item.dongCode);
          console.log("houseStore/houseList");
          console.log(dongCode);
          commit("SET_HOUSE_LIST", response.data.response.body.items.item);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseList_mark: ({ commit }, dongCode) => {
      const params = {
        dong: dongCode,
      };
      houseList_mark(
        params,
        ({ data }) => {
          console.log(commit, data);
          console.log("houseStore/houseList_mark");
          //console.log(data);
          commit("SET_HOUSE_MARK", data);
          //displayMarkers(data);
          //
          //SET_HOUSE_MARK
          //MyCustom.displayMarkers(data);
          //this.$displayMarkers(data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      console.log("houseStore/detailHouse");
      //console.log(house);
      commit("SET_DETAIL_HOUSE", house);
    },
  },
};

export default houseStore;
