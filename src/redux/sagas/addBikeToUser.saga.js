import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* addBikeTypeToUser() {
    yield takeEvery('ADD_BIKE_TO_USER', addBike)
}

function* addBike(action){
    try{
        yield axios.post('/api/bike/addType', action.payload);
        yield put({type: 'FETCH_USER_BIKES'});
    }catch (error){
        console.log('error in addBikeTypeToUser', error);
    }
}

export default addBikeTypeToUser;