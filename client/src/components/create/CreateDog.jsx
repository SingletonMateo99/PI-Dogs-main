import React,{useState} from 'react'
import s from './CreateDog.module.css'
import {getBreeds, getTemperament} from '../../actions/actions';

export default function CreateDog() {
    const [name, setName] = useState([])
    const [life_span, setLife_span] = useState([])
    const [weight, setWeight] = useState([])
    const [height, setHeight] = useState([])
    const [temperament, setTemperament] = useState([])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const dog = {name, life_span, height, weight, temperament}
        await fetch('http://localhost:3001/dogs',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(dog)
        }).then(()=>{
            console.log('new dog added')
        })
    }
    

    
    return (
        <div className={s.global}>
            <h1>DOGS APP</h1>
            <div className={s.container}>
                <div className={s.imageContainer}>
                <img src="https://malditopaparazzo.com.ar/wp-content/uploads/2020/12/scooby-doo-solo.jpg" alt="" className={s.image}/>
                </div>
                <form className={s.inputs} onSubmit={handleSubmit}>
                <h1>Create your own Dog !!</h1>
                <p>Insert dogs name</p>
                <input type="text"
                 placeholder='Dogs Name'
                 required
                 value={name}
                 onChange={(e)=> setName(e.target.value)}/>
                <p>Insert life-span</p>
                <input type="text" 
                placeholder='Life-span'
                value={life_span}
                onChange={(e)=> setLife_span(e.target.value)}
                />
                <p>Weight</p>
                <input type="text"
                 placeholder='Weight'
                 value={weight}
                 onChange={(e)=> setWeight(e.target.value)}
                 />
                <p>Height</p>
                <input type="text"
                 placeholder='Height'
                 value={height}
                 onChange={(e)=> setHeight(e.target.value)}
                 />
                <p>Temperament</p>
                <input type="text" 
                placeholder='Temperament'
                value={temperament}
                onChange={(e)=> setTemperament(e.target.value)}
                />
                <button>CREATE DOG</button>
                
                </form>
            </div>
        </div>
    )
}
