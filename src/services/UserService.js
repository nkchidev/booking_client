import axios from "../axios";

function handleLoginApi(email, password) {
    return axios.post('/api/login', {email, password});
}

function getAllUsers(id){
    return axios.get(`/api/get-all-users?id=${id}`);
}

function createNewUserService(data){
    return axios.post('/api/create-user', data);
}

export {handleLoginApi,getAllUsers,createNewUserService}
