import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SearchPage.css';

function SearchPage() {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState('');
  const [bikeSelected, setBikeSelected] = useState('');
  const [today, setToday] = useState(new Date().toJSON().slice(0, 10));
  const bikeTypes = useSelector(store => store.bikeTypes);
  const searchResults = useSelector(store => store.searchResults);

  useEffect(() => {
    //get the list of available bike types
    dispatch({type: 'FETCH_BIKE_TYPES'});
  }, []);

  //function to handle when the user clicks the Search For A Ride! button
  const handleSearchForRides = () => {
    //check that user has selected a date
    if(selectedDate == ''){
      alert('Please select a date.');
    }
    //check that user has selected a bike type
    else if (bikeSelected == ''){
      alert('Please select a bike type');
    }
    //if both are selected
    else {
      //get serach results from the database
      dispatch({type: 'GET_SEARCH_RESULTS', payload: {date: selectedDate, bike: bikeSelected}});
    }
  }


  return (
    <div className="search-page-container">
      <div className="inputs-container">
        <h3>Select a date and a bike type, then search for a ride!</h3>
        
        <br></br>

        <label>Click here to select date:
          <input type="date"
          min={today}
          onChange={(event) => setSelectedDate(event.target.value)}>
          </input>
        </label>

        <br></br>

        <label>Click here to select bike:
          <select id="bike-search-select" onChange={(event) => setBikeSelected(event.target.value)}>
            <option value="">Select Bike Type</option>
            {bikeTypes.map((type) => <option key={type.id} value={type.type}>{type.type}</option>)}
          </select>
        </label>

        <br></br>
        <br></br>

        <div className="search-btn">
          <button className="btn" onClick={() => handleSearchForRides()}>Search For A Ride!</button>
        </div>
      </div>

      <br></br>

      <div className="table-container">
        <table className="result-table">
          <caption>Search Results</caption>

          <thead>
            <tr>
              <th>Name</th>
              <th>From</th>
              <th>To</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {searchResults.map((result) => 
            <tr key={result.id}>
              <td>{result.username}</td>
              <td>{result.fromTime}</td>
              <td>{result.toTime}</td>
              <td>{result.email}</td>
              <td>{result.phone}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchPage;