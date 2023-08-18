import NavBar from "./components/interviewee/navbar/Navbar";
import { ToastContainer, toast as oldToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainProblemPoolContainer from "./components/interviewee/problempool/MainProblemPoolContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { devApi, prodApi } from "./config";
import UserProgressContainer from "./components/interviewee/UserProgress/UserProgressContainer";
import ProblemView from "./components/interviewee/ProblemView/ProblemView";
import Subscription from "./components/interviewee/subscription/Subscription";
import Runner from "./components/interviewee/Runner"
var showToast, getApiUrl;


function App() {
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
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<MainProblemPoolContainer />} />
          <Route
            path="/user-progress"
            exact
            element={<UserProgressContainer />}
          />
              <Route
            path="/problem/:id"
            exact
            element={<ProblemView />}
          />

<Route
            path="/subscription"
            exact
            element={<Subscription />}
          />
       

        <Route
            path="/run"
            exact
            element={<Runner />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
export { showToast, getApiUrl };