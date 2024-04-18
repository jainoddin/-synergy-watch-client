import React from "react";
import "remixicon/fonts/remixicon.css";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "../Login";

const Navbar = (props) => {
  const [clicked, setClicked] = useState(false);
  const [isSun, setIsSun] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(!clicked);
  };

  const toggleIcon = () => {
    setIsSun(!isSun);
    document.body.classList.toggle("dark-mode", isSun);
  };

  const logouthandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="a">
      <nav
        class="navbar navbar-light bg-light justify-content-between"
        id="navbar"
      >
        <a class="navbar-brand">
          {" "}
          <h1 class="text-center mb-3">
            <span class="logo">Synergy</span>
            WATCH
          </h1>
        </a>

        <form
          class="form-inline"
          className={clicked ? "form-inline active" : "form-inline"}
        >
          <div onClick={toggleIcon} className="link-bar icon-sm">
            {isSun ? (
              <p>
                <i class="ri-sun-line"></i>
              </p>
            ) : (
              <p>
                <i class="ri-moon-fill"></i>
              </p>
            )}
          </div>
          <div class="nav-link">
           
            <i class="ri-account-circle-fill" style={{fontSize:"200%"}}></i>{" "}
           
          </div>
          <button
            class="btn btn-secondary my-2 my-sm-0 b"
            type="submit"
            onClick={logouthandler}
          >
            Logout
          </button>
        </form>

        <div>
          <div id="mobile" onClick={handleClick}>
            <li
              id="bar"
              className={clicked ? "fas fa-times" : "fas fa-bars"}
            ></li>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
