import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AvailabilityPage.css';

function AvailabilityPage(){
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState('');
    const dates = useSelector(store => store.datesAvailable);
    const [today, setToday] = useState(new Date().toJSON().slice(0, 10));

    useEffect(() => {
        //delete old dates
        dispatch({type: 'DELETE_OLD_DATES', payload: today});
        //get dates available
        dispatch({type: 'GET_DATES'});
    }, []);

    //function to handle what happens when the user clicks the Add Date button.
    const handleAddDate = () => {
        if (selectedDate != ''){
            dispatch({type: 'POST_DATE', payload: selectedDate});
            dispatch({type: 'GET_DATES'});
        }else{
            alert('Please select a date.');
        }
    }

    //function to delete date from database when Delete button is clicked
    const handleDelete = (date) => {
        dispatch({type: 'DELETE_DATE', payload: date});
    }

    return(
        <div className="container" id='availability-page-elements'>
            <h3>Add some dates that you want to ride.</h3>
            <div className='availability-page-element'>
                <label >Click Here:
                    <input
                    type="date"
                    value={selectedDate}
                    min={today}
                    onChange={(event) => setSelectedDate(event.target.value)}>
                    </input>
                </label>
                <button className="btn" onClick={() => handleAddDate()}>Add Date</button>
            </div>
            <br></br>
            <button className="availability-page-element btn" onClick={() => history.push('/user')}>Done</button>
            <br></br>
            <div className="availability-page-element">{'You are available: '}
                {dates.map((date) => <p key={date.id}>{date.date.slice(0, 10)} <button className="btn" onClick={() => handleDelete(date.id)}>Delete</button></p>)}
            </div>
        </div>
    );
}

export default AvailabilityPage;