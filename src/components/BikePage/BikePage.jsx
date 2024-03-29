import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './BikePage.css';


function BikePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userBikes = useSelector(store => store.userBikes);
    const bikeTypes = useSelector(store => store.bikeTypes);
    const user = useSelector(store => store.user);
    const bikeTypeString = useSelector(store => store.bikeTypeString);
    const [bikeSelected, setBikeSelected] = useState('');

    useEffect(() => {
        //get list of bike types that user owns and of bike types available
        dispatch({type: 'GET_BIKE_PAGE_INFO', payload: {userArray: userBikes, typeArray: bikeTypes}});
    }, []);

    //function to handle what happens when the Add Bike Type button is clicked
    const handleAddBike = () => {
        //check to make sure that user has made a selection
        if (bikeSelected != ""){
            //if user has made a selection, add that bike to their list of bike types
            dispatch({type: 'ADD_BIKE_TO_USER', payload: {bikeType: bikeSelected, userId: user.id}});
        } else {
            alert('Please select a bike to add.');
        };
    }

    //function to handle what happens when the Remove Bike Type button is clicked
    const handleRemoveBike = () => {
        //check to make sure that user has made a selection
        if (bikeSelected != ""){
            //if user has made a selection, remove that bike to their list of bike types
            dispatch({type: 'REMOVE_BIKE_FROM_USER', payload: {bikeType: bikeSelected, userId: user.id}});
        } else {
            alert('Please select a bike to remove.');
        };
    }

    //function to filter out the bike types the user owns from the types available
    //returns an array of bike types that the user doesn't own
    const filterBikeTypes = () => {
        let array = bikeTypes.filter((bike) => {
            return !userBikes.find((value) => {
                return bike.type === value.type
            });
        });
        return array;
    }
    
    return(
        <div className="bike-page-container">
            <div className="content-container">
                <h3>{`${bikeTypeString}.`}</h3>

                <br></br>

                <div className="bike-page-controls">
                    <select id="bike-add-select" onChange={(event) => setBikeSelected(event.target.value)}>
                        <option value="">Select Bike Type</option>
                        {filterBikeTypes().map((type) => <option key={type.id} value={type.type}>{type.type}</option>)}
                    </select>
                    
                    &nbsp;&nbsp;

                    <button className="btn" onClick={() => handleAddBike()}>Add Bike Type</button>

                    <br></br>
                    <br></br>

                    <select id="bike-remove-select" onChange={(event) => setBikeSelected(event.target.value)}>
                        <option value="">Select Bike Type</option>
                        {userBikes.map((type) => <option key={type.id} value={type.type}>{type.type}</option>)}
                    </select>

                    &nbsp;&nbsp;

                    <button className="btn" onClick={() => handleRemoveBike()}>Remove Bike Type</button>

                    <br></br>
                    <br></br>
                    
                    <button className="bike-done-btn btn" onClick={() => history.push('/user')}>Done</button>
                </div>
            </div>
        </div>
    );
}

export default BikePage;