import React, { useEffect, useState } from 'react';
import s from './Breed.module.css'
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { getAllById } from '../../actions/actions';


function Breed(props) {

  //OBTENGO LA ID REQUERIDA A TRAVEZ DE PARAMS 
  const { id } = useParams()
  const dispatch = useDispatch();

  //OBTENGO LOS DATOS REQUERIDOS DE LA ID SOLICITADA
  useEffect(() => {
    dispatch(getAllById(id))

  }, [])


  return (
    <div className={s.global}>

      <Link to='/home'>
        <button className={s.button}><span className={s.span}>Back</span></button>
      </Link>

      {props.breedsDetail.length !== 0 ?

        <div className={s.containerDetails}>
          <img className={s.image} src={props.breedsDetail.image} alt="" />
          <div className={s.text}>
            <div ><p className={s.tittleText}>Name:</p><p>{props.breedsDetail.name}</p></div>
            <div ><p className={s.tittleText}>Temperament:</p><p>{props.breedsDetail.temperament ? props.breedsDetail.temperament : props.breedsDetail.temperaments.map(temp => temp.name).join(', ')}</p></div>
            <div ><p className={s.tittleText}>Weight:</p><p>{props.breedsDetail.weight} KG</p></div>
            <div ><p className={s.tittleText}>Height:</p><p>{props.breedsDetail.height} FT</p></div>
            <div ><p className={s.tittleText}>Life span:</p><p>{props.breedsDetail.life_span} Years</p></div>
          </div>
        </div>
        : <div>
          <h1>Loading</h1>
          <img src="https://media.tenor.com/images/19340ef71bb2174d9c9335740e03f85c/tenor.gif " alt="LoadingGif" className='loadingGif' />
        </div>}

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