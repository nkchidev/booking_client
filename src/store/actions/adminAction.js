import actionTypes from './actionTypes';
import { createNewUserService, 
    getAllCodeService, 
    getAllUsers, 
    deleteUserService,
    updateUserService, 
    getTopDoctorHomeService, 
    getAllDoctorsService, 
    saveDetailDoctorService
} from "../../services/UserService";
import { toast } from 'react-toastify';


export const fetchGenderStart = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START});

            let res = await getAllCodeService('GENDER');
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data));
            }else{
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('FetchGenderStart error', error)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});


export const fetchPostionStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION');
            if(res && res.errCode === 0){
                dispatch(fetchPostionSuccess(res.data));
            }else{
                dispatch(fetchPostionFailed());
            }
        } catch (error) {
            dispatch(fetchPostionFailed());
            console.log('FetchGenderStart error', error)
        }
    }
}

export const fetchPostionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
});

export const fetchPostionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});


export const fetchRoleStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE');
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data));
            }else{
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('FetchGenderStart error', error)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                toast.success('Create a new user succeed!');
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log('Save user failed: ', error);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
});

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
});

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if(res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            }else{
                toast.error('Fetch all users error!');
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            toast.error('Fetch all users error!');
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error: ', error);
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0){
                toast.success('Delete the user succeed!');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                toast.error('Delete the user error!');
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            toast.error('Delete the user error!');
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error: ', error);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateUserService(data);
            if(res && res.errCode === 0){
                toast.success('Update the user succeed!');
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                toast.error('Update the user error!');
                dispatch(updateUserFailed());
            }
        } catch (error) {
            toast.error('Update the user error!');
            dispatch(updateUserFailed());
            console.log('updateUserFailed error: ', error);
        }
    } 
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const updateUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                });
            }else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            console.log('FETCH_TOP_DOCTOR_FAILED: ', error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            });
        }
    } 
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService();
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                });
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            console.log('FETCH_TOP_DOCTOR_FAILED: ', error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            });
        }
    } 
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if(res && res.errCode === 0){
                toast.success('Save Info Detail Doctor succeed!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
            }else{
                toast.error('Save Info Detail Doctor error!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            toast.error('Save Info Detail Doctor error!');
            console.log('SAVE_DETAIL_DOCTOR_FAILED: ', error);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            });
        }
    } 
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                });
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                });
            }
        } catch (error) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', error);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            });
        }
    } 
}

