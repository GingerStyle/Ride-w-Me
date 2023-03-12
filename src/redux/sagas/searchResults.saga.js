import axios from 'axios';
import { put, takeEvery } from "redux-saga/effects";

function* searchResults() {
    yield takeEvery('GET_SEARCH_RESULTS', getResults);
}

function* getResults(action) {
    try{
        const results = yield axios.get('/api/search', {payload: action.payload});
        yield put({type: 'SET_RESULTS', payload: results.data});
    }catch(error) {
        console.log('error in getResults', error);
    }
}

export default searchResults;