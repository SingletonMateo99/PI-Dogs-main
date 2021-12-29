import React from 'react'
import s from './Home.module.css'
import NavBar from '../NavBar/NavBar'
import Card from '../Card/Card'


export default function Home() {
    return (
        <div className={s.divBig}>
            <div className={s.container}>
                
                <div>
                <NavBar/>
                </div>

                <div className={s.cards}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>

                </div>

            </div>
            
        </div>
    )
}

