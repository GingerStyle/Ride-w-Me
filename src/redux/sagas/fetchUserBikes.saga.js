import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';

function* userBikes() {
    try{
        const bikes = yield axios.get('/api/bike/userBikes');
        yield put({type: 'SET_BIKES', payload: bikes.data});
    }catch (error){
        console.log('error in fetchUserBikes', error);
    }
}

function* fetchUserBikes() {
    yield takeEvery('FETCH_USER_BIKES', userBikes);
}

export default fetchUserBikes;