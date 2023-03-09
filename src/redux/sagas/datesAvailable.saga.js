import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';

function* datesAvailable() {
    yield takeEvery('POST_DATE', postDate);
}

function* postDate(action) {
    try{
        yield axios.post('/api/dates/add', {date: action.payload});
    }catch (error){
        console.log('error in datesAvailable', error);
    }
    
}

export default datesAvailable;