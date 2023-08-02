import React, { useState,useEffect } from "react";
import { getProbData } from "../../../actions/interviewee/probView";



const Description= (props) => {
    const [data,setData]=useState([])
   
    const fetchProblems=async (data)=>{
        var res=await getProbData(data)
        
       setData(res.data)
       console.log(res)
      }
    useEffect(()=>{

 fetchProblems(props.id)
       
      },[])
    return (
        <div className="description" style={{color:"white",marginLeft:"20px"}}>
  <div style={{display:"flex"}}> <h3>{data.length==0?"":data[0].title}</h3> <h4 style={{color:"green",marginLeft:"20px"}}>{data.length==0?"":data[0].tag}</h4></div>
<div>  
{data.length==0?"":data[0].data_json.statement}
</div> 

        </div>
    );
};

export default Description;