import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Router from "./Router";
import OfferState from "./context/OfferState";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const tokendata = cookies.get("token");
  const name = cookies.get("name");
  const email = cookies.get("email");
  const logintype = cookies.get("logintype");

  if (!tokendata) {
    var url = window.location.href.split("5175");

    if (
      url[1]?.toLowerCase() !== "/signInadmin".toLowerCase() &&
      url[1] !== "/signin"
    ) {
      window.location.replace("http://fairdealprime.com:5175/signin"); // 🔥 `replace()` ensures no history entry
      return null; // Stop rendering further
    }
  } else {
    if (window.location.pathname === "/") {
      let redirectURL = "/admindashboard"; // Default

      if (logintype === "Agent") {
        redirectURL = "/agentdashboard";
      } else if (logintype === "Shop") {
        redirectURL = "/shopdashboard";
      }

      window.location.replace(redirectURL); // 🔥 Directly replaces the URL, no `/dashboard` flicker
      return null; // Stop rendering further
    }
  }

  return (
    <>
      <OfferState adminname={name} adminEmail={email} tokendata={tokendata}>
        <Router />
      </OfferState>
    </>
  );
}

export default App;
