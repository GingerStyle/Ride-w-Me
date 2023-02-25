import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>Ride w/ Me is a student solo project by Myles Voigt for Prime Digital Academy. 
          It solves the problem that myself and many people I know that ride bikes face; 
          working out schedules with your friends without having to always plan something weeks in advance.
          Ride w/ Me allows you to just put your availability out there and search your friends to just go on a ride.
          </p>
      </div>
    </div>
  );
}

export default AboutPage;
