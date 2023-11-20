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

function deleteUserService(id){
    return axios.delete('/api/delete-user', {data: {id : id}});
}

function updateUserService(user){
    return axios.put('/api/edit-user', user);
}

function getAllCodeService(type){
    return axios.get(`/api/allcode?type=${type}`);
}

function getTopDoctorHomeService(limit) {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

function getAllDoctors() {
    return axios.get(`/api/top-doctor-home`);
}

function saveDetailDoctorService(data) {
    return axios.post(`/api/save-info-doctors`, data);
}

export {
    handleLoginApi,
    getAllUsers,createNewUserService,
    deleteUserService, 
    updateUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService
}
