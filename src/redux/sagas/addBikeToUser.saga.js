import axios from 'axios';
import { takeEvery } from 'redux-saga/effects';

function* addBikeTypeToUser() {
    yield takeEvery('ADD_BIKE_TO_USER', addBike)
}

function* addBike(action){
    try{
        yield axios.post('/api/bike/addType', action.payload);
    }catch (error){
        console.log('error in addBikeTypeToUser', error);
    }
}

export default addBikeTypeToUser;