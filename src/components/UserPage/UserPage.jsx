import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const userBikes = useSelector(store => store.userBikes);
  const bikeTypeString = useSelector(store => store.bikeTypeString);
  const bikeTypes = useSelector(store => store.bikeTypes);

  useEffect(() => {
    //get the list of bike types that user owns
    dispatch({type: 'FETCH_USER_BIKES'});
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <div>
      You own {bikeTypeString}. <button onClick={() => history.push('/bike')}>Edit</button>
        <br></br>
        Phone: {user.phone} <button>Edit</button>
        <br></br>
        Email: {user.email} <button>Edit</button>
      </div>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
