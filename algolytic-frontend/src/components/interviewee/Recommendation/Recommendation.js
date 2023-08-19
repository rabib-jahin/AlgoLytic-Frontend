import React, { useState } from "react";
import PersonalizedRecommendation from "./PersonalizedRecommendation";
import PeerRecommendation from "./PeerRecommendation";
import Button from '@mui/material/Button';

import "../../../assets/css/interviewee/userprogress/usercontainer.css";
import { getProbList } from "../../../actions/interviewee/problemList";



const Recommendation = (props) => {

    const [tab, setTab] = useState("personalized");

    const handleTabClick = (option) => {
        setTab(option);
      };
    
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
            <Button style={{ marginTop: '8px' }} variant="outlined" className="dropdown-item text-green2" onClick={()=>handleTabClick("personalized")} style={{ marginLeft: "50px", height: "60px", marginTop: "40px" }}>
                Personalized
            </Button>
            <Button style={{ marginTop: '8px' }} variant="outlined" className="dropdown-item text-green2" onClick={()=>handleTabClick("peer")} style={{ marginLeft: "50px", height: "60px", marginTop: "40px" }}>
                Peer
            </Button>
            
            
           

            <div className="show-pane">
            
            {tab === "personalized" ? (
                <div className="personalized">
                <PersonalizedRecommendation fetchProblems={fetchProblems} setProbs={setProblems} probs={probs}/>
                </div>
            ) : (
                <div className="peer">
                 <PeerRecommendation fetchProblems={fetchProblems} setProbs={setProblems} probs={probs}/>
                </div>
            )}
            </div>
            
           
        </>     
    );
};

export default  Recommendation