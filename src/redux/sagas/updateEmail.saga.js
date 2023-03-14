import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* updateEmail() {
    yield takeEvery('UPDATE_EMAIL', update);
}

function* update(action) {
    try{
        yield axios.put(`/api/user/updateEmail/${action.payload.email}`);
        yield put({type: 'FETCH_USER'});
    }catch (error) {
        console.log('error in email update axios request', error);
    }
}

export default updateEmail;