import NavBar from "./components/interviewee/navbar/Navbar";
import { useState } from 'react';
import { ToastContainer, toast as oldToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainProblemPoolContainer from "./components/interviewee/problempool/MainProblemPoolContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProgressContainer from "./components/interviewee/UserProgress/UserProgressContainer";
import ProblemView from "./components/interviewee/ProblemView/ProblemView";

import Recommendation from "./components/interviewee/Recommendation/Recommendation";
import ProblemCreate from "./components/interviewee/problempool/ProblemCreate"
import Subscription from "./components/interviewee/subscription/Subscription";
import Runner from "./components/interviewee/Runner"
import PostPayment from "./components/interviewee/PostPayment";
import Architecture from "./components/Architecture";
import Mocktest from "./components/interviewee/Mocktest/Mocktest";
import SingleTest from "./components/interviewee/Mocktest/SingleTest";
import Home from "./components/interviewee/home";
import Dummy from "./components/interviewee/Mocktest/Dummy";
import Dummy2 from "./components/interviewee/Mocktest/Dummy2";

var showToast, getApiUrl;


function App() {

  getApiUrl = () => {
    return process.env.REACT_APP_BACKEND_API_UPDATED;
  };

  showToast = (message) => {
    oldToast.dark(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/problempool" exact element={<MainProblemPoolContainer />} />
          <Route
            path="/user-progress"
            exact
            element={<UserProgressContainer />}
          />
              <Route
            path="/problem/:id"
            exact
            element={<ProblemView  />}
          />


              <Route
            path="Recommendation"
            exact
            element={<Recommendation />}

            />

          <Route
            path="/subscription"
            exact
            element={<Subscription />}
          />

        <Route
            path="/post-payment/:status"
            exact
            element={<PostPayment />}
          />
       

        <Route
            path="/run"
            exact
            element={<Runner />}

          />

          
        <Route
            path="/create"
            exact
            element={<ProblemCreate />}

          />

        <Route
            path="/monitor"
            exact
            element={<Architecture />}

            />
        
        <Route
            path="/tests"
            exact
            element={<Mocktest />}            

          />          

          <Route
            path="/test/:id"
            exact
            element={<SingleTest />}

          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
export { showToast, getApiUrl };