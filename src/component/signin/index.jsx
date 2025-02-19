import logoColor from "../../assets/images/logo/logo-color.png";
import logoWhite from "../../assets/images/logo/logo-white.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PasswordResetModal from "../modal/PasswordResetModal";
import { useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const API_URL = import.meta.env.VITE_HOST_URL;
// "http://93.127.194.87:9999"; // "http://192.168.0.203:9999" //
// const host = "${API_URL}";

function LeftSide() {
  const navigate = useNavigate();

  console.log(
    "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGLOOGGGGGGGGGGGGGGGGGGGGGGGGr "
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    logintype: "",
  });

  const navigateToContacts = () => {
    if (formData.logintype == "Shop") {
      navigate("/shopdashboard");
    } else if (formData.logintype == "Agent") {
      navigate("/agentdashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const LoginData = async (data) => {
    try {
      console.log("PlayerList :::::::", API_URL);
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((d) => d.json());
      console.log("data api from :latatestUser :::...", response);
      return response;
    } catch (e) {
      console.log("e :", e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let resData = await LoginData(formData);
    console.log(resData);

    if (resData.status) {
      console.log("formData.logintype ", formData.logintype);

      cookies.set("token", resData.data.token, { path: "/" });
      cookies.set("name", resData.data.type_name, { path: "/" });
      cookies.set("email", resData.data.name, { path: "/" });
      cookies.set("logintype", formData.logintype, { path: "/" });
      cookies.set("LoginUserId", resData.data._id, { path: "/" });

      navigateToContacts();
    } else {
      alert("Please Enter valid Email Or Passward..!!");
    }
  };

  const OnChange = async (event) => {
    let { name, value } = event.target;
    console.log("name ", name);
    console.log("name ", value);

    await setFormData({
      ...formData,
      [name]: value,
    });

    console.log("handleChange ::::::::::::::::::::::", formData);
  };

  return (
    <div className="lg:w-1/2 px-5 xl:pl-12 pt-10">
      <PasswordResetModal
        isActive={modalOpen}
        modalData={modalData}
        handelModalData={setModalData}
        handleActive={setModalOpen}
      />
      <header>
        <Link to="/dashboard" className="">
          <img src={logoColor} className="block dark:hidden" alt="Logo" />
          <img src={logoWhite} className="hidden dark:block" alt="Logo" />
        </Link>
      </header>
      <div className="max-w-[450px] m-auto pt-24 pb-16">
        <header className="text-center mb-8">
          <h2 className="text-bgray-900 dark:text-white text-4xl font-semibold font-poppins mb-2">
            Sign in to Fair Deal Prime
          </h2>
          <p className="font-urbanis text-base font-medium text-bgray-600 dark:text-bgray-50"></p>
        </header>

        <div className="mb-4">
          <input
            type="text"
            className="text-bgray-800 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
            placeholder="Username or email"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6 relative">
          <input
            type="text"
            id="password"
            name="password"
            onChange={handleChange}
            className="text-bgray-800 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
            placeholder="Password"
          />
          <button aria-label="none" className="absolute top-4 right-4 bottom-4">
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 1L20 19"
                stroke="#718096"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.58445 8.58704C9.20917 8.96205 8.99823 9.47079 8.99805 10.0013C8.99786 10.5319 9.20844 11.0408 9.58345 11.416C9.95847 11.7913 10.4672 12.0023 10.9977 12.0024C11.5283 12.0026 12.0372 11.7921 12.4125 11.417"
                stroke="#718096"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.363 3.36506C9.22042 3.11978 10.1082 2.9969 11 3.00006C15 3.00006 18.333 5.33306 21 10.0001C20.222 11.3611 19.388 12.5241 18.497 13.4881M16.357 15.3491C14.726 16.4491 12.942 17.0001 11 17.0001C7 17.0001 3.667 14.6671 1 10.0001C2.369 7.60506 3.913 5.82506 5.632 4.65906"
                stroke="#718096"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-between mb-7">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="w-5 h-5 dark:bg-darkblack-500 focus:ring-transparent rounded-full border border-bgray-300 focus:accent-success-300 text-success-300"
              name="logintype"
              id="logintype"
              value="Agent"
              checked={formData.logintype === "Agent"}
              onChange={OnChange}
            />
            <label
              htmlFor="Agent"
              className="text-bgray-900 dark:text-white text-base font-semibold"
            >
              Agent
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="w-5 h-5 dark:bg-darkblack-500 focus:ring-transparent rounded-full border border-bgray-300 focus:accent-success-300 text-success-300"
              name="logintype"
              id="logintype"
              value="Shop"
              checked={formData.logintype === "Shop"}
              onChange={OnChange}
            />
            <label
              htmlFor="Shop"
              className="text-bgray-900 dark:text-white text-base font-semibold"
            >
              Sub Agent
            </label>
          </div>
        </div>
        <div className="flex justify-between mb-7">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="w-5 h-5 dark:bg-darkblack-500 focus:ring-transparent rounded-full border border-bgray-300 focus:accent-success-300 text-success-300"
              name="remember"
              id="remember"
            />
            <label
              htmlFor="remember"
              className="text-bgray-900 dark:text-white text-base font-semibold"
            >
              Remember me
            </label>
          </div>
          <div>
            {
              //   <a
              //   onClick={() => setModalOpen(true)}
              //   data-target="#multi-step-modal"
              //   className="modal-open text-success-300 font-semibold text-base underline"
              // >
              //   Forgot Password?
              // </a>
            }
          </div>
        </div>
        <a
          href="index.html"
          className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full"
          onClick={handleSubmit}
        >
          Sign In
        </a>
        <p className="text-bgray-600 dark:text-white text-center text-sm mt-6">
          @ 2023 Deal-Regal. All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default LeftSide;

// <div className="flex items-center space-x-3">
// <input
//   type="checkbox"
//   className="w-5 h-5 dark:bg-darkblack-500 focus:ring-transparent rounded-full border border-bgray-300 focus:accent-success-300 text-success-300"
//   name="logintype"
//   id="logintype"
//   value="Admin"
//   checked={formData.logintype === "Admin"}
//   onChange={OnChange}
// />
// <label
//   htmlFor="Admin"
//   className="text-bgray-900 dark:text-white text-base font-semibold"
// >
//   Admin
// </label>
// </div>
