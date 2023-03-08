import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';

function* userBikes() {
    try{
        //get list of bikes that the user owns from the database
        const bikes = yield axios.get('/api/bike/userBikes');
        //save the list in a reducer
        yield put({type: 'SET_BIKES', payload: bikes.data});
        //update the string with the user's bikes
        yield put({type: 'FORMAT_STRING', payload: bikes.data});
    }catch (error){
        console.log('error in fetchUserBikes', error);
    }
}

function* fetchUserBikes() {
    yield takeEvery('FETCH_USER_BIKES', userBikes);
}

export default fetchUserBikes;