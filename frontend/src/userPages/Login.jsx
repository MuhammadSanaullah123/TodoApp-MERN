import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleInput = (e) => {
    const Value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: Value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    try {
      const res = await login({ email, password }).unwrap();
      toast.success("Login Successful", { position: "top-center" });
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  return (
    <>
      <div id="login">
        <form onSubmit={handleSubmit}>
          <div className="bigDiv">
            <div className="circleDiv">
              <div className="circleDiv2">
                <i
                  className="fa-solid fa-user circleDiv2pic"
                  alt="user icon"
                ></i>
              </div>
            </div>
            <div className="smallDiv">
              <div className="input-container">
                <i className="inputimgback">
                  <i className="fa-solid fa-envelope inputimg"></i>
                </i>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="input-container">
                <i className="inputimgback">
                  <i className="fa-solid fa-key inputimg"></i>
                </i>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="check-container">
                <Link to="/signup" className="checkp2">
                  Create Account
                </Link>
              </div>
            </div>
          </div>

          <button className="btn1" type="submit">
            Login
          </button>
        </form>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default Login;
