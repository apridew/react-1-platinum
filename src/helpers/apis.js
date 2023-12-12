import axios from 'axios';

export async function getAllMenusAPI(paging, name, type) {
  const response = await axios.get(
    `https://api.mudoapi.tech/menus?perPage=5&page=${paging}&name=${name}&type=${type}`
  );
  return response;
}

export async function loginAPI(bodyPayload) {
  const response = await axios.post(`https://api.mudoapi.tech/login`, bodyPayload);
  return response;
}

export async function getDetailMenuAPI(id) {
  const response = await axios.get(`https://api.mudoapi.tech/menu/${id}`);
  return response;
}

export async function deleteMenuAPI(id, config) {
  const response = await axios.delete(`https://api.mudoapi.tech/menu/${id}`, config);
  return response;
}

export async function createMenuAPI(form, config) {
  const response = await axios.post(`https://api.mudoapi.tech/menu`, form, config);
  return response;
}

export async function editMenuAPI(id, form, config) {
  const response = await axios.put(`https://api.mudoapi.tech/menu/${id}`, form, config);
  return response;
}
