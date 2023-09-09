 import Description from "./Description";
  import Solution from "./Solution"
  import React, { useEffect, useState } from "react";
  import { useParams } from 'react-router-dom';
  import { Link } from "react-router-dom";
  import { getUsers } from "../../../actions/interviewee/recommenedpblmList";
 
  // import "../../../assets/css/interviewee/problemview/probView.css";
  import "../../../assets/css/interviewee/problemview/test.css";
  import InputOutput from "./InputOutput";
  import SubmitCode from "./SubmitCode";
  import Submission from "./Submission";
 
  import ShareProblem from "./ShareProblem";
 
 
  import { checkStatus } from "../../../actions/interviewee/auth";
  import LeaderBoard from "./Leaderboard";
 
  const ProblemView = (props) => {
    const [description, setDescription] = useState("");
    const [discussion, setDiscussion] = useState("");
    const [solution, setSolution] = useState("");
    const [submission, setSubmission] = useState("");
    const [result,setResult]=useState('')
    const [tab, setTab] = useState("description");
    const [status,setStatus]=useState(null)
    const { id } = useParams()
 
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
 
  useEffect(()=>{
 
 
  fetchStatus();
  fetchUsers()
 
 
 
  },[])
 
 
 
 
 
    //fetch description, discussion, solution, submission from backend
 
    const [verdict,setVerdict]=useState(null)
 
    return (
      <div className="headerProb">
        <div className="left">
          <div className="tabs">
            <h4 className="heading" onClick={() => handleTabClick("description")}>
              Description
            </h4>
            <h4 className="heading" onClick={() => handleTabClick("leaderboard")}>
              LeaderBoard
            </h4>
            <h4 className="heading" onClick={() => handleTabClick("solution")}>
              Solution
            </h4>
            <h4 className="heading" onClick={() => handleTabClick("submission")}>
              Submission
            </h4>
          </div>
          <div className="show-pane">
            {tab === "description" ? (
              <div className="description">
 
              <ShareProblem users={users} id={id}/>
 
              {status!==null && <Description id={id} status={status}/>}
 
              </div>
            ) : tab === "leaderboard" ? (
              <div className="discussion">
                <LeaderBoard id={id}/>
              </div>
            ) : tab === "solution" ? (
              <div className="solution">
                <Solution id={id} status={status}/>
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