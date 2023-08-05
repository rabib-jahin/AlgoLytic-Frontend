import React, { useState,useEffect } from "react";
import { getProbData } from "../../../actions/interviewee/probView";



const Description= (props) => {
    const [data,setData]=useState([])
   
    const fetchProblems=async (data)=>{
        var res=await getProbData(data)
        
       setData(res.data)
       console.log("nn",res.data)
      }
    useEffect(()=>{

 fetchProblems(props.id)
       
      },[])
    return (
        <div className="description" style={{color:"white",marginLeft:"20px"}}>
  <div style={{display:"flex"}}> <h3>{Object.keys(data).length==0?"":data?.title}</h3> <h4 style={{color:"green",marginLeft:"20px"}}>{Object.keys(data).length==0?"":data?.tag}</h4></div>
<div>  
{Object.keys(data).length==0?"":data?.data_json?.description}
</div> 

        </div>
    );
};

export default Description;