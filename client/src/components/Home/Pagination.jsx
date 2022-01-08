import React,{useState, useEffect} from 'react'
import s from './Pagination.module.css'
import { Link } from 'react-router-dom';
import Pages from './Pages';
import {getAllBreeds} from '../../actions/actions';
import { connect } from 'react-redux';

//CREO EL COMPONENTE CARD 
const renderCard=(card)=> {
    
    return (
        <div className={s.container2} >{
          card.length !== 0 ?
  
          card.map((card) => {
        
          return(
                    <div className={s.List}>
                    <img className={s.image} src={card.image}  width="100%" height="200" alt=""/>
                    <div className={s.NameContainer}>
                    <p className={s.name}>{card.name}</p>
                    </div>
                <div className={s.overlay}>
                    {/* para que me muestre los temperamentos de los nuevos perros creados */}
                    <p className={s.description}>Temperaments:</p>
                    <p className={s.description}> { card.temperament  ? card.temperament : card.temperaments.map(temp => temp.name).join(', ')}</p> </div>
                    
                    <Link to={`/dogs/${card.id}`}>
                    <button className={s.button}><p className={s.descriptionDetails}>More Details...</p></button>
                    </Link>
                    
                    </div>
           
            
            
          )
        }): <div className= {s.description2}> <p>No More Dogs...</p>
          <img src="https://media.tenor.com/images/e1ce4124fa1beeefed3e7d701cb65eff/tenor.gif " alt="LoadingGif" className='loadingGif' /> </div> }
            
        </div>
    )
  }

  
  //CREO EL COMPONENTE PARA LA PAGINACION
function Pagination({getAllBreeds, breeds, filteredBreeds}) {
    
    //SETEO DE STATES
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostPerPage] = useState(8)
    const [card,setCard]= useState(breeds);
    
    //LLENO EL STATE BREEDS CON TODAS LAS RAZAS RECIBIDAS DEL BACK 
    useEffect(() => {
      getAllBreeds()
  
      
        }, [])

    //EN CASO DE HABER RAZAS FILTRADAS ALMACENADAS EN FILTEREDBREEDS REEMPLAZA A TODAS LAS RAZAS DE BREEDS EN EL ESTADO CARD
    useEffect(() => {
        if
        ( filteredBreeds.length > 0 ) {
          setCard(filteredBreeds)
        }
        else if (filteredBreeds.length === 0 ){
          setCard(breeds)
        }
        else if (filteredBreeds === 'All'){
          setCard(breeds)}
        else{
          setCard(breeds)
        } }, [filteredBreeds, breeds])

    
    //LOGICA PARA EL PAGINADO
    const indexOfLastPost= currentPage * postsPerPage;
    const indexOfFirstPost= indexOfLastPost - postsPerPage;
    const currentPosts = card.slice(indexOfFirstPost, indexOfLastPost)
 

    //CAMBIO DE PAGINA
    const paginate = pageNumber => setCurrentPage(pageNumber);

      return (
          <div className={s.cardContainer}>
              {renderCard(currentPosts)}
              <div className={s.divPages}>
              <Pages postsPerPage={postsPerPage} totalPosts={card.length} paginate={paginate}/>
              </div>
          </div>
      )
  }
  
  
  function mapStateToProps(state) {
    return {
        breeds: state.breeds,
        filteredBreeds: state.filteredBreeds,
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
      getAllBreeds: breeds => dispatch(getAllBreeds(breeds)),
      
    };
}


export default connect(mapStateToProps, mapDispatchToProps) (Pagination);

  
