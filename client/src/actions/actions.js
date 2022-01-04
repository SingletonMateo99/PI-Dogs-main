import axios from 'axios';

export function getAllBreeds(){
    return  function(dispatch){
        return axios.get('http://localhost:3001/breeds')
            .then((response) => {
                dispatch({
                type:'GET_BREEDS',
                payload: response.data,
            })
        })
        }
    }


    export function getAllById(id){
        return  function(dispatch){
            return axios.get(`http://localhost:3001/breeds/${id}`)
            .then((response)=>{
                dispatch({
                    type:'GET_ID',
                    payload: response.data,
                })
            })
            }
        };



export function getBreedsByName(name){
    return function(dispatch){
        return axios.get(`http://localhost:3001/breeds?name=${name}`)
        .then((response) => {
            dispatch({
                type:'GET_BYNAME',
                payload: response.data,
            })
        })
    }
};


export function getTemperament(){
    return function(dispatch){
        return axios.get('http://localhost:3001/temperament')
        .then((response) => {
            dispatch({
                type:'GET_TEMPERAMENT',
                payload: response.data,
            })
        })
    }
};


//FILTROS!!
export function orderAlph(value) {

    if (value === 'ORDER_ASC') {
		return {
			type: 'ORDER_ASC',
		};
	} else {
		return {
			type: 'ORDER_DESC',
		};
	}
}

export function orderWeight(value) {

    if (value === 'ORDER_WEIGHTMAX') {
		return {
			type: 'ORDER_WEIGHTMAX',
		};
	} else {
		return {
			type: 'ORDER_WEIGHTMIN',
		};
	}
}

export function tempFilter(payload){
    return{
    type: 'TEMP_FILTER',
    payload: payload,
    }
}

export function getCreateBreedsFromDb(value) {
	if (value === 'DB') {
		return {
			type: 'DB',
		};
	} else if (value === 'API'){
		return {
			type: 'API',
		};
	}else if (value === 'ALL') {
		return {
            type: 'ALL'
        }
	}
}


export const GET_BREEDS = 'GET_BREEDS';
export const GET_ID = 'GET_ID';
export const GET_BYNAME = 'GET_BYNAME';
export const GET_TEMPERAMENT = 'GET_TEMPERAMENT';
export const POST_BREED = 'POST_BREED';

export const ORDER_ASC = 'ORDER_ASC';
export const ORDER_DESC = 'ORDER_DESC';
export const ORDER_WEIGHTMAX = 'ORDER_WEIGHTMAX';
export const ORDER_WEIGHTMIN = 'ORDER_WEIGHTMIN';
export const TEMP_FILTER = 'TEMP_FILTER';
export const DB = 'DB';
export const API= 'API';
export const ALL= 'ALL';