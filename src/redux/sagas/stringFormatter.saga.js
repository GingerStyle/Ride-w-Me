import { put, takeEvery } from "redux-saga/effects";


function* stringFormatter() {
    yield takeEvery('FORMAT_STRING', formatter);
}

function* formatter(action) {
    let userBikes = action.payload;
    let string = '';
    if(userBikes.length == 1){
        string += 'a ' + userBikes[0].type + ' bike';
        yield put({type: 'SET_STRING', payload: string});
    }else if(userBikes.length > 1){
        for(let i=0; i<userBikes.length; i++){
            if(i < userBikes.length - 1){
                string += userBikes[i].type + ', ';
            }else if(i == userBikes.length - 1){
                string += 'and ' + userBikes[i].type + ' bikes';
                yield put({type: 'SET_STRING', payload: string});
    };
    }};
}

export default stringFormatter;