import "./App.css"
import Header from "./components/Top/Header";
import EnrtyForm from "./components/Middle/EnrtyForm";
import Item from "./components/Bottom/Item";
import Cart from "./components/Cart/Cart";
import { useContext } from "react";
import DataContext from "./store/DataContext";
import { createPortal } from 'react-dom';




function App() {
  let portalRoot = document.getElementById("layout");
  // let portalIs = createPortal(<Cart/>, portalRoot);
  
  const dataCtx = useContext(DataContext);
    
  const isCartVisible = dataCtx.isCartVisible;
  return (
    <>
    {isCartVisible &&  createPortal(<Cart/>, portalRoot) }
    <Header />
    <EnrtyForm />
    <Item />
    </>
  );
}

export default App;
