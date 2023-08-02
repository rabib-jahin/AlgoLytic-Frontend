import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/interviewee/navbar.css";
import CircularProgress from "@mui/material/CircularProgress";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../../assets/images/icons/algolytic.jpg";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  checkAuth,
  googleLogin,
  logout,
} from "../../../actions/interviewee/auth";
import { showToast } from "../../../App";

const NavBar = (props) => {
  const [activeOption, setActiveOption] = useState("problems");

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const [isAuth, setAuth] = useState(checkAuth());

  const [authLoading, setAuthLoading] = useState(false);

  const handleCallbackResponse = async (response) => {
    if ("credential" in response) {
      setAuthLoading(true);
      var result = await googleLogin({ credential: response.credential });
      if (result) {
        setAuth(true);
        showToast("Successfully Logged In");
      } else showToast("Authentication Failed");
      setAuthLoading(false);
    }
  };

  const logoutClick = () => {
    logout();
    setAuth(false);
    
  
    showToast("Logged Out");
  };

  useEffect(() => {
    // if (!isAuth) {
    //   /* global google */
    //   google.accounts.id.initialize({
    //     client_id:
    //       "988155575801-s3c394rgr41j19l41vebloavr4lhf09k.apps.googleusercontent.com",
    //     callback: handleCallbackResponse,
    //   });
    //   google.accounts.id.renderButton(document.getElementById("google-btn"), {
    //     theme: "outline",
    //     size: "large",
    //   });
    // }
  }, [isAuth]);

  return (
    <header className="header">
      <div className="">
        <Link to="/">
          <img className="logo-image" src={logo} alt="LOGO" />
        </Link>
      </div>
      <ul className="navbar-menu">
        <li
          className={activeOption === "problems" ? "active" : ""}
          onClick={() => handleOptionClick("problems")}
        >
          <Link to="/">Problems</Link>
        </li>
        <li
          className={activeOption === "learn" ? "active" : ""}
          onClick={() => handleOptionClick("learn")}
        >
          <a href="#">Learn</a>
        </li>
        <li
          className={activeOption === "recommendation" ? "active" : ""}
          onClick={() => handleOptionClick("recommendation")}
        >
          <a href="#">Recommendation</a>
        </li>
        <li
          className={activeOption === "subscription" ? "active" : ""}
          onClick={() => handleOptionClick("subscription")}
        >
          <a href="#">Subscription</a>
        </li>
      </ul>
      <div className="header-right">
        {isAuth ? (
          <>
            <NotificationsNoneIcon fontSize="large" className="header-icon" />
            <Link to="/user-progress">
              <AccountCircleIcon fontSize="large" className="header-icon" />
            </Link>
            {authLoading ? (
              <CircularProgress className="header-icon" />
            ) : (
              <LogoutIcon
                onClick={logoutClick}
                fontSize="large"
                className="header-icon"
              />
            )}
          </>
        ) : (
          <div id="google-btn" className="header-icon" />
        )}
      </div>
    </header>
  );
};

export default NavBar;