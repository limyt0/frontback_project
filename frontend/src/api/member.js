import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}
async function userJoin(user, success, fail) {
  console.log("member.js/userJoin");
  console.log(user);
  api.post(`/user`, JSON.stringify(user)).then(success).catch(fail);
}
// function logout(success, fail)

export { login, findById, userJoin };
