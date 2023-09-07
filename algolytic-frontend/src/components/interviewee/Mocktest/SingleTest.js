import React, { useState,useEffect } from "react";
import { getSubmissionStats } from "../../../actions/interviewee/stats";

const SingleTest= (props) => {

  const [data,setData]=useState({})
  const [progress, setProgress] = React.useState(0);


  useEffect(()=>{
  //props.fetchProblems({})

  },[])
  return (
    <div class="box">
     he
    </div>
  );
};

export default SingleTest;
