import React, { useEffect , useState} from 'react';
import s from './Breed.module.css'
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { getAllById } from '../../actions/actions';


function Breed(props){

const {id}= useParams()
const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getAllById(id))
        
    }, [])
    
    
    return (
        <div className= 'body4'>
          <div className='containerdetail'>
          
       
      {props.breedsDetail.length !== 0 ?   
<div >
    <img className="image" src={props.breedsDetail.image} width="360" height="240" alt="" />
    <div >
        <div ><p>Name:</p><p>{props.breedsDetail.name}</p></div>
        <div ><p>Temperament:</p><p>{props.breedsDetail.temperament? props.breedsDetail.temperament :  props.breedsDetail.temperaments.map(temp => temp.name).join(', ') }</p></div>
        <div ><p>Weight:</p><p>{props.breedsDetail.weight}</p></div>
        <div ><p>Height:</p><p>{props.breedsDetail.height}</p></div>
        <div ><p>Life span:</p><p>{props.breedsDetail.life_span}</p></div>
    </div>
</div>
: <div>
<h1>Loading</h1>
<img src="https://media.tenor.com/images/19340ef71bb2174d9c9335740e03f85c/tenor.gif " alt="LoadingGif" className='loadingGif' /> 
     </div> }
          <div>
          <Link to='/home'>
<button className='buttonback' >Back</button>
</Link>

</div>
            </div>
        </div>


    )
}

function mapStateToProps(state) {
    return {
      breedsDetail: state.breedsDetail,
      
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getAllById: breeds => dispatch(getAllById(breeds)),
      
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Breed);