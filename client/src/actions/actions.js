import axios from 'axios';

//BUSCO TODAS LAS RAZAS RECIBIDAS POR EL BACK Y LAS ALMACENO EN EL PAYLOAD
export function getAllBreeds() {
    return function (dispatch) {
        return axios.get('https://doggys-finder-backend-production.up.railway.app/dogs')
            .then((response) => {
                dispatch({
                    type: 'GET_BREEDS',
                    payload: response.data,
                })
            })
    }
}

//BUSCO LA RAZA POR ID Y LA GUARDO EN EL PAYLOAD
export function getAllById(id) {
    return function (dispatch) {
        return axios.get(`https://doggys-finder-backend-production.up.railway.app/dogs/${id}`)
            .then((response) => {
                dispatch({
                    type: 'GET_ID',
                    payload: response.data,
                })
            })
    }
};


//BUSCO LA RAZA POR NAME Y LA GUARDO EN EL PAYLOAD
export function getBreedsByName(name) {
    return function (dispatch) {
        return axios.get(`https://doggys-finder-backend-production.up.railway.app/dogs?name=${name}`)
            .then((response) => {
                dispatch({
                    type: 'GET_BYNAME',
                    payload: response.data,
                })
            })
    }
};

//BUSCO TODOS LOS TEMPERAMENTOS Y LOS ALMACENO EN EL PAYLOAD
export function getTemperament() {
    return function (dispatch) {
        return axios.get('https://doggys-finder-backend-production.up.railway.app/temperament')
            .then((response) => {
                dispatch({
                    type: 'GET_TEMPERAMENT',
                    payload: response.data,
                })
            })
    }
};


//FILTROS
//SETEO DISTINTAS POSIBILIDADES PARA EL SELECT DEL FRONT
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

//SETEO DISTINTAS POSIBILIDADES PARA EL SELECT DEL FRONT
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

export function tempFilter(payload) {
    return {
        type: 'TEMP_FILTER',
        payload: payload,
    }
}

//SETEO DISTINTAS POSIBILIDADES PARA EL SELECT DEL FRONT
export function getCreateBreedsFromDb(value) {
    if (value === 'DB') {
        return {
            type: 'DB',
        };
    } else if (value === 'API') {
        return {
            type: 'API',
        };
    } else if (value === 'ALL') {
        return {
            type: 'ALL'
        }
    }
}

//REALIZO EL POST PARA PODER CREAR UNA RAZA
export function createBreed(value) {
    fetch('https://doggys-finder-backend-production.up.railway.app/dogs',
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
        })
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
export const API = 'API';
export const ALL = 'ALL';