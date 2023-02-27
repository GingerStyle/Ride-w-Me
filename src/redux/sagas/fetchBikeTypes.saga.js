import { put } from "redux-saga/effects";
import axios from 'axios';

function* fetchBikeTypes() {
    try{
        const bikeList = yield axios.get('/api/bike/types');
        yield put({type: 'SET_BIKE_TYPES', payload: bikeList.data});
    }catch (error){
        console.log('error in fetchBikeType', error);
    }
}

export default fetchBikeTypes;