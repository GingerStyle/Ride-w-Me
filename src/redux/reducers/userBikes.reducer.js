const userBikes = (state = [], action) => {
    switch(action.type){
        case 'SET_BIKES':
            return action.payload;
        default:
            return state;
    };
}

export default userBikes;