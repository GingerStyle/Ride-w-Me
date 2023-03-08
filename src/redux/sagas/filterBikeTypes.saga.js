import {put, takeEvery} from 'redux-saga/effects';

function* filterBikeTypes() {
    yield takeEvery('FILTER_BIKE_TYPES', filterBikes);
}

function* filterBikes(action){
    let bikeTypes = action.payload.typeArray;
    let userBikes = action.payload.userArray;
    // let bikeTypes = [{type:'Mountain'}, {type:'Road'}, {type:'BMX'}];
    // let userBikes = [{type:'Mountain'}, {type:'BMX'}];
    console.log('action.payload contains:', action.payload);
    let filteredArray = bikeTypes.filter((bike) => {
        return !userBikes.find((value) => {
            return bike.type === value.type
        });
    });
    yield put({type:'SET_FILTERED_BIKES', payload: filteredArray});
}

export default filterBikeTypes;