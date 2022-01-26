import { apiInstance, houseInstance } from "./index.js";

const api = apiInstance();
const house = houseInstance();

function sidoList(success, fail) {
  api.get(`/map/sido`).then(success).catch(fail);
}

function gugunList(params, success, fail) {
  console.log("house.js/gugunList");
  api.get(`/map/gugun`, { params: params }).then(success).catch(fail);
}
function dongList(params, success, fail) {
  console.log("house.js/dongList");
  console.log(params);
  api.get(`/map/dong`, { params: params }).then(success).catch(fail);
}

function houseList(params, success, fail) {
  console.log("house.js/houseList");
  console.log(params);
  house.get(``, { params: params }).then(success).catch(fail);
}

function houseList_mark(params, success, fail) {
  console.log("house.js/houseList_mark");
  console.log(params);
  api.get(`/map/apt`, { params: params }).then(success).catch(fail);
}

export { sidoList, gugunList, dongList, houseList, houseList_mark };
