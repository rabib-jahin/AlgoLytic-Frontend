import React, { useState ,useEffect} from "react";

import "../../../assets/css/interviewee/problemview/solution.css";
import { getProbData } from "../../../actions/interviewee/probView";

const Solution = (props) => {
    const[data,setData]=useState([])
    const fetchProblem=async (data)=>{
        var res=await getProbData(data)
        
       setData(res.data)
       console.log(res)
      }
    useEffect(()=>{
    
    fetchProblem(props.id)
       
      },[])
    return (
        <div className="solution">
         <div className="first">


        {
            Object.keys(data).length==0?"":data.data_json?.solution
        }

         </div>
        

        </div>
    );
};

export default Solution