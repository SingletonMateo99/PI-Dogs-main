import React, { useState } from "react";
import { connect } from "react-redux";
import { getBreedsByName } from "../../actions/actions";
import s from './SearchBar.module.css'


function SearchBar(props) {
    
    //CREO EL STATE A UTILIZAR
    const [input, setInput] = useState({ name: "" });

    //SETEO EN EL STATE EL VALOR PASADO POR PROPS
    function handleChange(event) {
        setInput({ name: event.target.value });
    }

    //ME TRAE LA RAZA INDICADA POR EL INPUT Y SETEA EL STATE EN VACIO PARA VACIAR LA BARRA DE BUSQUEDA
    function handleSubmit(event) {

        event.preventDefault();
        props.getBreedsByName(input.name);
        setInput({ name: "" });
    }


    return (
        <div>
            <form className="search" onSubmit={(e) => handleSubmit(e)}>
                <div >

                    <input className={s.button}
                        placeholder='Breed Name'
                        name="title"
                        type="text"
                        id="title"
                        autoComplete="off"
                        value={input.name}
                        onChange={(e) => handleChange(e)}
                    /><button className={s.button} type="submit"><span className={s.span}> Search</span></button>
                    <button className={s.button} type="submit"><span className={s.span}>Reset Filters</span></button>
                </div>

            </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        breeds: state.breeds
    }
}

function mapDispatchToProps(dispatch) {

    return {
        getBreedsByName: name => dispatch(getBreedsByName(name)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
