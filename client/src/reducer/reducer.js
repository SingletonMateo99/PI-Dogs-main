import {GET_BREEDS, GET_ID, GET_BYNAME, GET_TEMPERAMENT, ORDER_ASC,
    ORDER_DESC, TEMP_FILTER, ORDER_WEIGHTMAX, ORDER_WEIGHTMIN, DB, API , ALL} from '../actions/actions';

    const initialState = {
        breeds: [],
        temperament: [],
        breedsDetail :[],
        filteredBreeds: [],
        
        }

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case GET_BREEDS: return {
        ...state,
        breeds: action.payload,
        //filteredBreeds:action.payload no va por q resetea 
        
    }
    case GET_TEMPERAMENT: return {
        ...state,
        temperament: action.payload,
    }
    case GET_ID: return {
        ...state,
        breedsDetail: action.payload,
    }
    case  GET_BYNAME: return {
        ...state,
        // breeds: action.payload,
        filteredBreeds:action.payload
    }
    case ORDER_ASC: return{
        ...state,
        breeds: state.breeds
        .filter((b) => b.name !== null)
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)),
        filteredBreeds: state.filteredBreeds.filter((b) => b.name !== null)
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)),
    
}
    case ORDER_DESC: return{
        ...state,
        breeds: state.breeds
		    .filter((b) => b.name !== null)
			.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)),
            filteredBreeds: state.filteredBreeds.filter((b) => b.name !== null)
			.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)),
}

case ORDER_WEIGHTMAX: return{
    ...state,
    breeds: state.breeds
    .filter((b) => b.weight !== null)
    .sort((a, b) => (a.weight > b.weight ? 1 : -1)),
    filteredBreeds: state.filteredBreeds.filter((b) => b.weight !== null)
    .sort((a, b) => (a.weight > b.weight ? 1 : -1)),
}

case ORDER_WEIGHTMIN: return{
    ...state,
    breeds: state.breeds
    .filter((b) => b.weight !== null)
    .sort((a, b) => (a.weight < b.weight ? 1 : -1)),
    filteredBreeds: state.filteredBreeds.filter((b) => b.weight !== null)
    .sort((a, b) => (a.weight < b.weight ? 1 : -1)),
}

    case TEMP_FILTER:{
        // ...state,
        // filteredBreeds: filterTemperament(state.breeds, action.payload)
      
        let filtapi = state.breeds.filter( e => e.temperament?.includes(action.payload))
        let filtdb = state.breeds.filter(e => e.temperaments?.map((temp)=> temp.name)?.includes(action.payload))
        
        let newArrayFil= filtapi.concat(filtdb)

        if(action.payload === 'All'){
            return{
                ...state,
                filteredBreeds: state.breeds
                
            }
        }else{
            return{
                ...state,
                //breeds: newArrayFil,
                filteredBreeds: newArrayFil,
            }
        }
}
    case DB: return {
		...state,
		breeds: state.breeds.filter((b) => b.db ),
        filteredBreeds: state.filteredBreeds.filter((b) => b.db),
        
};
	case API: return {
		...state,
		breeds: state.breeds.filter((b) => !b.db),
        filteredBreeds:state.filteredBreeds.filter((b) => !b.db),
};
    case ALL: 
            return {
                ...state,
                breeds: state.breeds,
                filteredBreeds:state.filteredBreeds
            }
  
    default: return {...state}
    }
}



