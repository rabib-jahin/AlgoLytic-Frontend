import React, { useState, useEffect } from "react";
import { getProbData } from "../../../actions/interviewee/probView";

import "../../../assets/css/interviewee/problemview/desc.css";

const Description = (props) => {
  const [data, setData] = useState([])
  const [closed, setClosed] = useState(false)
  const click = () => {

    const domLock = document.querySelector(".lock")
    setClosed(!closed)

    domLock.classList.toggle("closed", closed)


    let anim = closed ?
      "LinearShake ease-in-out 280ms, 360ms AngularShake ease-in-out 280ms" :
      "LinearShake ease-in-out 280ms"



    domLock.style.animation = "none"
    setTimeout(() => domLock.style.animation = anim, 0)
    if (!closed) {
      setTimeout(function () {
        // Your code to be executed after the delay
      }, 500);
      window.sessionStorage.setItem("option", "subscription")
      window.location.href = "/subscription"
    }


  }

  const fetchProblems = async (data) => {
    var res = await getProbData(data)

    setData(res.data)
    console.log("nn", res.data)
  }
  useEffect(() => {

    fetchProblems(props.id)

  }, [])
  return (
    <div className="description" style={{ color: "white", marginLeft: "20px" }}>
      <div style={{ display: "flex" }}> <h3>{Object.keys(data).length == 0 ? "" : data?.isPremium == 0 || props.status ? data?.title : ""}</h3> <h4 style={{ color: "green", marginLeft: "20px" }}>{Object.keys(data).length == 0 ? "" : data?.isPremium == 0 || props.status ? data?.tag : ""}</h4></div>
      <div>
        {Object.keys(data).length == 0 ? "" : data?.isPremium == 0 || props.status ? data?.data_json?.description : (

          <>
            <div class="container">
              <svg onClick={click} class="lock closed" viewBox="0 0 184 220.19">
                <clipPath id="clip-path">
                  <rect class="fill-mask" x="7.5" y="97.69" width="169" height="115" rx="18.5" ry="18.5" />
                </clipPath>
                <g class="fill-mask-group">
                  <circle class="fill-circle" cx="142.5" cy="97.69" r="1.5" />
                </g>
                <path class="top-part" d="M41.5,93.69V56.93A49.24,49.24,0,0,1,90.73,7.69h2.54A49.24,49.24,0,0,1,142.5,56.93v2.26" />
                <rect class="bottom-part" x="7.5" y="97.69" width="169" height="115" rx="18.5" ry="18.5" />
              </svg>
              <span onClick={click}>Unlock</span>
            </div>


          </>


        )}
      </div>

    </div>
  );
};

export default Description;