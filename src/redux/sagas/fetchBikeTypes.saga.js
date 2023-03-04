import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';

function* bikeTypes() {
    try{
        const bikeList = yield axios.get('/api/bike/types');
        yield put({type: 'SET_BIKE_TYPES', payload: bikeList.data});
    }catch (error){
        console.log('error in fetchBikeType', error);
    }
}

function* fetchBikeTypes() {
    yield takeEvery('FETCH_BIKE_TYPES', bikeTypes);
}

export default fetchBikeTypes;