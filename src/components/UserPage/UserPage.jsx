import React, {useEffect, useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const bikeTypeString = useSelector(store => store.bikeTypeString);
  const [togglePhone, setTogglePhone] = useState(true);
  const [toggleEmail, setToggleEmail] = useState(true);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    //get the list of bike types that user owns
    dispatch({type: 'FETCH_USER_BIKES'});
  }, []);

  //function that handles what happens when the submit button to edit the phone number is clicked
  const handlePhoneSubmit = () => {
    dispatch({type: 'UPDATE_PHONE', payload: {phone: phone}});
    togglePhoneInput();
  }

  //function that handles what happens when the submit button to edit the email is clicked
  const handleEmailSubmit = () => {
    if (email == ''){
      alert('an email address is required');
    }else{
      dispatch({type: 'UPDATE_EMAIL', payload: {email: email}});
      toggleEmailInput();
    }
  }

  const togglePhoneInput = () => {
    setTogglePhone(!togglePhone);
  }

  const toggleEmailInput = () => {
    setToggleEmail(!toggleEmail);
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <div>
        {bikeTypeString}. <button onClick={() => history.push('/bike')}>Edit</button>
        <br></br>
        {'Phone: '}
        {togglePhone ?
          <>{user.phone} <button onClick={togglePhoneInput}>Edit</button></>
        :
          <><input onChange={(event) => setPhone(event.target.value)}></input> <button onClick={handlePhoneSubmit}>Submit</button></>
        }
        <br></br>
        {'Email: '}
        {toggleEmail ?
          <>{user.email} <button onClick={toggleEmailInput}>Edit</button></>
        :
        <><input required type="email" onChange={(event) => setEmail(event.target.value)}></input> <button onClick={handleEmailSubmit}>Submit</button></>
        }
        <br></br>
        <br></br>
        <button onClick={() => history.push()}>Availability</button> <button onClick={() => history.push('/search')}>Search for Rides</button>
        
      </div>
      <br></br>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
