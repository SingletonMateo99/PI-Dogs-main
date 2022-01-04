import React,{useState, useEffect} from 'react'
import axios from 'axios';
import s from './Pagination.module.css'
import { Link } from 'react-router-dom';
import Pages from './Pages';

const renderCard=(card)=> {
    
    return (
        <div className={s.container2} >{
          card.length !== 0 ?
  
          card.map((card) => {
        
          return(
            <div className={s.detail}>
          <div className={s.container}>
      
          <div className={s.breed-card}>
                    <p className={s.name}>{card.name}</p>
                    <img className={s.image} src={card.image}  width="300" height="200" alt=""/>
  
                    {/* para que me muestre los temperamentos de los nuevos perros creados */}
                    <p className={s.description}>Temperaments:</p>
                    <p className={s.description}> { card.temperament  ? card.temperament : card.temperaments.map(temp => temp.name).join(', ')}</p> 
                    <Link to={`/dogs/${card.id}`}>
                    <p className={s.descriptionDetails}>More Details...</p>
                    </Link>
                    </div>
            </div>
            
            </div>
          )
        }): <div className= {s.description2}> <p>No More Dogs...</p>
          <img src="https://media.tenor.com/images/e1ce4124fa1beeefed3e7d701cb65eff/tenor.gif " alt="LoadingGif" className='loadingGif' /> </div> }
            
        </div>
    )
  }

  
  
function Pagination() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostPerPage] = useState(8)

    useEffect(()=>{
        //hacemos otra funcion porque no puedo ponerle async al useEffect
        const fetchPosts = async () => {
        setLoading(true);
        const res = await axios.get('http://localhost:3001/dogs')
        setPosts(res.data);
        setLoading(false)
    }
    fetchPosts();
    },[]) 

    //Get current posts
    const indexOfLastPost= currentPage * postsPerPage;
    const indexOfFirstPost= indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
 console.log(posts)

    //change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
      return (
          <div className={s.cardContainer}>
              {renderCard(currentPosts)}
              <div className={s.pages}>
              <Pages postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
              </div>
          </div>
      )
  }

  export default Pagination
  
