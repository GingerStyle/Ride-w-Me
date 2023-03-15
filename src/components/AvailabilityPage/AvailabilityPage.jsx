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
    const [toTime, setToTime] = useState('');
    const [fromTime, setFromTime] = useState('');

    useEffect(() => {
        //delete old dates to save database storeage space requirements
        dispatch({type: 'DELETE_OLD_DATES', payload: today});
        //get dates that user is available
        dispatch({type: 'GET_DATES'});
    }, []);

    //function to handle what happens when the user clicks the Add Date button.
    const handleAddDate = () => {
        console.log('fromTime contains:', fromTime);
        console.log('toTime contains:', toTime);
        if (selectedDate != ''){
            //post new date to database
            dispatch({type: 'POST_DATE',
            payload: {date: selectedDate,
                      fromTime: fromTime,
                      toTime: toTime
                    }        
            });
            //refresh list of dates available
            dispatch({type: 'GET_DATES'});
        }else{
            alert('Please select a date.');
        }
    }

    //function to delete date from database when Delete button is clicked
    const handleDelete = (date) => {
        //remove date from database
        dispatch({type: 'DELETE_DATE', payload: date});
    }

    
    return(
        <div className="availability-page-container">
            <div className="add-date-container">
                <h3>Add some dates that you want to ride.</h3>

                <br></br>

                <label>Click Here:
                    <input
                    type="date"
                    value={selectedDate}
                    min={today}
                    onChange={(event) => setSelectedDate(event.target.value)}>
                    </input>
                </label>

                <br></br>

                <label>From:
                    <input type="time" onChange={(event) => setFromTime(event.target.value)}></input>
                </label>

                <br></br>

                <label>To:
                    <input type="time" onChange={(event) => setToTime(event.target.value)}></input>
                </label>

                <br></br>

                <button className="btn" onClick={() => handleAddDate()}>Add Date</button>

                <br></br>
                <br></br>

                <div className="availability-done-btn">
                    <button className="btn" onClick={() => history.push('/user')}>Done</button>
                </div>
                
            </div>

            <br></br>

            <div className="availability-container">
                <h3>You are available:</h3>
                
                {dates.map((date) => <p key={date.id}>Date: {date.date.slice(0, 10)} From: {date.fromTime} To: {date.toTime} <button className="btn" onClick={() => handleDelete(date.id)}>Delete</button></p>)}
            </div>
        </div>
    );
}

export default AvailabilityPage;