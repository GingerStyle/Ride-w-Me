import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* removeBikeTypeToUser() {
    yield takeEvery('REMOVE_BIKE_FROM_USER', removeBike)
}

function* removeBike(action){
    try{
        yield axios.delete(`/api/bike/removeType/${action.payload.bikeType}`);
        yield put({type: 'FETCH_USER_BIKES'});
    }catch (error){
        console.log('error in removeBikeTypeToUser', error);
    }
}

export default removeBikeTypeToUser;