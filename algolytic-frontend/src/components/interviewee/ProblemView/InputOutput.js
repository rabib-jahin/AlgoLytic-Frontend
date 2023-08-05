import React, { useState,useEffect } from "react";
import { getProbData } from "../../../actions/interviewee/probView";

import "../../../assets/css/interviewee/problemview/inputoutput.css";

 

const InputOutput = (props) => {
    const [data,setData]=useState([])
const fetchProblem=async (data)=>{
    var res=await getProbData(data)
    
   setData(res.data)
   console.log(res)
  }
useEffect(()=>{

fetchProblem(props.id)
   
  },[])

  const [verdict,setVerdict]=useState(props.verdict)

  useEffect(()=>{
    setVerdict(props.verdict)
  },[props.verdict])

    return (
        <div className="in-out" style={{marginTop:"10px"}}>
            <div className="input">

                <h3 className="in">Sample Input</h3>
                <h4 className="in">{Object.keys(data).length==0?"":data.data_json?.input}</h4>
                
            </div>
            <div className="output">

                <h3 className="out">Sample Output</h3>
                <h4 className="out">{Object.keys(data).length==0?"":data.data_json?.output}</h4>
                {
                    verdict===null?(
                        <></>
                    ):(
                        verdict?(
                            <h4 className="green">Accepted!!!</h4>

                        ):(
                            <h4 className="red">Rejected!</h4>

                        )
                    )
                }
            </div>
        </div>
    );
};

export default InputOutput