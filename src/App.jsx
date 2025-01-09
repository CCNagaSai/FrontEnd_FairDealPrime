import AOS from "aos";
import "aos/dist/aos.css";
import {useState, useEffect } from "react";
import Router from "./Router";
import OfferState from './context/OfferState';
import Login from './component/signin/index';
import Dashboard from "./component/dashboard/Dashboard";
import {useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const tokendata = cookies.get('token')
  const name = cookies.get('name')
  const email = cookies.get('email')

  console.log("tokendata LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",!tokendata)
  
  
  if (!tokendata) {

    //let gameName = location.search
    console.log("Location ",window.location)
    console.log("window.location.href ",window.location.href)

    var url = window.location.href.split("5175")
    console.log("URL ",url)

    
    // console.log("url[1] :::::::::::", url[1])
    
    if(url[1]?.toLowerCase() != "/signInadmin".toLowerCase() && url[1] != "/signin"){
      window.location.href = 'http://fairdealprime.com:5175/signin'; //"http://192.168.0.203:5175/signin"//
      return false 
    }
    //return (<Router><Login/></Router>)
  }


  return (
    <>
      <OfferState adminname={name} adminEmail={email} tokendata={tokendata}>
        <Router/>
      </OfferState>
    </>
  );
}

export default App;
