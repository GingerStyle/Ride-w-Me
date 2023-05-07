import axios from 'axios';
import { put, takeEvery } from "redux-saga/effects";

function* searchResults() {
    yield takeEvery('GET_SEARCH_RESULTS', getResults);
}

function* getResults(action) {
    try{
        //using a post route to get results for the benefit of sending data through to the server
        const results = yield axios.post('/api/search', action.payload);
        yield put({type: 'SET_RESULTS', payload: results.data});
    }catch(error) {
        console.log('error in getResults', error);
    }
}

export default searchResults;