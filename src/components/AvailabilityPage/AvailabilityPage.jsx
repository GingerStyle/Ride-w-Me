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

    // //function to format date into month day year, and 24 hour times into 12 hour times,
    // //save changes and return array so it can be displayed with their new formats.
    // const dateTimeFormatter = () => {
    //     //create new array to avoid directly mutating state array
    //     let formattedArray = dates;
    //     //convert date to month/day/year format
    //     for (let date of formattedArray){
    //         let stringDate = date.date;
    //         let dateArray = stringDate.split('-');
    //         let year = dateArray[0];
    //         let month = dateArray[1];
    //         let day = dateArray[2];
    //         date.date = month + '-' + day + '-' + year;
    //         //change format of fromTime to 12 hour with tag of 'From:' and adding AM or PM
    //         if (date.fromTime != null) {
    //             let time = date.fromTime;
    //             let timeArray = time.split(':');
    //             let hours = parseInt(timeArray[0]);
    //             let minutes = timeArray[1];
    //             let ampm = hours >=12 ? 'PM' : 'AM';
    //             hours = hours % 12;
    //             hours = hours ? hours : 12;
    //             date.fromTime = 'From: ' + hours + ':' + minutes + ampm;
    //         }
    //         //change format of toTime to 12 hour with tag of 'To:' and adding AM or PM
    //         if (date.toTime != null) {
    //             let time = date.toTime;
    //             let timeArray = time.split(':');
    //             let hours = parseInt(timeArray[0]);
    //             let minutes = timeArray[1];
    //             let ampm = hours >=12 ? 'PM' : 'AM';
    //             hours = hours % 12;
    //             hours = hours ? hours : 12;
    //             date.toTime = 'To: ' + hours + ':' + minutes + ampm;
    //         } 
    //     }
    //     //return new array with formatted dates and times to be mapped over
    //     return formattedArray;
    // }

    const dateFormatter = (date) => {
        let dateArray = date.split('-');
        let year = dateArray[0];
        let month = dateArray[1];
        let day = dateArray[2];
        date = month + '-' + day + '-' + year;
        return date;
    }

    const fromTimeFormatter = (time) => {
        if (time != null || time != '') {
            let timeArray = time.split(':');
            let hours = parseInt(timeArray[0]);
            let minutes = timeArray[1];
            let ampm = hours >=12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            time = 'From: ' + hours + ':' + minutes + ampm;
            return time;
        }
    }

    const toTimeFormatter = (time) => {
        if (time != null || time != '') {
            let timeArray = time.split(':');
            let hours = parseInt(timeArray[0]);
            let minutes = timeArray[1];
            let ampm = hours >=12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            time = 'To: ' + hours + ':' + minutes + ampm;
            return time;
        }
    }

    
    return(
        <div className="availability-page-container">
            <div className="add-date-container">
                <h3>Add some dates that you want to ride!</h3>

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
               
                {
                    dates.map((date) => <p key={date.id}>Date: {dateFormatter(date.date)} {fromTimeFormatter(date.fromTime)} {toTimeFormatter(date.toTime)}
                    &nbsp;&nbsp;
                    <button className="btn" onClick={() => handleDelete(date.id)}>Delete</button></p>)
                }
            </div>
        </div>
    );
}

export default AvailabilityPage;