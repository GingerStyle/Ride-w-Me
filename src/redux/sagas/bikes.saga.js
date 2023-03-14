import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* bikesSaga(){
    yield takeEvery('ADD_BIKE_TO_USER', addBike);
    yield takeEvery('FETCH_BIKE_TYPES', bikeTypes);
    yield takeEvery('FETCH_USER_BIKES', userBikes);
    yield takeEvery('REMOVE_BIKE_FROM_USER', removeBike);
}

function* bikeTypes() {
    try{
        //get list of al bike types available 
        const bikeList = yield axios.get('/api/bike/types');
        //save list in a reducer
        yield put({type: 'SET_BIKE_TYPES', payload: bikeList.data});
    }catch (error){
        console.log('error in fetchBikeType', error);
    }
}

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

function* addBike(action){
    try{
        //add bike type to the user
        yield axios.post('/api/bike/addType', action.payload);
        //refresh the list of bike types that the user owns
        yield put({type: 'FETCH_USER_BIKES'});
    }catch (error){
        console.log('error in addBikeTypeToUser', error);
    }
}

function* removeBike(action){
    try{
        //remove bike type from the user
        yield axios.delete(`/api/bike/removeType/${action.payload.bikeType}`);
        //refresh the list of bike types that the user owns
        yield put({type: 'FETCH_USER_BIKES'});
    }catch (error){
        console.log('error in removeBikeTypeToUser', error);
    }
}

export default bikesSaga;