import React, { useContext } from 'react'
import style from "./Item.module.css"
import DataContext from '../../store/DataContext'


const Item = () => {

    const itemsListDataCtx = useContext(DataContext);

    const itemsList = itemsListDataCtx.itemsList;

    const addLHandler = (e) => {
        let data = {
            increment: 1,
            id: e.target.id,
            sizeType: "L"
        }
        // console.log(e.target);
        itemsListDataCtx.addItemToCart(data)
    }

    const addMHandler = (e) => {
        
        let data = {
            increment: 1,
            id: e.target.id,
            sizeType: "M"
        }
        // console.log(e.target);
        itemsListDataCtx.addItemToCart(data)
    }

    const addSHandler = (e) => {
        let data = {
            increment: 1,
            id: e.target.id,
            sizeType: "S"
        }
        // console.log(e.target);
        itemsListDataCtx.addItemToCart(data)
    }
    
  return (
    <>
    <div className={style.itemContainer}> 
    {itemsList.map( (val) => <div className={style.selfContainer} key= {val.id} >
            <div className={style.itemName}>{val.name}</div>
            <div className={style.itemDesc} >{val.desc}</div>
            <div className={style.itemPrice}>${val.price}</div>
            <div className={style.lSize}>
                <button  id={val.id} onClick={ addLHandler } value="1">L({val.lSize})</button>
            </div>
            <div className={style.mSize}>
                <button  id={val.id} onClick={ addMHandler } value ="2">M({val.mSize})</button>
                </div>
            <div className={style.sSize}>
                <button  id={val.id} onClick={ addSHandler } value ="5">S({val.sSize})</button>
            </div>
        </div>)}
        
    </div>
    </>
  )
}

export default Item