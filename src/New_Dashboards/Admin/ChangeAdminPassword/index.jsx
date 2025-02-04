import React from "react";
import "../AdminDash.css";
import ReactDOM from "react-dom/client";
import Sidebar from "../AdminSidebar";
import Topbar from "../../Common/Topbar";
import ChangePwd from "../../../component/ChangePwd";

const ChangeAdminPwd = () => {
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
            {/* write your code here */}
            <div className="2xl:flex 2xl:space-x-[48px]">
              <section className="mb-6 2xl:mb-0 2xl:flex-1">
                <ChangePwd />
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ChangeAdminPwd;
