import  ReactDOM  from "react-dom";
import "./index.css";
import App from "./App"
import DataProvider from "./store/DataProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <DataProvider><App/></DataProvider>);

