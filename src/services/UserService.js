import axios from "../axios";

function handleLoginApi(email, password) {
    return axios.post('/api/login', {email, password});
}

export {handleLoginApi}