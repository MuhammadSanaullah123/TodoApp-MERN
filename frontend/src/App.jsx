import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.scss";

import Login from "./userPages/Login";
import SignUp from "./userPages/Signup";
import Header from "./components/Header";
import Home from "./userPages/Home";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Header />
          <ToastContainer />

          <Routes>
            <Route exact path="/" element={<Navigate replace to="/login" />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            {/* Private Routes */}
            <Route path="" element={<PrivateRoute />}>
              <Route exact path="/home" element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
