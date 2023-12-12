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

function getAllDoctorsService() {
    return axios.get(`/api/top-doctor-home`);
}

function saveDetailDoctorService(data) {
    return axios.post(`/api/save-info-doctors`, data);
}

function getDetailInfoDoctorService(id){
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}
function saveBulkScheduleDoctor(data){
    return axios.post('/api/bulk-create-schedule', data);
}
function getScheduleDoctorByDate(doctorId, date){
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

function getExtraInforDoctorById(doctorId){
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

function getProfileDoctorById(doctorId){
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

function postPatientBookAppoiment(data){
    return axios.post(`/api/patient-book-appointment`, data);
}

function createNewSpecialty(data){
    return axios.post(`/api/create-new-specialty`, data);
}

function getAllSpecialty(){
    return axios.get(`/api/get-specialty`);
}

function postVerifyBookAppoiment(data){
    return axios.post(`/api/verify-book-appointment`, data);
}

function getAllDetailSpecialtyById(data){
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

function createNewClinic(data){
    return axios.post(`/api/create-new-clinic`, data);
}

function getAllClinic(){
    return axios.get(`/api/get-clinic`);
}

function getAllDetailClinicById(id){
    return axios.get(`/api/get-detail-clinic-by-id?id=${id}`);
}

function getAllPatientForDoctor(data){
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}

function postSendRemedy(data) {
    return axios.post(`/api/send-remedy`, data);
}


export {
    handleLoginApi,
    getAllUsers,createNewUserService,
    deleteUserService, 
    updateUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorsService,
    saveDetailDoctorService,
    getDetailInfoDoctorService,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookAppoiment,
    createNewSpecialty,
    getAllSpecialty,
    postVerifyBookAppoiment,
    getAllDetailSpecialtyById,
    createNewClinic,
    getAllClinic,
    getAllDetailClinicById,
    getAllPatientForDoctor,
    postSendRemedy
}
