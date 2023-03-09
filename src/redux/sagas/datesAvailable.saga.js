import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';

function* datesAvailable() {
    yield takeEvery('POST_DATE', postDate);
    yield takeEvery('GET_DATES', getDates);
}

function* postDate(action) {
    try{
        yield axios.post('/api/dates/add', {date: action.payload});
    }catch (error){
        console.log('error in datesAvailable', error);
    }
}

function* getDates(){
    try{
        let dates = yield axios.get('/api/dates/get');
        yield put({type: 'SAVE_DATES', payload: dates.data});
    }catch (error){
        console.log('error in getDates', error);
    }
}

export default datesAvailable;