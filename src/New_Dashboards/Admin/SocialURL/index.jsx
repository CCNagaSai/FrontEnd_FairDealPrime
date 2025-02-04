import React from "react";
import "../Admindash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AdminSidebar"; // Adjust path to Sidebar component
import Topbar from "../../Common/Topbar";
import SocialURL from "../../../pages/SocialURL";
import AddSocialURL from "../../../component/AddSocialURL";
import ListSocial from "../../../component/AddSocialURL/listofsocial";

const AdminSocialURL = () => {
  return (
    <div className="app">
      <div className="Header">
        <Topbar />
      </div>
      <div className="content">
        <div className="Left">
          <Sidebar />
        </div>
        <div className="Right ">
          <main className="w-full px-6 pb-6 xl:px-12 xl:pb-12">
            <div className="2xl:flex 2xl:space-x-[48px]">
              <section className="mb-6 2xl:mb-0 2xl:flex-1">
                <AddSocialURL />
                <ListSocial pageSize={10} />
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminSocialURL;
