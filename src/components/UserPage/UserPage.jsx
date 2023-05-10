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
  const [togglePassword, setTogglePassword] = useState(true);
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
      alert('An email address is required.');
    }else{
      //update user email in the database
      dispatch({type: 'UPDATE_EMAIL', payload: {email: email}});
      //change DOM to show the new email and edit button
      toggleEmailInput();
    }
  }

  //function to handle what happens when user clicks button to submit new password
  const handlePasswordSubmit = () => {
    if (password == ''){
      //check that something was entered
      alert('Please enter in a new password.')
    }else{
      //update user password in the database
      dispatch({type: 'UPDATE_PASSWORD', payload: {password: password}});
      //update DOM to show 'Change Password' button
      togglePasswordInput();
    }
  }

  //toggles the value of the togglePhone variable
  const togglePhoneInput = () => {
    setTogglePhone(!togglePhone);
  }

  //toggles the value of the toggleEmail variable
  const toggleEmailInput = () => {
    setToggleEmail(!toggleEmail);
  }

  //toggles the value of the togglePassword variable
  const togglePasswordInput = () => {
    setTogglePassword(!togglePassword);
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
            {togglePassword ?
              <><button className="btn" onClick={() => togglePasswordInput()}>Change Password</button></>
              :
              <><input required  onChange={(event) => setPassword(event.target.value)}></input>
              <button className="btn" onClick={() => handlePasswordSubmit()}>Submit</button>{' '}
              <button className="btn" onClick={() => togglePasswordInput()}>Cancel</button>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;