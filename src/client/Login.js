import React, { useState } from "react";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import cookie from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import Navbar from "./components/Navbar";
import apilist from "../apilist/Apilist";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleShowPassword = (e) => {
    setShowPassword(e.target.checked);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const firstLetter = email.charAt(0).toUpperCase();
  console.log(firstLetter)
 



  const submitHandler = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(apilist.login, {
        email,
        password,
      });
      const data = response.data;
      console.log(data);
      cookie.set("jwtAuth", data.token);
     <Navbar m={firstLetter} />
      

      
      console.log("User Login successfully!");
      toast.success("Logged in Successfully!");
      
      
      navigate("/Home");
    } catch (err) {
      console.log(err);
      toast.error("Invalid Credentials!");
    }
  };

 

  return (
    <div id="root">
       <ToastContainer />
      <div class="app">
        <div>
          <div class="login-auth-container">
            <div class="login-card-container">
            
              <h1 class="text-center mb-3">
                <span class="logo">Synergy</span>
                WATCH
              </h1>
              <div className="d-flex justify-content-between">
              <form className="d-flex justify-content-between" onSubmit={submitHandler}>
                <div style={{left:"50%"}}>
                <div class="row login-container ">
                  <div class="col-7 login-user-input  col-xs-4">
                    <label
                      for="email"
                      class="label-text d-flex justify-content-between"
                    >
                      EMAIL
                    </label>
                    <input
                      id="email"
                      type="email"
                      class="form-control user-input"
                      placeholder="Email"
                      value={email}
                      name="Email"
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                  </div>
                  <div class="col-7 login-user-input">
                    <label
                      for="password"
                      class="label-text d-flex justify-content-between"
                    >
                      PASSWORD
                    </label>
                    <div class="password-container">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        class="form-control user-input-pwd"
                        value={password}
                        name="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                      />
                      <div class="col-5 show-password-container">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck1"
                          onClick={handleShowPassword}
                        />
                        <label class="form-check-label" for="exampleCheck1">
                          showPassword
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 login-user-input">
                    <button class="login-btn" type="submit" onSubmit={submitHandler} >
                      Login
                    </button>
                 
                    
                  </div>
                  <p class=" navigate-signup">
                    Need an account? <span class="navTo-signup"><Link to="/Register">Sign up</Link></span>
                  </p>
                </div>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
