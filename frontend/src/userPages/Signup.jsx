import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, { isLoading }] = useSignupMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    conpass: "",
  });

  const handleInput = (e) => {
    const Value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: Value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    try {
      const res = await signup({ name, email, password }).unwrap();
      toast.success("Account Created", { position: "top-center" });

      dispatch(setCredentials({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });

      /* toast.error(error.data.errors); */
      /*   toast.error(error?.data?.errors || error.error); */
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  return (
    <>
      <div id="signup">
        <form onSubmit={handleSubmit}>
          <div className="bigDivS">
            <div className="circleDiv">
              <div className="circleDiv2">
                <i
                  className="fa-solid fa-user circleDiv2pic"
                  alt="user icon"
                ></i>
              </div>
            </div>
            <div className="smallDivS">
              <div className="input-container">
                <i className="inputimgback">
                  <i className="fa-solid fa-address-card inputimg"></i>
                </i>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Username"
                  name="name"
                  value={values.name}
                  onChange={handleInput}
                  /* required */
                />
              </div>
              <div className="input-container">
                <i className="inputimgback">
                  <i className="fa-solid fa-envelope inputimg"></i>
                </i>
                <input
                  className="input-field"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleInput}
                  /* required */
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
                  /* required */
                />
              </div>
              <div className="input-container">
                <i className="inputimgback">
                  <i className="fa-solid fa-key inputimg"></i>
                </i>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Confirm Password"
                  name="conpass"
                  value={values.conpass}
                  onChange={handleInput}
                  /* required */
                />
              </div>

              <div className="check-container">
                <Link to="/login" className="checkp2">
                  Login
                </Link>
              </div>
            </div>
          </div>

          <button className="btn1" type="submit">
            Sign up
          </button>
        </form>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default SignUp;
