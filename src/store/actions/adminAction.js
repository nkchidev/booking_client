import actionTypes from './actionTypes';
import { getAllCodeService } from "../../services/UserService";


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
            console.log(res);
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