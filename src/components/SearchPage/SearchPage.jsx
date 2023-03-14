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
    if(selectedDate == ''){
      alert('Please select a date.');
    }else if (bikeSelected == ''){
      alert('Please select a bike type');
    }else {
      dispatch({type: 'GET_SEARCH_RESULTS', payload: {date: selectedDate, bike: bikeSelected}});
    }
  }

  return (
    <div className="search-page-container">
      <div className="inputs-container">
        <h3>Select a date, select a bike type, then search for a ride!</h3>
        <label>Click here to select date:
          <input type="date"
          min={today}
          onChange={(event) => setSelectedDate(event.target.value)}>
          </input>
        </label>
        <br></br>
        <br></br>
        <label>Click here to select bike:
          <select id="bike-search-select" onChange={(event) => setBikeSelected(event.target.value)}>
            <option value="">Select Bike Type</option>
            {bikeTypes.map((type) => <option key={type.id} value={type.type}>{type.type}</option>)}
          </select>
        </label>
        
        <br></br>
        <br></br>
        <button className="btn search-btn" onClick={() => handleSearchForRides()}>Search For A Ride!</button>
      </div>
      <br></br>
      <div className="table-container">
        <table className="result-table">
          <caption>Search Results</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result) => 
            <tr key={result.id}>
              <td>{result.username}</td>
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
