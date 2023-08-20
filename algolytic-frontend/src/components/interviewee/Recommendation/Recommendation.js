import React, { useState } from "react";
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PersonalizedRecommendation from "./PersonalizedRecommendation";
import PeerRecommendation from "./PeerRecommendation";
import Button from '@mui/material/Button';

import "../../../assets/css/interviewee/userprogress/usercontainer.css";
import { getProbList } from "../../../actions/interviewee/problemList";
import { getRecommendedpblmList } from "../../../actions/interviewee/recommenedpblmList";



const Recommendation = (props) => {

    const [tab, setTab] = useState("");

    const handleTabClick = (option) => {
        setTab(option);
      };
    
    const [probs,setProbs]=useState({})
   const [body,setBody]=useState({})
    const fetchProblems=async (data)=>{

        setTab(data);
        setProbs({})
        var res=await getRecommendedpblmList()
        console.log(res)
        setProbs(res);
   
      }
      

      const setProblems=ps=>{
        console.log(ps)
        setProbs(ps)
      }

      
    return (
        <>
            <Button startIcon={<AutoGraphIcon/>} style={{ marginTop: '8px' }} variant="contained" className="dropdown-item text-green2" onClick={()=>handleTabClick("personalized")} style={{ marginLeft: "50px", marginTop: "40px" }}>
                Personalized
            </Button>
            <Button startIcon={<EmergencyShareIcon/>} style={{ marginTop: '8px' }} variant="contained" className="dropdown-item text-green2" onClick={()=>fetchProblems("peer")} style={{ marginLeft: "10px", marginTop: "40px" }}>
                Peer
            </Button>
            
            
           

            <div className="show-pane">
            
            {tab === "personalized" ? (
                <div className="personalized">
                <PersonalizedRecommendation tab="personalized"/>
                </div>
            ) : (
                <div className="peer">
                 <PeerRecommendation tab="peer" fetchProblems={fetchProblems} setProbs={setProblems} probs={probs}/>
                </div>
            )}
            </div>
            
           
        </>     
    );
};

export default  Recommendation