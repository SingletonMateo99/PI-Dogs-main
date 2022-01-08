import React, { useState } from "react";
import s from './NavBar.module.css'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import Filter from "./Filter";

function NavBar(props) {



    return (
        <div className={s.fixed}>
            <div className={s.containerTittle}>

                <h2 className={s.tittle}>CUTE DOGGYS FINDER</h2>

            </div>
            <div className={s.divSelect}>
                <SearchBar />
                <Filter />

                <Link to='/create'>
                    <button className={s.button}><span className={s.span}>Create</span></button>
                </Link>



            </div>

        </div>

    )
}


export default NavBar;
