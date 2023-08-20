import React, { useState,useEffect } from "react";
import { getSubmissionStats } from "../../../actions/interviewee/stats";
import "../../../assets/css/interviewee/problempool/userproblemstat.css";
import CircularProgress from '@mui/material/CircularProgress';
const UserProblemStatCard = (props) => {

  const [data,setData]=useState({})
  const [progress, setProgress] = React.useState(0);

  const fetchStats=async ()=>{
    var res=await getSubmissionStats()
    console.log(res)
    setData(res?res.data:{})
  }

  useEffect(()=>{
  //props.fetchProblems({})
console.log(props.probs)

fetchStats()
console.log(data)
const timer = setInterval(() => {
  setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
}, 50);


  },[])
  return (
    <div class="box">
      <div class="ring">
        <div class="fraction">
          <div class="numerator">{Object.keys(data).length===0?"NA":data.easy + data.medium+data.hard}</div>
          <hr class="division-line" />
          <div class="denominator">{Object.keys(props.probs).length===0?"":props.probs.data.length}</div>
        </div>
      </div>
      <div class="text-container">
        <div class="text-green">
          <pre>Easy {Object.keys(data).length===0?"NA":data.easy}/{Object.keys(props.probs).length===0?"":props.probs.data.filter(p=>p.difficulty==="easy").length}</pre>
        </div>
        <div class="text-yellow">
          <pre >Medium {Object.keys(data).length===0?"NA":data.medium}/{Object.keys(props.probs).length===0?"":props.probs.data.filter(p=>p.difficulty==="medium").length}</pre>
        </div>
        <div class="text-red">
          <pre>Difficult {Object.keys(data).length===0?"NA":data.hard}/{Object.keys(props.probs).length===0?"":props.probs.data.filter(p=>p.difficulty==="hard").length}</pre>
        </div>
      </div>
    </div>
  );
};

export default UserProblemStatCard;
