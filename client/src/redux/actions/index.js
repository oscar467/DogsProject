import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        const json = await axios ("http://localhost:3001/dogs");
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getTemperaments(){
    return async function(dispatch){
        const json = await axios ("http://localhost:3001/temperaments");
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
}

export function getNameDogs(payload){
    return async function (dispatch){
        try {
            const json = await axios (`http://localhost:3001/dogs?name=${payload}`);
            console.log(json.data)
            return dispatch({
                type: "GET_NAME_DOGS",
                payload: json.data
            })
        } catch (err){
            console.log(err);
        }
    }
}

export function getById(payload) {
    return async function (dispatch){
        try {
            const json = await axios (`http://localhost:3001/dogs/${payload}`);
            return dispatch({
                type: 'GET_BY_ID',
                payload: json.data
            })
        } catch (err){
            console.log(err);
        }
    }
}

export function postDog (payload) {
    
    return async function (dispatch){
        const json = await axios.post(`http://localhost:3001/dogs`, payload);

        return json;
    }
}

export function filterCreated(payload){
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function filterByTemperament(payload){
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export function getDetail (id){
    return async function (dispatch){
        try {
            let json = await axios(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (err) {
            console.log(err);
        }
    }
}