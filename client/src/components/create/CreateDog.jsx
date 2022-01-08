import React, { useState, useEffect } from 'react'
import s from './CreateDog.module.css'
import { getTemperament, createBreed } from '../../actions/actions';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


function CreateDog(props) {

    const history = useHistory()

    const temperament = useSelector((input) => input.temperament);

    //SETEO EL STATE DONDE ALMACENO LOS DATOS PARA REALIZAR EL POST
    const [values, setValues] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        temperament: [],
    })

    //CARGO EL STATE TEMPERAMENT CON TODOS LOS TEMPERAMENTOS 
    useEffect(() => {
        getTemperament()
        // handleDispatch();
    }, [])

    //CREA LA RAZA Y REESTABLECE LOS LUGARES EN BLANCO
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await createBreed(values)
            // await fetch('http://localhost:3001/dogs',
            //     {
            //         method: 'POST',
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify(values),
            //     })
            alert('Dog created successfully!');

        } catch (err) {
            console.log(err.message)
            alert('We could not create the Dog. Please try again.');

        }
        setValues({
            name: '',
            height: '',
            weight: '',
            life_span: '',
            temperament: [],
        })

    }

    //SETEA LOS VALORES DE LOS INPUT EN EL ESTADO VALUES
    function handleChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    //PERMITE SELECCIONAR MAS DE 1 TEMPERAMENTO
    function handleSelect(e) {
        if (values.temperament.length >= 3) {
            alert('Select only 3 temperaments.');
        } else {
            setValues((prev) => ({ ...prev, temperament: [...prev.temperament, parseInt(e.target.value)] }));
        }
    }

    //PERMITE VER LOS TEMPERAMENTOS SELECCIONADOS Y LOS MUESTRA EN LA APP
    function getNames(arr) {
        let names = [];
        temperament.forEach((t) => {
            arr.forEach((id) => {
                if (parseInt(id) === t.id) {
                    names.push(t.name);
                }
            });
        });
        return names;
    }

    //ACCIONA EL BUTTON PARA BORRAR UN TEMPERAMENTO ELEGIDO
    function deleteTemp(e, t) {
        setValues((prev) => ({ ...prev, temperament: prev.temperament.filter((temp) => temp !== parseInt(t)) }));
    }

    return (
        <div className={s.global}>
            <div className={s.divGlobal}>
                <button className={s.button} onClick={() => history.goBack()}><span className={s.span}>Back</span></button>
                <h1 className={s.tittle}>CREATE SECTION</h1></div>
            <div className={s.container}>
                <div className={s.imageContainer}>

                    <img src="https://malditopaparazzo.com.ar/wp-content/uploads/2020/12/scooby-doo-solo.jpg" alt="" className={s.image} />
                </div>
                <form className={s.inputs} onSubmit={handleSubmit}>

                    <h1>Create your own Dog </h1>

                    <p>Insert dogs name</p>

                    <input className={s.textInput} type="text"
                        name='name'
                        placeholder='Dogs Name'
                        required='required'
                        autoComplete='off'
                        value={values.name}
                        onChange={(e) => handleChange(e)} />
                    <p>Insert life-span (example: "8" (years))</p>

                    <input
                        className={s.textInput}
                        type="number"
                        min={5}
                        name='life_span'
                        required='required'
                        autoComplete='off'
                        placeholder='Life-span'
                        value={values.life_span}
                        onChange={(e) => handleChange(e)}
                    />

                    <p>Weight (example: 10-15)</p>
                    <input
                        className={s.textInput} type="text"
                        name='weight'
                        required='required'
                        autoComplete='off'
                        placeholder='Weight'
                        value={values.weight}
                        onChange={(e) => handleChange(e)}
                    />

                    <p>Height (example: 65 (ft))</p>
                    <input
                        className={s.textInput}
                        type="number"
                        required='required'
                        name='height'
                        autoComplete='off'
                        placeholder='Height'
                        min={5}
                        value={values.height}
                        onChange={(e) => handleChange(e)}
                    />

                    <div className={s.divGlobal2}>
                        <p>Temperament:</p>
                        <select className={s.select}
                            name='temperament'
                            onChange={(e) => handleSelect(e)}
                            required="required"
                            value={values.temperament}
                        > {temperament.map(breed => (
                            <option className={s.option} value={breed.id}>{breed.temperament}{breed.name}</option>
                        ))}

                            <option>Select</option>
                        </select></div>
                    <div>
                        <div className={s.list}>
                            {values.temperament.map((t) => (
                                <p className={s.text} id={t} >
                                    {getNames([t])}{' '}

                                    <button className={s.button2} type='buttondelete' onClick={(e) => deleteTemp(e, t)} >
                                        <span className={s.span2}>Delete</span>
                                    </button>
                                </p>
                            ))}</div>
                    </div><p>If everything is okay the red button will turn blue, you cant use negative numbers or text in the range areas</p>
                    <button className={s.button1}
                        type="submit"
                        disabled={values.name === "" ||
                            values.name.length < 3 ||
                            values.weightMin === "" ||
                            values.weightMax === "" ||
                            values.height === "" ||
                            values.life === "" ||
                            values.temperament.length === 0}
                    >
                        <span className={s.span2}>CREATE DOG</span></button>

                </form>
            </div>
        </div>
    )
}



export default CreateDog;