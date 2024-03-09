import "./App.css"
import Header from "./components/Top/Header";
import EnrtyForm from "./components/Middle/EnrtyForm";
import Item from "./components/Bottom/Item";
import Cart from "./components/Cart/Cart";
import { useContext } from "react";
import DataContext from "./store/DataContext";



function App() {
  const dataCtx = useContext(DataContext);
    
  const isCartVisible = dataCtx.isCartVisible;
  return (
    <>
    {isCartVisible && <Cart />}
    <Header />
    <EnrtyForm />
    <Item />
    </>
  );
}

export default App;
