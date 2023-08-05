import Description from "./Description";
import Solution from "./Solution"
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

// import "../../../assets/css/interviewee/problemview/probView.css";
import "../../../assets/css/interviewee/problemview/test.css";
import InputOutput from "./InputOutput";
import SubmitCode from "./SubmitCode";
import Submission from "./Submission";
const ProblemView = (props) => {
  const [description, setDescription] = useState("");
  const [discussion, setDiscussion] = useState("");
  const [solution, setSolution] = useState("");
  const [submission, setSubmission] = useState("");
  const [tab, setTab] = useState("description");
  const { id } = useParams()

  const handleTabClick = (option) => {
    setTab(option);
  };

useEffect(()=>{

  
console.log(id)




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
          <h4 className="heading" onClick={() => handleTabClick("discussion")}>
            Discussion
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
             <Description id={id}/>
            </div>
          ) : tab === "discussion" ? (
            <div className="discussion">
              <h3>Discussion</h3>
            </div>
          ) : tab === "solution" ? (
            <div className="solution">
              <Solution id={id}/>
            </div>
          ) : (
            <div className="submission">
              <Submission id={id}/>
            </div>
          )}
        </div>
      </div>
      <div className="right">
        <SubmitCode setVerdict={setVerdict} id={id} />
        <InputOutput verdict={verdict} id={id}/>
      </div>
    </div>
  );
};

export default ProblemView;