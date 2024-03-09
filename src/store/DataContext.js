import { createContext } from "react";


const DataContext = createContext( {
    //item list for bottom part
    itemsList : [],
    //adItemList function to add data from middle to bottom part
    addItemToList : "",

    // this is used for cart purpose
    cartItems : [],
    addItemToCart: "",
    removeItemFromCart : "",

});


export default DataContext;