import React, { useState } from "react";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import apilist from "../apilist/Apilist";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = (e) => {
    setShowPassword(e.target.checked);
  };
  const handleShowPassword2 = (e) => {
    setShowPassword2(e.target.checked);
  };

  const [FormData, SetFormData] = useState({
    name: "",
    email: "",
    gender: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const HandleFormData = (e) => {
    const { name, value } = e.target;
    SetFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apilist.signup, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(FormData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      console.log("User registered successfully!");
      toast.success("Registered Successfully! Please Login Now");
      navigate("/Home");
      // Redirect the user to the login page or display a success message
    } catch (err) {
      console.error("Error registering user:", err.message);
      // Display an error message to the user
      toast.error("Registration Failed! Try Again Later.");
    }
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <div class="app">
        <div>
          <div class="login-auth-container">
            <div class="signup-card-container">
              <h1 class="text-center mb-3">
                <span class="logo">Synergy</span>WATCH
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitHandler(e);
                }}
              >
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label
                      for="inputEmail4"
                      className="d-flex justify-content-between"
                    >
                      USER NAME
                    </label>
                    <input
                      type="text"
                      class="form-control my-custom-input rounded border"
                      id="inputEmail4"
                      placeholder="User Name"
                      value={FormData.name}
                      name="name"
                      onChange={HandleFormData}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label
                      for="inputPassword4"
                      className="d-flex justify-content-between"
                    >
                      EMAIL
                    </label>
                    <input
                      type="email"
                      class="form-control my-custom-input rounded border"
                      id="inputPassword4"
                      placeholder="Email"
                      value={FormData.email}
                      name="email"
                      onChange={HandleFormData}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label
                      for="inputEmail4"
                      className="d-flex justify-content-between"
                    >
                      GENDER
                    </label>
                    <input
                      type="text"
                      class="form-control my-custom-input rounded border"
                      id="inputEmail4"
                      placeholder="Gender"
                      value={FormData.gender}
                      name="gender"
                      onChange={HandleFormData}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label
                      for="inputPassword4"
                      className="d-flex justify-content-between"
                    >
                      MOBLIE NUMBER
                    </label>
                    <input
                      type="text"
                      class="form-control my-custom-input rounded border"
                      id="inputPassword4"
                      placeholder="Mobile Number"
                      value={FormData.mobile}
                      name="mobile"
                      onChange={HandleFormData}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label
                      for="inputEmail4"
                      className="d-flex justify-content-between"
                    >
                      PASSWORD
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      class="form-control my-custom-input rounded border"
                      id="inputPassword4"
                      placeholder="Password"
                      value={FormData.password}
                      name="password"
                      onChange={HandleFormData}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label
                      for="inputPassword4"
                      className="d-flex justify-content-between "
                    >
                      CONFIRM Password
                    </label>
                    <input
                      type={showPassword2 ? "text" : "password"}
                      class="form-control my-custom-input rounded border"
                      id="inputPassword4"
                      placeholder="Confirm Password"
                      value={FormData.confirmPassword}
                      name="confirmPassword"
                      onChange={HandleFormData}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <div class="form-group col-md-6">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        value="option1"
                        onChange={handleShowPassword}
                      />
                      <label class="form-check-label" for="inlineCheckbox1">
                        Show Password
                      </label>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <div class="form-group col-md-6">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox2"
                        value="option2"
                        onChange={handleShowPassword2}
                      />
                      <label class="form-check-label" for="inlineCheckbox2">
                        Show Password
                      </label>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 signup-btn-container">
                  <button
                    class="signup-btn"
                    type="submit"
                    fdprocessedid="yczwio"
                  >
                    Signup
                  </button>
                </div>
                <p class=" navigate-signup">
                  Need an account?{" "}
                  <span class="navTo-signup">
                    <Link to="/">Login</Link>
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
