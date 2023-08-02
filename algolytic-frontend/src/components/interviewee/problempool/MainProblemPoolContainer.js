import React, { useState } from "react";
import UserProblemStatCard from "./UserProblemStatCard"
import Filtering from "./Filtering"
import ProblemList from "./ProblemList";
import { getProbList } from "../../../actions/interviewee/problemList";
const MainProblemPoolContainer = (props) => {
    const [probs,setProbs]=useState({})
   const [body,setBody]=useState({})
    const fetchProblems=async (data)=>{
        var res=await getProbList(data)
        console.log(res)
      //  setProbs(res);
      setProbs({})
      }
    return (
        <>
            <UserProblemStatCard probs={probs} fetchProblems={fetchProblems}/>
            <Filtering setBody={setBody} body={body} fetchProblems={fetchProblems} setProbs={setProbs} probs={probs}/>
            <ProblemList fetchProblems={fetchProblems} setProbs={setProbs} probs={probs}/>
        </>     
    );
};

export default MainProblemPoolContainer
