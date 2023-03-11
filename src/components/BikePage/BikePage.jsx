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
        dispatch({type: 'GET_BIKE_PAGE_INFO', payload: {userArray: userBikes, typeArray: bikeTypes}});
    }, []);

    //function to handle what happens when the Add Bike Type button is clicked
    const handleAddBike = () => {
        if (bikeSelected != ""){
            dispatch({type: 'ADD_BIKE_TO_USER', payload: {bikeType: bikeSelected, userId: user.id}});
        } else {
            alert('Please select a bike to add.');
        };
    }

    //function to handle what happens when the Remove Bike Type button is clicked
    const handleRemoveBike = () => {
        if (bikeSelected != ""){
            dispatch({type: 'REMOVE_BIKE_FROM_USER', payload: {bikeType: bikeSelected, userId: user.id}});
        } else {
            alert('Please select a bike to remove.');
        };
    }

    //function to filter out the bike types the user owns from the types available
    const filterBikeTypes = () => {
        let array = bikeTypes.filter((bike) => {
            return !userBikes.find((value) => {
                return bike.type === value.type
            });
        });
        return array;
    }
    

    return(
        <div className="container" id="bike-page-elements">
            <h3 className="bike-page-element">{`${bikeTypeString}.`}</h3>
            <br></br>
            <select className="bike-page-element" id="bike-add-select" onChange={(event) => setBikeSelected(event.target.value)}>
                <option value="">Select Bike Type</option>
                {filterBikeTypes().map((type) => <option key={type.id} value={type.type}>{type.type}</option>)}
            </select>
            <button className="bike-page-element btn" onClick={() => handleAddBike()}>Add Bike Type</button>
            <br></br>
            <select className="bike-page-element" id="bike-remove-select" onChange={(event) => setBikeSelected(event.target.value)}>
                <option value="">Select Bike Type</option>
                {userBikes.map((type) => <option key={type.id} value={type.type}>{type.type}</option>)}
            </select>
            <button className="bike-page-element btn" onClick={() => handleRemoveBike()}>Remove Bike Type</button>
            <br></br>
            <button className="bike-page-element btn" onClick={() => history.push('/user')}>Done</button>
        </div>
    );
}

export default BikePage;