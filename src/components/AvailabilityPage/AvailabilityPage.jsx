import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AvailabilityPage.css';

function AvailabilityPage(){
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState('');
    const dates = useSelector(store => store.datesAvailable);

    useEffect(() => {
        dispatch({type: 'GET_DATES'});
    }, []);

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
                className='availability-page-element'
                min={new Date().toJSON().slice(0, 10)}
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