import React from 'react'
import s from './NavBar.module.css'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <div>
            <h2 className={s.tittle}>Breed App</h2>
            <div>
                <Link to='/home'><button>Home</button></Link>
                <Link to='/create'><button>Create New Breed</button></Link>
                <div className={s.divSelect}>
                <input type="text" placeholder='Insert breed' />
                
                    <select >
                        <option>A-Z</option>
                        <option>Z-A</option>
                        <option>Weight</option>
                    </select>
                    <select >
                        <option>Temperament</option>
                        <option>Original Breeds</option>
                        <option>New Breeds</option>
                    </select>
                </div>
                
            </div>

        </div>

    )
}

export default NavBar
