import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UserPage.css';

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
    <div className="user-page-container">
      <div className="content-container">
        <h2>Welcome, {user.username}!</h2>
        <div>
          {bikeTypeString}. <button className="btn" onClick={() => history.push('/bike')}>Edit</button>
          <br></br>
          {'Phone: '}
          {togglePhone ?
            <>{user.phone} <button className="btn" onClick={togglePhoneInput}>Edit</button></>
          :
            <><input onChange={(event) => setPhone(event.target.value)}></input> 
            <button className="btn" onClick={handlePhoneSubmit}>Submit</button></>
          }
          <br></br>
          {'Email: '}
          {toggleEmail ?
            <>{user.email} <button className="btn" onClick={toggleEmailInput}>Edit</button></>
          :
          <><input required type="email" onChange={(event) => setEmail(event.target.value)}></input> 
          <button className="btn" onClick={handleEmailSubmit}>Submit</button></>
          }
          <br></br>
          <br></br>
          <button className="btn-group btn" onClick={() => history.push('/availability')}>Availability</button>{' '}
          <button className="btn-group btn" onClick={() => history.push('/search')}>Search for Rides</button>
        </div>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
