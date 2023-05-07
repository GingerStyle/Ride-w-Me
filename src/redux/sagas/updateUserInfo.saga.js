import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* updateUserInfo() {
    yield takeEvery('UPDATE_EMAIL', updateEmail);
    yield takeEvery('UPDATE_PHONE', updatePhone);
    yield takeEvery('UPDATE_PASSWORD', updatePassword);
}

function* updateEmail(action) {
    try{
        yield axios.put(`/api/user/updateEmail/${action.payload.email}`);
        yield put({type: 'FETCH_USER'});
    }catch (error) {
        console.log('error in email update axios request', error);
    }
}

function* updatePhone(action) {
    try{
        yield axios.put(`/api/user/updatePhone/${action.payload.phone}`)
        yield put({type: 'FETCH_USER'});
    }catch (error) {
        console.log('error in phone update axios request', error);
    }
}

function* updatePassword(action) {
    try{
        yield axios.put(`/api/user/updatePassword/${action.payload.password}`)
    }catch (error) {
        console.log('error in password update axios request', error);
    }
}

export default updateUserInfo;