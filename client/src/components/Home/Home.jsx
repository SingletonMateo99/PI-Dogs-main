import React from 'react'
import s from './Home.module.css'
import NavBar from '../NavBar/NavBar'

import Pagination from './Pagination.jsx'

export default function Home() {
    return (
        <div className={s.divBig}>
            <NavBar/>
            
                 
                
                
               
            <div className={s.paginationContainer}>
                <Pagination/>

            
            </div>
        </div>
    )
}

