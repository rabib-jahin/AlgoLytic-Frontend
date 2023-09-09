import Description from "./Description";
import Solution from "./Solution"
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { getUsers } from "../../../actions/interviewee/recommenedpblmList";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
// import "../../../assets/css/interviewee/problemview/probView.css";
import "../../../assets/css/interviewee/problemview/test.css";
import InputOutput from "./InputOutput";
import SubmitCode from "./SubmitCode";
import Submission from "./Submission";
import LeaderBoard from "./Leaderboard";

import ShareProblem from "./ShareProblem";


import { checkStatus } from "../../../actions/interviewee/auth";

const ProblemView = (props) => {


  const [description, setDescription] = useState("");
  const [discussion, setDiscussion] = useState("");
  const [solution, setSolution] = useState("");
  const [submission, setSubmission] = useState("");
  const [result,setResult]=useState('')
  const [tab, setTab] = useState("description");
  const [status,setStatus]=useState(null)
  const { id} = useParams()

  const [users,setUsers]=useState([])
 

    const fetchUsers=async()=>{

      var res=await getUsers()
      setUsers(res?.data)
      console.log(res?.data)
    }
   

  const handleTabClick = (option) => {
    setTab(option);
  };

  const fetchStatus=async()=>{

    var res=await checkStatus();
    
    setStatus(res.id>1)

  }
useEffect(()=>{

  
fetchStatus();
fetchUsers()



},[])







  //fetch description, discussion, solution, submission from backend
  
  const [verdict,setVerdict]=useState(null)
  const steps = [{title:'Go to geeksforgeeks.org',status:0},
  {title:'Select Practice from navbar',status:0}, {title:'Do the Problem of the Day',status:0}];

  
    const [activeStepCount, setActiveStepCount] = React.useState(0);
    const [skip, setSkip] = React.useState(new Set());
     const [serialState,setSerialState]=useState(props.serial)
  
    const optionalStep = (step) => {
        return step === 1;
    };
  
    const skipStep = (step) => {
        return skip.has(step);
    }
   
    const handleStepNext = () => {
        let newSkipped = skip;
        if (skipStep(activeStepCount)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStepCount);
        }
  
        setActiveStepCount((prevActiveStep) => prevActiveStep + 1);
        setSkip(newSkipped);
    };
  
    const handleStepBack = () => {
        setActiveStepCount((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepSkip = () => {
  
        setActiveStepCount((prevActiveStep) => prevActiveStep + 1);
        setSkip((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStepCount);
            return newSkipped;
        });
    };
    useEffect(()=>{

  
      fetchStatus();
      fetchUsers()
      
      
      
      },[serialState])
    
  
    const handleStepReset = () => {
        setActiveStepCount(0);
    };
  return (
    <div className="headerProb">


    


      <div className="left">
        {props.isTest?(
      <div>
      <hr className={'stepper-line'}/>
                        <div className={'stepper-container'}>
                            {
                               JSON.parse(window.sessionStorage.getItem("tests")).map((p,i)=>{
                                    //console.log(serialState,i)
                                    if(props.serial==i+1){
                                        return(
                                            <div className={`step-current`}>
                                                {(i+1)}
                                            </div>
                                        )
                                    }
                                    else{
                                        return(
                                            <div className={`step-pending ${p.prob.isLive===4?'step-error':(p.prob.isLive===8?'step-success':'')}`} onClick={()=>{props.setSerial(i+1);props.navigate("/test/problem/"+p.prob.problem_id);}}>
                                                {(i+1)}
                                            </div>
                                        )
                                    }
                                })
                            }{
                              props.serial=== JSON.parse(window.sessionStorage.getItem("tests")).length+1?(
                                <div className={`step-current`}>
                              Home
                            </div>

                              ): <div className={`step-pending `} onClick={()=>{props.setSerial(JSON.parse(window.sessionStorage.getItem("tests")).length+1);props.navigate("/test/"+   window.sessionStorage.getItem("test_id"));props.navigate(0)}}>
                              Home
                          </div>
                            }
                            
                        </div>
               
                        </div>):<></>}
        <div className="tabs">
         
          <h4 className="heading" onClick={() => handleTabClick("description")}>
            Description
          </h4>
          {props.isTest?(<></>):<>
          <h4 className="heading" onClick={() => handleTabClick("solution")}>
            Solution
          </h4>
          <h4 className="heading" onClick={() => handleTabClick("submission")}>
            Submission
          </h4>
          <h4 className="heading" onClick={() => handleTabClick("leaderboard")}>
              LeaderBoard
            </h4>
          
          </>}
         
         
          
        </div>
        
        <div className="show-pane">
          {tab === "description" ? (
            <div className="description">
        {props.isTest?<></>:  <ShareProblem users={users} id={id}/>}
       

             {status!==null && <Description id={id} status={status} serial={props.serial}/>}

            </div>
          ) : tab === "discussion" ? (
            <div className="discussion">
              <h3>Discussion</h3>
            </div>
          ) : tab === "solution" ? (
            <div className="solution">
              <Solution id={id} status={status}/>
            </div>
          ): tab === "leaderboard" ? (
            <div className="discussion">
              <LeaderBoard id={id}/>
            </div>
          
          
          
          ) : (
            <div className="submission">
              <Submission id={id}/>
            </div>
          )}
        </div>
      </div>
      <div className="right">
        <SubmitCode setVerdict={setVerdict} setResult={setResult} id={id}  />
        <InputOutput verdict={verdict} id={id} result={result} status={status}/>
      </div>
    </div>
  );
};

export default ProblemView;
