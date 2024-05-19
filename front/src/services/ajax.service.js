import axios from "axios";

function get(url, data={}) {
    return axios.get(`${url}`, data);
}
function post(url, data) {
    return axios.post(`${url}`, data);
}
function deleted(url) {
    return axios.delete(`${url}`);
}
function put(url, data) {
    return axios.put(`${url}`, data);
}

export  { get, post,deleted, put };