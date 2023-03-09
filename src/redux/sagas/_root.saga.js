import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import userBikes from './fetchUserBikes.saga';
import bikeTypes from './fetchBikeTypes.saga';
import addBikeType from './addBikeToUser.saga';
import removeBikeType from './removeBikeFromUser.saga';
import stringFormatter from './stringFormatter.saga';
import updateEmail from './updateEmail.saga';
import updatePhone from './updatePhone.saga';
import bikePageInfo from './bikePageInfo.saga';
import datesAvailable from './datesAvailable.saga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    userBikes(),
    bikeTypes(),
    addBikeType(),
    removeBikeType(),
    stringFormatter(),
    updateEmail(),
    updatePhone(),
    bikePageInfo(),
    datesAvailable(),
  ]);
}
