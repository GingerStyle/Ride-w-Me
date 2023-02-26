import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function BikePage() {
    const dispatch = useDispatch();
    const bikeList = useSelector(store => store.userBikes);
    const [addType, setAddType] = useState('');
    const [removeType, setRemoveType] =useState('');

    useEffect(() => {
        dispatch({type: 'FETCH_USER_BIKES'});
    }, [dispatch]);

    return(
        <div>
            <select id="add-bike-select" onChange={(event) => setAddType(event.target.value)}>
                <option value="">Select Bike Type</option>

            </select>
            <button>Add Bike Type</button>
            <br></br>
            <select id="remove-bike-select" onChange={(event) => setRemoveType(event.target.value)}>
                <option value="">Select Bike Type</option>

            </select>
            <button>Remove Bike Type</button>
            <br></br>
            <button>Done</button>
        </div>
    );
}

export default BikePage;