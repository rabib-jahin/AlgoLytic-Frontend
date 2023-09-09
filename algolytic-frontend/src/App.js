import NavBar from "./components/interviewee/navbar/Navbar";
import { useState,useEffect } from 'react';
import { ToastContainer, toast as oldToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainProblemPoolContainer from "./components/interviewee/problempool/MainProblemPoolContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { devApi, prodApi } from "./config";
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
import { useNavigate} from "react-router-dom";

var showToast, getApiUrl;


function App() {

  
  const navigate=useNavigate()

  const [serial,setSerial]=useState(1)

 useEffect(()=>{

console.log(serial)

 },[serial])


  getApiUrl = () => {
    var env = process.env.NODE_ENV;
    if (env === "development") return devApi;
    return prodApi;
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
            element={<ProblemView navigate={navigate}  setSerial={setSerial} serial={serial} isTest={false}/>}
          />

<Route
            path="/test/problem/:id"
            exact
            element={<ProblemView navigate={navigate}  setSerial={setSerial} serial={serial} isTest={true}/>}
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
     
      <ToastContainer />
    </>
  );
}

export default App;
export { showToast, getApiUrl };