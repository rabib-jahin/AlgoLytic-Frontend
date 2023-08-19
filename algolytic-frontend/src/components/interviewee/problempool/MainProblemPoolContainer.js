import React, { useState } from "react";
import UserProblemStatCard from "./UserProblemStatCard"
import Filtering from "./Filtering"
import ProblemList from "./ProblemList";
import { getProbList } from "../../../actions/interviewee/problemList";
const MainProblemPoolContainer = (props) => {
    const [probs,setProbs]=useState({})
   const [body,setBody]=useState({})
    const fetchProblems=async ()=>{
        setProbs({})
        var res=await getProbList(body)
        console.log(res)
        setProbs(res);
   
      }

      const setProblems=ps=>{
        console.log(ps)
        setProbs(ps)
      }

    return (
        <>
            <UserProblemStatCard probs={probs} fetchProblems={fetchProblems}/>
            <Filtering setBody={setBody} body={body} fetchProblems={fetchProblems} setProbs={setProblems} probs={probs}/>
            <ProblemList fetchProblems={fetchProblems} setProbs={setProblems} probs={probs}/>
        </>     
    );
};

export default MainProblemPoolContainer
