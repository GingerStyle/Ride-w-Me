//reducer to store the search results
const searchResults = (state = [], action) => {
    switch(action.type){
        case 'SET_RESULTS':
            return action.payload;
        default:
            return state;
    };
}

export default searchResults;