import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';

function* datesAvailable() {
    yield takeEvery('POST_DATE', postDate);
    yield takeEvery('GET_DATES', getDates);
    yield takeEvery('DELETE_DATE', deleteDate);
    yield takeEvery('DELETE_OLD_DATES', deleteOldDates);
}

function* postDate(action) {
    try{
        yield axios.post('/api/dates/add', {date: action.payload});
    }catch (error){
        console.log('error in datesAvailable', error);
    }
}

function* getDates() {
    try{
        let dates = yield axios.get('/api/dates/get');
        yield put({type: 'SAVE_DATES', payload: dates.data});
    }catch (error){
        console.log('error in getDates', error);
    }
}

function* deleteDate(action) {
    try{
        yield axios.delete(`/api/dates/delete/${action.payload}`);
        yield put({type: 'GET_DATES'});
    }catch (error){
        console.log('error in deleteDate', error);
    }
}

function* deleteOldDates(action) {
    try{
        yield axios.delete(`/api/dates/deleteOld/${action.payload}`);
    }catch (error){
        console.log('error in deleteOldDates', error);
    }
}

export default datesAvailable;