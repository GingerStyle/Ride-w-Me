import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AvailabilityPage.css';

function AvailabilityPage(){
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState('');
    const [todaysDate, setTodaysDate] = useState('');

    useEffect(() => {
        // getTodaysDate();
    }, []);

    //function to get today's date
    const getTodaysDate = () => {
        setTodaysDate(new Date().toJSON().slice(0, 10));
        console.log('todaysDate contains:', todaysDate);
    }

    //function to handle what happens when the user clicks the Add Date button.
    const handleAddDate = () => {
        if (selectedDate != ''){
            console.log('selectedDate contains:', selectedDate);
            dispatch({type: 'POST_DATE', payload: selectedDate});
        }else{
            alert('Please select a date.');
        }
        
    }

    return(
        <div id='availability-page-elements'>
            <h3>Add some dates that you want to ride.</h3>
            <label className='availability-page-element'>Click Here:
                <input
                type="date"
                // className='availability-page-element'
                min={new Date().toJSON().slice(0, 10)}
                max=''
                onChange={(event) => setSelectedDate(event.target.value)}>
                </input>
            </label>
            <button className='availability-page-element' onClick={() => handleAddDate()}>Add Date</button>
            <br></br>
            <button className='availability-page-element' onClick={() => history.push('/user')}>Done</button>
        </div>
    );
}

export default AvailabilityPage;