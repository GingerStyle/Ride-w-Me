import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './BikePage.css';


function BikePage() {
    const dispatch = useDispatch();
    //const userBikes = useSelector(store => store.userBikes);
    const bikeTypes = useSelector(store => store.bikeTypes);
    const history = useHistory();
    const [bikeSelected, setBikeSelected] = useState('');
    const user = useSelector(store => store.user);

    useEffect(() => {
        //get the list of available bike types
        dispatch({type: 'FETCH_BIKE_TYPES'});
        //get the list of bike types that user owns
        //dispatch({type: 'FETCH_USER_BIKES'});
    }, [dispatch]);

    function handleAddBike() {
        if (bikeSelected != ""){
            dispatch({type: 'ADD_BIKE_TO_USER', payload: {bikeType: bikeSelected, userId: user.id}});
        }
    }

    function handleRemoveBike() {
        if (bikeSelected != ""){
            dispatch({type: 'REMOVE_BIKE_FROM_USER', payload: {bikeType: bikeSelected, userId: user.id}});
        }
    }

    return(
        <div className="bike-page-elements">
            <select className="bike-page-element" id="bike-select" onChange={(event) => setBikeSelected(event.target.value)}>
                <option value="">Select Bike Type</option>
                {bikeTypes.map((type) => <option key={type.id} value={type.type}>{type.type}</option>)}
            </select>
            <button className="bike-page-element" onClick={() => handleAddBike()}>Add Bike Type</button> 
            <button className="bike-page-element" onClick={() => handleRemoveBike()}>Remove Bike Type</button>
            <br></br>
            <button className="bike-page-element" onClick={() => history.push('/user')}>Done</button>
        </div>
    );
}

export default BikePage;