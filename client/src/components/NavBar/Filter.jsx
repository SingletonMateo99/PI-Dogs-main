import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTemperament, orderAlph, tempFilter, orderWeight, getBreedsByName, getCreateBreedsFromDb, getAllBreeds } from '../../actions/actions';
import s from './Filter.module.css';



function Filter() {

    //SELECCIONO LOS STATE QUE VOY A UTILIZAR DEL REDUCER
    const temperament = useSelector((state) => state.temperament);
    const breeds = useSelector((state) => state.breeds);
    const dispatch = useDispatch();


    //SETEO LOS STATES LOCALES
    let [filterTemp, setFilterTemp] = useState('');
    const [arrayTemps, setArrayTemps] = useState([]);
    const [input, setInput] = useState({ name: "" });



    //GUARDO EN TEMPERAMENT TODOS LOS TEMPERAMENTOS
    useEffect(() => {
        dispatch(getTemperament())
        
    }, []);

    
    //OBTIENE LAS RAZAS A TRAVEZ DEL NOMBRE
    function handleSubmit(e) {
        e.preventDefault();
        getBreedsByName(input.name);
        // handleClick();
        setInput({ name: "" });
    }


    //ALFABETICO
    function handleChange(e) {
        dispatch(orderAlph(e.target.value))
        // dispatch(orderWeight(e.target.value));
    }


    //PESO
    function handleChangeWeight(e) {
        dispatch(orderWeight(e.target.value));
    }


    //DB
    function handleInput(event) {
        // setInput({ name: event.target.value });
        dispatch(getCreateBreedsFromDb(event.target.value))
    }


    //TEMPERAMENTO
    function handleChangeTemperament(e) {
        // dispatch(tempFilter(e.target.value))
        setFilterTemp(e.target.value);

        if (e.target.value === 'All') {
            e.preventDefault()
            //reset q vacie
            dispatch(getAllBreeds());
        }
        console.log(e.target.value)

        if (e.target.value) {
            if (!arrayTemps.includes(e.target.value)) {
                setArrayTemps(
                    [...arrayTemps, e.target.value]
                )
                dispatch(tempFilter(e.target.value));
            }
        }

    }




    return (
        <div className={s.divSelect}>

            {/* FILTRO ALFABETICO */}
            <form className="boton">
                <select className={s.select} onChange={handleChange} value='' name="by">
                    <option value="" disabled selected>Order by </option>
                    <option value='ORDER_ASC'>Alphabet - A-Z</option>
                    <option value='ORDER_DESC'>Alphabet - Z-A</option>
                </select>
            </form>

            {/* //FILTRO POR PESO   */}
            <form className="boton">
                <select className={s.select} onChange={handleChangeWeight} value='' name="by">
                    <option value="" disabled selected>Order by Weight</option>
                    <option value='ORDER_WEIGHTMAX'>Weight Min. - Max.</option>
                    <option value='ORDER_WEIGHTMIN'>Weight Max -  Min.</option>
                </select>
            </form>

            {/* FILTRO POR TEMPERAMENTO */}
            <form className="boton" onSubmit={handleSubmit}>
                <select className={s.select} onChange={(e) => handleChangeTemperament(e)} value={filterTemp} name="temperaments">
                    <option value='All'>All </option>
                    {temperament.map((e) => (
                        <option value={e.name} key={e.id}>
                            {e.name}
                        </option>
                    ))}

                </select>

               


            </form>
            {/* FILTRO POR ORIGEN */}
            <form className="boton" onChange={(e) => handleSubmit(e)}>
                <select className={s.select} onChange={(e) => handleInput(e)} value='' name="db" >

                    <option value="" disabled selected>All Breeds Created</option>
                    <option value='DB'>Created</option>
                    <option value='API'>API</option>
                    
                </select>

            </form>


        </div>
    )
}

export default Filter
