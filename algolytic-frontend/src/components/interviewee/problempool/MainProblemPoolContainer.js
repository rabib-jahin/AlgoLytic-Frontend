import React, { useState } from "react";
import UserProblemStatCard from "./UserProblemStatCard"
import Filtering from "./Filtering"
import ProblemList from "./ProblemList";
import { getProbList } from "../../../actions/interviewee/problemList";
const MainProblemPoolContainer = (props) => {
    const [probs,setProbs]=useState({})
   const [body,setBody]=useState({})
    const fetchProblems=async ()=>{
        var res=await getProbList()
        console.log(res)
        setProbs(res);
   
      }
    return (
        <>
            {/* <UserProblemStatCard probs={probs} fetchProblems={fetchProblems}/> */}
            <Filtering setBody={setBody} body={body} fetchProblems={fetchProblems} setProbs={setProbs} probs={probs}/>
            <ProblemList fetchProblems={fetchProblems} setProbs={setProbs} probs={probs}/>
        </>     
    );
};

export default MainProblemPoolContainer
