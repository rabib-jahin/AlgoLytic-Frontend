import React, { useState } from "react";
import PersonalizedRecommendation from "./PersonalizedRecommendation";
import PeerRecommendation from "./PeerRecommendation";
import Button from '@mui/material/Button';

import "../../../assets/css/interviewee/userprogress/usercontainer.css";
import { getProbList } from "../../../actions/interviewee/problemList";
import { getRecommendedpblmList } from "../../../actions/interviewee/recommenedpblmList";

import { getRec} from "../../../actions/interviewee/recommenedpblmList";


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
      const fetchSystemGenerated=async (data)=>{

        setTab(data);
        setProbs({})
        var res=await getRec()
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
            <Button style={{ marginTop: '8px' }} variant="outlined" className="dropdown-item text-green2" onClick={()=>fetchProblems("peer")} style={{ marginLeft: "50px", height: "60px", marginTop: "40px" }}>
                Peer
            </Button>
            
            
           

            <div className="show-pane">
            
            {tab === "personalized" ? (
                <div className="personalized">
                <PersonalizedRecommendation fetchProblems={fetchSystemGenerated} setProbs={setProblems} probs={probs}/>
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