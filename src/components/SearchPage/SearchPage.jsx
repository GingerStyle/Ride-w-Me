import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SearchPage.css';

function SearchPage() {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState('');
  const [bikeSelected, setBikeSelected] = useState('');
  const bikeTypes = useSelector(store => store.bikeTypes);
  const [today, setToday] = useState(new Date().toJSON().slice(0, 10));

  useEffect(() => {
    //get list of bike types
    dispatch({type: 'FETCH_BIKE_TYPES'});
}, []);

  return (
    <div>
      <div className="inputs-container">
        <label>Click Here:
          <input type="date"
          min={today}
          onChange={(event) => setSelectedDate(event.target.value)}>
          </input>
          <button className="btn">Select Date</button>
        </label>
        <br></br>
        <br></br>
        <select id="bike-search-select" onChange={(event) => setBikeSelected(event.target.value)}>
          <option value="">Select Bike Type</option>
          {bikeTypes.map((type) => <option key={type.id} value={type.type}>{type.type}</option>)}
        </select>
        <button className="btn">Select Bike Type</button>
        <br></br>
        <br></br>
        <button className="btn search-btn">Search For A Ride!</button>
      </div>
      <br></br>
      <div className="table-container">
        <table>

        </table>
      </div>
      
    </div>
  );
}

export default SearchPage;
