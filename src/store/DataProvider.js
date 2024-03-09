import React, { useReducer } from 'react'
import DataContext from './DataContext'

const reducer = ( state, action) => {
    let myMap = new Map();

    if(action.type === "ADD_TO_ITEMS_LIST"){
        const updatedItemsList = [action.data,...state.itemsList]

        return {
            ...state, 
            itemsList: updatedItemsList,
        }
    }

    if( action.type === "ADD_TO_CART_ITEMS"){
    

         state.itemsList.forEach( (val, index) => { 
            if(val.id === action.data.id ){
           
                if(action.data.sizeType === "L"){

                    state.itemsList[index].lSize = state.itemsList[index].lSize -1 ;
                    let data = {
                        id: val.id ,
                        name: val.name,
                        desc: val.desc,
                        price: val.price, 
                        sizeType: "L",
                        lCount: 1,
                        mCount: 0,
                        sCount : 0,
                    }

                    let isIdSame = false;
                    if(state.cartItems.length > 0){
                        // console.log("Yes lenght is greater then zero");
                        state.cartItems.forEach( (val, index) => {
                            if(action.data.id === val.id && action.data.sizeType === val.sizeType){
                               isIdSame =  true;
                                state.cartItems[index].lCount = state.cartItems[index].lCount + 1;
                            } 
                        })
                        if(!isIdSame){
                            state.cartItems.push(data);
                        }
                    }
                    else{
                        // console.log("adding to L ");
                        state.cartItems.push(data);
                    }
                    return
                }
                else if(action.data.sizeType === "M"){

                    state.itemsList[index].mSize = state.itemsList[index].mSize -1 ;
                    let data = {
                        id: val.id ,
                        name: val.name,
                        desc: val.desc,
                        price: val.price, 
                        sizeType: "M",
                        lCount: 0,
                        mCount: 1,
                        sCount : 0,
                    }

                    let isIdSame = false;
                    if(state.cartItems.length > 0){
                        // console.log("Yes lenght is greater then zero");
                        state.cartItems.forEach( (val, index) => {
                            if(action.data.id === val.id && action.data.sizeType === val.sizeType){
                               isIdSame =  true;
                                state.cartItems[index].mCount = state.cartItems[index].mCount + 1;
                            } 
                        })
                        if(!isIdSame){
                            state.cartItems.push(data);
                        }
                    }
                    else{
                        // console.log("adding to M ");
                        state.cartItems.push(data);
                    }
                    return
                }
                else if(action.data.sizeType === "S"){

                    state.itemsList[index].sSize = state.itemsList[index].sSize -1 ;
                    let data = {
                        id: val.id ,
                        name: val.name,
                        desc: val.desc,
                        price: val.price, 
                        sizeType: "S",
                        lCount: 0,
                        mCount: 0,
                        sCount : 1,
                    }

                    let isIdSame = false;
                    if(state.cartItems.length > 0){
                        // console.log("Yes lenght is greater then zero");
                        state.cartItems.forEach( (val, index) => {
                            if(action.data.id === val.id && action.data.sizeType === val.sizeType){
                               isIdSame =  true;
                                state.cartItems[index].sCount = state.cartItems[index].sCount + 1;
                            } 
                        })
                        if(!isIdSame){
                            state.cartItems.push(data);
                        }
                    }
                    else{
                        // console.log("adding to S ");
                        state.cartItems.push(data);
                    }
                    return
                }
                // console.log(val);
                // let pushToState = {...val}
                // state.cartItems.push(pushToState);
                return;
         }
        });
        console.log(state.cartItems);
        return{...state}
                 
        
    }

    if(action.type === "CART_VISIBILITY_TRUE"){
        return {
            ...state,
            isCartVisible: true,
        }
    }
    else if(action.type === "CART_VISIBILITY_FALSE"){
        return {
            ...state,
            isCartVisible: false,
        }
    }

    if( action.type === "DECREMENT_OF_CART_ITEMS"){
        // console.log(state.cartItems);
        state.cartItems.forEach( (val, index) => {
            // console.log(val.id);
            if( val.id === action.data ){
                if(val.increment === 1){
                    state.cartItems.pop(index);
                    return;
                }
                val.increment = (+val.increment) - 1;
                return;
            }
        })
        // console.log(state.cartItems);
        return {
            ...state
        }
    }

    if( action.type === "INCREMENT_OF_CART_ITEMS"){
        console.log(state.cartItems);
        
        state.cartItems.forEach( (val, index) => {
            console.log(val.id);
            if( val.id === action.data ){
                val.increment = (+val.increment) + 1;
                return;
            }
        })
        console.log(state.cartItems);
        return {
            ...state
        }
    }

    
    return state;
}



const DataProvider = (props) => {

     
    const defaultState = {
        itemsList :  [
            {id:"c1", name:"Adidas", desc: "Cotton", price: 50, lSize:100,mSize:200,sSize:300},
            {id:"c2", name:"Nike", desc: "Popline", price: 70,lSize:100,mSize:200,sSize:300},
            {id:"c3", name:"Levi's", desc: "Broadcloth", price: 60, lSize:100,mSize:200,sSize:300},
            {id:"c4", name:"Tommy", desc: "Dobby", price: 80, lSize:100,mSize:200,sSize:300},
            {id:"c5", name:"Allen Solly", desc: "Flannel", price: 40, lSize:100,mSize:200,sSize:300},
          ],

          cartItems: [],
          isCartVisible : false,
    }

      const [state, dispatchFun ] = useReducer( reducer, defaultState);


       //used to add data to list from Entryform
      const itemListAddHandler = (dataFromEnrtyForm) => {
         dispatchFun( {type:"ADD_TO_ITEMS_LIST", data: dataFromEnrtyForm});
      }

      const cartItemHandler = (dataFromItemButton) => {
        dispatchFun( { type: "ADD_TO_CART_ITEMS", data: dataFromItemButton})
      }

      const cartVisibilityHandler = (data) => {
        if(data === "1"){
            dispatchFun( {type:"CART_VISIBILITY_TRUE"});
        }

        else if(data === "0"){
            dispatchFun( {type:"CART_VISIBILITY_FALSE"});
        }
        
      }

      const cartDecrementhandler = (data) => {
        
        dispatchFun({type: "DECREMENT_OF_CART_ITEMS", data:data})
       
      }

      const cartIncrementhandler = (data) => {
        console.log("Cart increment is clicked");
        console.log(data);
        dispatchFun({type: "INCREMENT_OF_CART_ITEMS", data:data})
      }

     
      
    
    const Data = {
         //item list for bottom part
         itemsList : state.itemsList,
         //adItemList function to add data from middle to bottom part
         addItemToList : itemListAddHandler,
     
         // this is used for cart purpose
         cartItems : state.cartItems,
         addItemToCart: cartItemHandler,
         removeItemFromCart : "",

         cartVisibility : cartVisibilityHandler,
         isCartVisible : state.isCartVisible,
         cartDecrement : cartDecrementhandler,
         cartIncrement : cartIncrementhandler,
    }
  return (
    <DataContext.Provider value={ Data }>
        {props.children}
    </DataContext.Provider>
  )
}

export default DataProvider