import React from 'react'
import s from './Card.module.css'

function Card({name, image, weight, temperament}) {
    return (
        <div className={s.divCard}>
           <a href="" className={s.card}>
      <img src="https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg" className={s.card__image} alt="" />
      <div className={s.card__overlay}>
        <div className={s.card__header}>
          <div className={s.card__headertext}>
            <h3 className={s.card__title}>{name}</h3>            
          </div>
        </div>
        <p className={s.card__description}>Temperaments: {temperament}</p>
        <p className={s.card__description}>Weight: {weight} KG</p>
      </div>
    </a>
           

        </div>
    )
}

export default Card
