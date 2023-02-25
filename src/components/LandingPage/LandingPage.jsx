import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to Ride w/ Me');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            Do you ride a bike? Do you have friends that ride bikes? 
            Do you ride your bike with those friends as much as you would like, or are you one of the many people that seem to ride by themselves more often than they would like?
            We all live busy lives and it can be hard to schedule bike rides with friends especially on short notice. 
            Well Ride w/ Me works to fix this problem by providing a way for friends to show their short term schedule of when they are available to ride with other friends. 
            Ride w/ Me allows you to search for friends with dates that you want to ride and also own the type of bike that you want to ride. 
            Want to ride your mountain bike this Saturday? See which of your friends has a mountain bike and wants to ride this Saturday. 
            Want to ride your road bike next Tuesday, find out who rides road bikes and can go for a ride that day.
          </p>
          <p>
            So sign up or login today and get out there riding with your friends!
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
