import React from 'react'
import s from './InitialPage.module.css'
import { Link } from 'react-router-dom'

export default function InitialPage() {
    return (
        <div className={s.divHome}>


            <div className={s.divButton}>
                <h1 className={s.titte}>Welcome to the dogs App</h1>
                <Link to='/home'>
                <button className={s.buttonHome}>Home</button>
                </Link>
            </div>
        </div>
    )
}
