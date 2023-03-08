import { put, takeEvery } from "redux-saga/effects";

function* bikePageInfo() {
    yield takeEvery('GET_BIKE_PAGE_INFO', getInfo);
}

function* getInfo(action) {
    yield put({type:'FETCH_BIKE_TYPES'});
    yield put({type:'FETCH_USER_BIKES'});
    yield put({type:'FILTER_BIKE_TYPES', payload: action.payload});
}

export default bikePageInfo;