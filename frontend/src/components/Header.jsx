import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { clearTasks } from "../slices/taskSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      dispatch(clearTasks());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header id="header">
      <i className="fa-brands fa-react"></i>
      {sessionStorage.getItem("userInfo") && (
        <button onClick={handleLogout} variant="contained">
          Log out
        </button>
      )}
    </header>
  );
};

export default Header;
