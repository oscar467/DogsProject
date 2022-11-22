
const initialState = {
    dogs : [],
    allDogs : [],
    temperaments : [],
    detail: []
};

function rootReducer (state=initialState, action){
    switch(action.type) {
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            }
        case 'GET_TEMPERAMENTS':
            return{
                ...state,
                temperaments: action.payload,
            }
        case 'GET_NAME_DOGS':
            return {
                ...state,
                dogs: action.payload
            }
        case 'POST_DOG':
            return {
                ...state,
            }
        case 'FILTER_CREATED':
            const createdFilter = action.payload == 'created' ? state.allDogs.filter(el => el.createdInDB) : state.allDogs.filter(el => !el.createdInDB);
            return{
                ...state,
                dogs: action.payload === "All" ? state.allDogs : createdFilter
            }
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
                state.dogs.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                }) :
                state.dogs.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                })
            return {
                ...state,
                dogs: sortedArr
            }
            case 'ORDER_BY_WEIGHT':
                let sortedWeight = action.payload === 'ascNum' ?
                    state.dogs.sort((a, b) => {
                        if (a.weight.includes('NaN')){
                            if(a.weight.includes('8')) {
                                a.weight = '6 - 8';
                            }else{
                                a.weight = '20 - 30'
                            }
                        }
                        if (parseInt(a.weight.split(' - ')[0])  > parseInt(b.weight.split(' - ')[0])) return 1;
                        if (parseInt(a.weight.split(' - ')[0])  < parseInt(b.weight.split(' - ')[0])) return -1;
                        return 0;
                    }) :
                    state.dogs.sort((a, b) => {
                        if (a.weight.includes('NaN')){
                            return 1000;
                        }
                        if (parseInt(a.weight.split(' - ')[0])  < parseInt(b.weight.split(' - ')[0])) return 1;
                        if (parseInt(a.weight.split(' - ')[0])  > parseInt(b.weight.split(' - ')[0])) return -1;
                        return 0;
                    })
                return {
                    ...state,
                    dogs: sortedWeight
                }
        case 'FILTER_BY_TEMPERAMENT':
            const allDogs = state.allDogs;
            const filteredDogs = (action.payload === 'all') ? allDogs : allDogs.filter(e => e.temperaments?.includes(action.payload));
            const filteredDogsDB = [];
            allDogs.forEach(e => {
                if (typeof e.id === 'string'){
                    e.temperaments.forEach(temp => {
                        if (temp.name === action.payload) filteredDogsDB.push(e);
                    })
                }
            });
            return {
                ...state,
                dogs: filteredDogs.concat(filteredDogsDB)
            }
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }
        default:
            return state; 
    }
}

export default rootReducer;