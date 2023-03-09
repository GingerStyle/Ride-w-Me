import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AvailabilityPage.css';

function AvailabilityPage(){
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState('');
    const dates = useSelector(store => store.datesAvailable);
    const [today, setToday] = useState(new Date().toJSON().slice(0, 10))

    useEffect(() => {
        //get today's date
        // todaysDate();
        //delete old dates
        dispatch({type: 'DELETE_OLD_DATES', payload: today});
        //get dates available
        dispatch({type: 'GET_DATES'});
    }, []);

    //function to get today's date
    const todaysDate = () => {
        setToday(new Date().toJSON().slice(0, 10));
        console.log('today contains:',today);
    }

    //function to handle what happens when the user clicks the Add Date button.
    const handleAddDate = () => {
        if (selectedDate != ''){
            dispatch({type: 'POST_DATE', payload: selectedDate});
            dispatch({type: 'GET_DATES'});
        }else{
            alert('Please select a date.');
        }
    }

    //function to delete date from database when 'X' button is clicked
    const handleDelete = (date) => {
        dispatch({type: 'DELETE_DATE', payload: date});
    }

    return(
        <div id='availability-page-elements'>
            <h3>Add some dates that you want to ride.</h3>
            <label className='availability-page-element'>Click Here:
                <input
                type="date"
                className='availability-page-element'
                min={today}
                onChange={(event) => setSelectedDate(event.target.value)}>
                </input>
            </label>
            <button className='availability-page-element' onClick={() => handleAddDate()}>Add Date</button>
            <br></br>
            <button className='availability-page-element' onClick={() => history.push('/user')}>Done</button>
            <br></br>
            <div className='availability-page-element'>{'You are available: '}
                {dates.map((date) => <p key={date.id}>{date.date.slice(0, 10)} <button onClick={() => handleDelete(date.id)}>X</button></p>)}
            </div>
        </div>
    );
}

export default AvailabilityPage;