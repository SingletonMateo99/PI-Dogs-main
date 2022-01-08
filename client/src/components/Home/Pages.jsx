import React from 'react'
import s from './Pages.module.css'

function Pages({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];

    //SE DIVIDE LA CANTIDAD DE CARDS POR LA CANTIDAD DE CARDS POR PAGINA Y SE PUSHEA CADA NUMERO AL ARRAY PAGENUMBERS
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)

    }
    return (
        <div className={s.divBig}>
            <ul className={s.pagination}>
                {pageNumbers.map(number => (
                    <li className={s.nums} key={number}>
                        <a className={s.vincules} href='#' onClick={() => paginate(number)}  >
                            {number}
                        </a>

                    </li>
                ))}


            </ul>
        </div>
    )
}

export default Pages
