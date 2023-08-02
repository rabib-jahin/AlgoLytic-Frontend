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
            data.length===0?"":data[0].data_json.solution
        }

         </div>
        

        </div>
    );
};

export default Solution