import React, { useContext } from 'react'
import style from "./Cart.module.css";
import DataContext from '../../store/DataContext';

const Cart = () => {
    const dataOfCartCtx = useContext(DataContext);

    const CartDataArray = dataOfCartCtx.cartItems;

    // console.log(CartDataArray);

    let listXml = "No data Found, Add to Order";
    let totalAMount = 0;

   if(CartDataArray.length > 0){

    CartDataArray.forEach( (val) => {
        totalAMount += (+val.price)*(+val.increment);
    });
     
        listXml =  (<div className={style.itemListContainer}> 

        {CartDataArray.map( (val) => {
            return( <div key= {`val.id${(Math.random()*10).toFixed(2)} `} className={style.singleItemContainer}>
                <div className={style.itemDetailContainer}> 
                   <div>{val.name}</div>
                   <div className={style.descContainer}>{val.desc}</div>
                </div>
            <div className={style.itemPriceContainer}>${val.price} </div>
            <div className={style.itemButtons}>
                
                 <div>
                 <button className={style.negButton} id= {val.id} onClick= { (e) => {
                    dataOfCartCtx.cartDecrement(e.target.id)
                 }}>-</button>
                 {val.increment}
                 <button className={style.posButton} id= {val.id} onClick={(e) => {
                    dataOfCartCtx.cartIncrement(e.target.id);
                 }}>+</button>
                 </div>
                
            </div> </div> )
        })}

        
        
     </div>)

     
   }

   const cartCloseHandler  = () => {
    dataOfCartCtx.cartVisibility("0");
   }
    
  return (
    <div className={style.cartContainer}>
     
        <div className={style.cartItemContainer}> 
            {CartDataArray.lenght>0 ? listXml : listXml}
        <div className={style.totalAmountContainer}>
            <div> Total Amount: </div>
            <div> ${totalAMount}</div>
        </div>
        <div className={style.cartButtons}>
            <button onClick = {cartCloseHandler}> Close</button>
            {CartDataArray.length>0 && <button> Order</button>}
        </div>
        </div>

       
    </div>
  )
}

export default Cart