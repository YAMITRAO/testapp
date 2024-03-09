import React, { useContext } from 'react'
import style from "./Header.module.css"
import DataContext from '../../store/DataContext'

const Header = () => {
   
  const dataOfCartCtx = useContext(DataContext);

  const totalCartValue = dataOfCartCtx.cartItems.length;

  const headerButtonHandler = () => {
    dataOfCartCtx.cartVisibility("1");
  }

  return (
    <>
    <div className={style.headerContainer}>  
    <div className={style.logo}>MyShop</div>
     <button className={style.cart} onClick={ headerButtonHandler}>
        <div className={style.cartIcon}>$</div>
        <div className={style.cartName}>Cart</div>
        <div className={style.cartCount}>{totalCartValue}</div>
     </button>
    </div>
  
    </>
  )
}

export default Header