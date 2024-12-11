import ProtoTypes from "prop-types";
import Sidebar from "../sidebar";
import Overlay from "../overlay";
import SidebarV2 from "../sidebar/SidebarV2";
import HeaderOne from "../header/HeaderOne";
import HeaderTwo from "../header/HeaderTwo";
import { useState } from "react";
import { createContext } from "react";
import { Outlet } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const ThemeContext = createContext(null);

function Layout({ bg, overlay, children }) {

  console.log("lLayout ::::::::::::::::::ayout :::::::::::::::")

  const tokendata = cookies.get('token')
  console.log("tokendata lLayout LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",!tokendata)

  if (!tokendata) {

    //let gameName = location.search
    console.log("Location ",window.location)
    console.log("window.location.href ",window.location.href)

    var url = window.location.href.split("5176")
    console.log("URL ",url)

    
    // if(url[1] == "/signinadmin"){
    //   window.location.href = "http://192.168.0.203:5175/signinadmin"//'http://dealregal.com:5175/signin'; //
    //   return false
    // }

    if(url[1] != "/signin"){
      window.location.href =    'http://fairdealprime.com:5175/signin';//"http://192.168.0.203:5175/signin" //
      
      return false
    }
    //return (<Router><Login/></Router>)
  }



  const [sidebar, setSidebar] = useState(true);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "" || localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : ""
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`layout-wrapper ${
          sidebar && "active"
        }  w-full dark:bg-darkblack-600 `}
        style={{
          borderColor: "#2a313c",
        }}
      >
        <div className="relative flex w-full">
          <Sidebar handleActive={() => setSidebar(!sidebar)} />
          {overlay ? overlay : <Overlay />}
          <SidebarV2 />
          <div
            className={`body-wrapper flex-1 overflow-x-hidden ${
              bg ? bg : "dark:bg-darkblack-500"
            } `}
          >
            <HeaderOne handleSidebar={() => setSidebar(!sidebar)} />
            <HeaderTwo handleSidebar={() => setSidebar(!sidebar)} />
            <Outlet />
            {children}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

Layout.propTypes = {
  bg: ProtoTypes.string,
  overlay: ProtoTypes.node,
  children: ProtoTypes.node,
};

export default Layout;
