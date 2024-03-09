import React, { useEffect, useReducer } from 'react'
import DataContext from './DataContext'

const reducer = ( state, action) => {

    if(action.type === "ADD_TO_ITEMS_LIST"){
        const updatedItemsList = [action.data,...state.itemsList]

        //update to localstorage
        localStorage.setItem('state', JSON.stringify({...state, 
            itemsList: updatedItemsList,}))
        //

        return {
            ...state, 
            itemsList: updatedItemsList,
        }
    }
    if( action.type === "ADD_TO_CART_ITEMS"){
        state.itemsList.forEach( (val, index) => { 
            if(val.id === action.data.id ){
           
                if(action.data.sizeType === "L" && val.lSize > 0){
                    

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
                else if(action.data.sizeType === "M" && val.mSize > 0){

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
                else if(action.data.sizeType === "S" && val.sSize > 0){

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
        // console.log(state.cartItems);
        localStorage.setItem('state', JSON.stringify({...state}));
        return{...state}
                 
        
    }

    if(action.type === "CART_VISIBILITY_TRUE"){
        localStorage.setItem('state', JSON.stringify({...state, isCartVisible: true}))
        return {
            ...state,
            isCartVisible: true,
        }
    }
    else if(action.type === "CART_VISIBILITY_FALSE"){
        localStorage.setItem('state', JSON.stringify({...state, isCartVisible: false}))
        return {
            ...state,
            isCartVisible: false,
        }
    }

    if(action.type === "CART_CHANGE"){
        // console.log(action.data);
        if( action.data.countType === "inc_by_1"){
            console.log("Inc by 1 clicked");
            console.log(state.itemsList);
            state.itemsList.forEach( (val, index) => {
                if(val.id === action.data.id){
                    console.log("Data found itemsList");
                    if(action.data.sizeType === "L" && val.lSize > 0){
                        val.lSize = val.lSize - 1;
                        state.cartItems.forEach( (val,index) => {
                            if(action.data.sizeType === val.sizeType && action.data.id === val.id){
                                state.cartItems[index].lCount = state.cartItems[index].lCount + 1; 
                            }
                        })
                    }
                    else if(action.data.sizeType === "M" && val.mSize > 0){
                        val.mSize = val.mSize - 1;
                        state.cartItems.forEach( (val,index) => {
                            if(action.data.sizeType === val.sizeType && action.data.id === val.id){
                                state.cartItems[index].mCount = state.cartItems[index].mCount + 1; 
                            }
                        })
                    }
                    else if(action.data.sizeType === "S" && val.sSize > 0){
                        val.sSize = val.sSize - 1;
                        state.cartItems.forEach( (val,index) => {
                            if(action.data.sizeType === val.sizeType && action.data.id === val.id){
                                state.cartItems[index].sCount = state.cartItems[index].sCount + 1; 
                            }
                        })
                    }   

                }
            })
        }

        else if( action.data.countType === "dec_by_1"){
            console.log("Dec by 1 clicked");
           console.log(action.data);
           state.cartItems.forEach( (val,index) => {
            if(val.id === action.data.id && val.sizeType === action.data.sizeType ){
                // console.log(" match found in CartItems");

                if(action.data.sizeType === "L"){
                    console.log("Decrease in lCount");
                    console.log(val);
                    val.lCount = val.lCount - 1;
                    state.itemsList.forEach( (val,index) => {
                        if( val.id === action.data.id){
                             console.log("Match Found in itemList")
                             console.log(val);
                             val.lSize = val.lSize + 1 ;
                            }
                    })
                    if(val.lCount === 0){
                        state.cartItems.splice(index, 1);
                    }   
                    
                }
                else if(action.data.sizeType === "M"){
                    console.log("Decrease in mCount");
                    console.log(val);
                    val.mCount = val.mCount - 1;
                    state.itemsList.forEach( (val,index) => {
                        if( val.id === action.data.id){
                             console.log("Match Found in itemList")
                             console.log(val);
                             val.mSize = val.mSize + 1 ;
                            }
                    })
                    if(val.mCount === 0){
                        state.cartItems.splice(index, 1);
                    }
                }
                else if(action.data.sizeType === "S"){
                    console.log("Decrease in sCount");
                    console.log(val);
                    val.sCount = val.sCount - 1;
                    state.itemsList.forEach( (val,index) => {
                        if( val.id === action.data.id){
                             console.log("Match Found in itemList")
                             console.log(val);
                             val.sSize = val.sSize + 1 ;
                            }
                    })
                    if(val.sCount === 0){
                        state.cartItems.splice(index, 1);
                    }
                }

                
            }
           })
            // console.log(state.itemsList);
            // state.itemsList.forEach( (val,index) => {
            //     if( val.id === action.data.id){
            //         console.log("Match Found in itemList")
            //     }
            // })
            


            // state.cartItems.forEach( (val,index) => {
            //     if(action.data.sizeType === val.sizeType && action.data.id === val.id){
            //         console.log("match found" )
            //         console.log(val);
            //         console.log(state.cartItems[index].lCount) ;
            //         if(state.cartItems[index].lCount === 1){
            //             console.log("Last value f");
            //             console.log(state.cartItems);
            //             state.cartItems.splice(index,1);
            //             console.log(state.cartItems)
                        
            //         }else{
            //             state.cartItems[index].lCount = state.cartItems[index].lCount - 1;
            //         }
                     
            //     }
            // })
        }
        localStorage.setItem('state', JSON.stringify({...state}))
        return{ ...state }
    }

    
    return state;
}



const DataProvider = (props) => {

     
    // const defaultState = {
    //     itemsList :  [
    //         {id:"c1", name:"Adidas", desc: "Cotton", price: 50, lSize:10,mSize:10,sSize:10},
    //         {id:"c2", name:"Nike", desc: "Popline", price: 70,lSize:10,mSize:20,sSize:21},
    //         {id:"c3", name:"Levi's", desc: "Broadcloth", price: 60, lSize:0,mSize:200,sSize:300},
    //         {id:"c4", name:"Tommy", desc: "Dobby", price: 80, lSize:100,mSize:200,sSize:300},
    //         {id:"c5", name:"Allen Solly", desc: "Flannel", price: 40, lSize:100,mSize:200,sSize:300},
    //       ],

    //       cartItems: [],
    //       isCartVisible : false,
    // }

    // localStorage.setItem('state', JSON.stringify(defaultState));
    // let data = JSON.parse(localStorage.getItem('state'));

   
        if( JSON.stringify(localStorage.getItem('state')) != 'null' ){
            console.log("Data is local storage is available")
        }
        else if(JSON.stringify(localStorage.getItem('state')) == 'null'){
            const data = {
                itemsList :  [
                    // {id:"c1", name:"Adidas", desc: "Cotton", price: 50, lSize:10,mSize:10,sSize:10},
                    // {id:"c2", name:"Nike", desc: "Popline", price: 70,lSize:10,mSize:20,sSize:21},
                    // {id:"c3", name:"Levi's", desc: "Broadcloth", price: 60, lSize:0,mSize:200,sSize:300},
                    // {id:"c4", name:"Tommy", desc: "Dobby", price: 80, lSize:100,mSize:200,sSize:300},
                    // {id:"c5", name:"Allen Solly", desc: "Flannel", price: 40, lSize:100,mSize:200,sSize:300},
                  ],
        
                  cartItems: [],
                  isCartVisible : false,
            }

            localStorage.setItem('state', JSON.stringify(data));
        }


    const defaultState = JSON.parse(localStorage.getItem('state'))
    console.log(defaultState);


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

      const cartChangehandler = (data) => {
        
        dispatchFun({type: "CART_CHANGE", data:data})
       
      }

    //   const cartIncrementhandler = (data) => {
    //     console.log("Cart increment is clicked");
    //     console.log(data);
    //     dispatchFun({type: "INCREMENT_OF_CART_ITEMS", data:data})
    //   }

     
      
    
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
         cartChange : cartChangehandler,
        
    }
  return (
    <DataContext.Provider value={ Data }>
        {props.children}
    </DataContext.Provider>
  )
}

export default DataProvider