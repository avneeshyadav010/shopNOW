import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import itemStore from "./store";
import Header from "./Components/Header";
import './App.css'
import './modal.css'

import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

function App() {

   
  return (
    <>
   <Provider store={itemStore}>
    <Header></Header>    
      <Outlet/>
    </Provider>
    </>
  )
}

export default App
