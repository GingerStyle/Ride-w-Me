import { put, takeEvery } from "redux-saga/effects";

function* bikePageInfo() {
    yield takeEvery('GET_BIKE_PAGE_INFO', getInfo);
}

function* getInfo() {
    yield put({type:'FETCH_BIKE_TYPES'});
    yield put({type:'FETCH_USER_BIKES'});
}

export default bikePageInfo;