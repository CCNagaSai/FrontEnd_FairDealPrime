import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AdminSidebar";
import Topbar from "../../Common/Topbar";
import AddSocialURL from "../../../component/AddNoticeText";
import ListNotice from "../../../component/AddNoticeText/listofnotice";

const AdminNoticeText = () => {
  return (
    <div className="app">
      <div className="Header">
        <Topbar />
      </div>
      <div className="content">
        <div className="Left">
          <Sidebar />
        </div>
        <div className="Right">
          <main className="w-full px-6 pb-6  xl:px-12 xl:pb-12">
            <div className="2xl:flex 2xl:space-x-[48px]">
              <section className="mb-6 2xl:mb-0 2xl:flex-1">
                <AddSocialURL />
                <ListNotice pageSize={10} />
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminNoticeText;
