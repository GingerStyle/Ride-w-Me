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
    const [addTypeDropdown, setAddTypeDropdown] = useState([]);

    useEffect(() => {
        //get the list of available bike types
        dispatch({type: 'FETCH_BIKE_TYPES'});
        //get the list of bike types that user owns
        dispatch({type: 'FETCH_USER_BIKES'});
        //filter the bike types to populate the dropdown menu with bikes that the user doesn't own
        filterBikeTypes();
    }, []);

    //function to format the types of bikes that the user owns into a string to display on the DOM
    // const stringFormatter = () => {
    //     let string = '';
    //     if(userBikes.length == 1){
    //         string += 'a ' + userBikes[0].type + ' bike';
    //         setBikeTypeString(string);
    //     }else if(userBikes.length > 1){
    //         for(let i=0; i<userBikes.length; i++){
    //             if(i < userBikes.length - 1){
    //                 string += userBikes[i].type + ', ';
    //             }else if(i == userBikes.length - 1){
    //                 string += 'and ' + userBikes[i].type + ' bikes';
    //                 setBikeTypeString(string);
    //     };
    //     }};
    //     filterBikeTypes();
    // }

    //function to handle what happens when the Add Bike Type button is clicked
    const handleAddBike = () => {
        if (bikeSelected != ""){
            dispatch({type: 'ADD_BIKE_TO_USER', payload: {bikeType: bikeSelected, userId: user.id}});
        } else {
            alert('Please select a bike to add.');
        };
        stringFormatter();
    }

    //function to handle what happens when the Remove Bike Type button is clicked
    const handleRemoveBike = () => {
        if (bikeSelected != ""){
            dispatch({type: 'REMOVE_BIKE_FROM_USER', payload: {bikeType: bikeSelected, userId: user.id}});
        } else {
            alert('Please select a bike to remove.');
        };
        stringFormatter();
    }

    const filterBikeTypes = () => {
        let array = bikeTypes.filter((bike) => {
            return !userBikes.find((value) => {
                return bike === value
            });
        });
        console.log('array contains', array);
    }
    

    return(
        <div id="bike-page-elements">
            <h3 className="bike-page-element">{`${bikeTypeString}.`}</h3>
            <br></br>
            <select className="bike-page-element" id="bike-add-select" onChange={(event) => setBikeSelected(event.target.value)}>
                <option value="">Select Bike Type</option>
                {addTypeDropdown.map((type) => <option key={type.id} value={type.type}>{type.type}</option>)}
            </select>
            <button className="bike-page-element" onClick={() => handleAddBike()}>Add Bike Type</button>
            <br></br>
            <select className="bike-page-element" id="bike-remove-select" onChange={(event) => setBikeSelected(event.target.value)}>
                <option value="">Select Bike Type</option>
                {userBikes.map((type) => <option key={type.id} value={type.type}>{type.type}</option>)}
            </select>
            <button className="bike-page-element" onClick={() => handleRemoveBike()}>Remove Bike Type</button>
            <br></br>
            <button className="bike-page-element" onClick={() => history.push('/user')}>Done</button>
        </div>
    );
}

export default BikePage;