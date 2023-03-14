import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import stringFormatter from './stringFormatter.saga';
import updateEmail from './updateEmail.saga';
import updatePhone from './updatePhone.saga';
import bikePageInfo from './bikePageInfo.saga';
import datesAvailable from './datesAvailable.saga';
import searchResults from './searchResults.saga';
import bikesSaga from './bikes.saga';


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
    stringFormatter(),
    updateEmail(),
    updatePhone(),
    bikePageInfo(),
    datesAvailable(),
    searchResults(),
    bikesSaga(),
  ]);
}
