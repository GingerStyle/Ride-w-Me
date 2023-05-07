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
  const [password, setPassword] = useState('');

  useEffect(() => {
    //get the list of bike types that user owns
    dispatch({type: 'FETCH_USER_BIKES'});
  }, []);

  //function that handles what happens when the submit button to edit the phone number is clicked
  const handlePhoneSubmit = () => {
    //update user phone number in the database
    dispatch({type: 'UPDATE_PHONE', payload: {phone: phone}});
    //change DOM to show the new phone number and edit button
    togglePhoneInput();
  }

  //function that handles what happens when the submit button to edit the email is clicked
  const handleEmailSubmit = () => {
    //check to make sure the email field isn't empty
    if (email == ''){
      alert('an email address is required');
    }else{
      //update user email in the database
      dispatch({type: 'UPDATE_EMAIL', payload: {email: email}});
      //change DOM to show the new email and edit button
      toggleEmailInput();
    }
  }

  //function to handle when the Change Password button is clicked
  const changePassword = () => {
    dispatch({type: 'UPDATE_PASSWORD', payload: {password: password}})
  }

  //toggles the value of the togglePhone variable
  const togglePhoneInput = () => {
    setTogglePhone(!togglePhone);
  }

  //toggles the value of the toggleEmail variable
  const toggleEmailInput = () => {
    setToggleEmail(!toggleEmail);
  }

  
  return (
    <div className="user-page-container">
      <div className="content-container">
        <h2>Welcome, {user.username}!</h2>

        <div>
          <div className="btn-group">
            <button className=" btn" onClick={() => history.push('/availability')}>Availability</button>{' '}
            <button className=" btn" onClick={() => history.push('/search')}>Search for Rides</button>
          </div>

          <br></br>

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

          <div className="btn-group">
            <button className="btn" onClick={() => changePassword()}>Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;