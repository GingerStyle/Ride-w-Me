import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* updatePhone() {
    yield takeEvery('UPDATE_PHONE', update);
}

function* update(action) {
    try{
        yield axios.put(`/api/bike/updatePhone/${action.payload.phone}`)
        yield put({type: 'FETCH_USER'});
    }catch (error) {
        console.log('error in phone update axios request', error);
    }
}

export default updatePhone;