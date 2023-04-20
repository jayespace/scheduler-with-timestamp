import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// axios.defaults.withCredentials = true;

async function get(endpoint, query='') {
  console.log(`GET 요청 ${`${apiUrl + endpoint}`}`);

  let url = query
    ? `${apiUrl + endpoint}?date=${query}`
    : `${apiUrl + endpoint}`;

  return axios.get(url, {
    // Including HTTPOnly cookie for JWT Token
    withCredentials: true
  });
}

async function post(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = data ? JSON.stringify(data) : {};
  console.log(`POST 요청: ${apiUrl + endpoint}`);

  return axios.post(apiUrl + endpoint, bodyData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function patch(endpoint, data) {
  const bodyData = JSON.stringify(data);
  console.log(`PATCH 요청: ${apiUrl + endpoint}`);

  return axios.patch(apiUrl + endpoint, bodyData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint, params='') {
  console.log(`DELETE 요청: ${apiUrl + endpoint}`);

  if (params === '') {
    alert("스케줄을 먼저 선택해주세요")
    return
  }

  const url = `${apiUrl + endpoint}/${params}`

  return axios.delete(url, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면, A.get, A.post 로 쓸 수 있음.
export { get, post, patch, del as delete };