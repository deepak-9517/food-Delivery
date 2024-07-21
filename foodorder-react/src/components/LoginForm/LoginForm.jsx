import React, { useContext, useState } from "react";
import "./LoginForm.css";
import { Login, Register } from "../../api_function";
import { toast } from "react-toastify";
import { StoreContext } from "../ContextApi/Context";

const LoginForm = ({ setLoginPopup }) => {
  const [accountStatus, setAccountStatus] = useState(true);
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { setJwtToken, jwtToken } = useContext(StoreContext);
  const handleInputChange = (e) => {
    if (accountStatus) {
      setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
    } else {
      setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
    }
  };

  async function formSubmit(e) {
    e.preventDefault();
    let res = null;
    if (accountStatus) {
      res = await Login(loginInput);
    } else {
      res = await Register(registerInput);
    }

    if (res?.data?.status === 400) {
      toast.error(res?.data?.message);
    }
    if (res?.data?.status === 200) {
      toast.success(res?.data?.message);
      localStorage.setItem("token", res?.data?.token);
      setJwtToken(res?.data?.token);
      setLoginPopup(false);
    }
  }

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">
          <form className="login-form ms-4" onSubmit={formSubmit}>
            <div className="form-header d-flex justify-content-between">
              <h2 className="form-name ">
                {accountStatus ? "Login" : "Sign Up"}
              </h2>
              <h2
                className="form-cut fs-1 me-4"
                onClick={() => setLoginPopup(false)}
                style={{ cursor: "pointer" }}
              >
                x
              </h2>
            </div>
            {accountStatus ? (
              <div className="from-input mt-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="form-control border"
                  value={loginInput.email}
                  onChange={handleInputChange}
                  required
                />
                <br />
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  className="form-control border"
                  value={loginInput.password}
                  onChange={handleInputChange}
                  required
                />
                <br />
                <input type="submit" value="Login" className="submit-button" />
              </div>
            ) : (
              <div className="from-input">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  className="form-control border"
                  value={registerInput.name}
                  onChange={handleInputChange}
                  required
                />
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email"
                  className="form-control border"
                  value={registerInput.email}
                  onChange={handleInputChange}
                  required
                />
                <br />
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  className="form-control border"
                  value={registerInput.password}
                  onChange={handleInputChange}
                  required
                />
                <br />
                <input
                  type="submit"
                  value="Create account"
                  className="submit-button"
                />
                <br />
              </div>
            )}

            <div className="form-terms-conditions mt-3">
              <input type="checkbox" required />{" "}
              <span className="ms-2">
                By continuing i agree to the terms of use & privacy policy
              </span>
            </div>
            {accountStatus ? (
              <p className="form-bottom mt-4">
                Create a account ?
                <span onClick={() => setAccountStatus(false)}>
                  Create account here
                </span>
              </p>
            ) : (
              <p className="form-bottom mt-4">
                Alredy have an account ?
                <span onClick={() => setAccountStatus(true)}>Login here</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
