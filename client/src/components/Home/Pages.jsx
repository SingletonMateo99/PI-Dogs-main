import React from 'react'
import s from './Pages.module.css'

function Pages({postsPerPage, totalPosts, paginate}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage) ; i++) {
        pageNumbers.push(i)
        
    }
    return (    
        <div>
            <ul className={s.pagination}>
                {pageNumbers.map(number=>(
                    <li key={number}>
                        <a href='#' onClick={()=> paginate(number)}  >
                            {number}
                        </a>

                    </li>
                ))}


            </ul>
        </div>
    )
}

export default Pages
