import React, { useEffect, useState } from "react";
import { getSubmissions } from "../../../actions/interviewee/stats";
import CircularProgress from '@mui/material/CircularProgress';
import "../../../assets/css/interviewee/problemview/submission.css";

const Submission = (props) => {
    const [data,setData]=useState([])
    const fetchSubmissions=async (data)=>{

        var res=await getSubmissions(data)
        console.log(res)
        setData(res.data)
      }

      useEffect(()=>{

fetchSubmissions({user_id:1,problem_id:props.id})

      },[])
    
    
    return (
        <div className="submission">
        
       <div className="inner">



    {

        data.length===0?<CircularProgress color="success" style={{marginLeft:"50%"}}/>:(


data &&data.map((d,idx)=>{

return (


<>
{idx<=4?(!d.verdict ?<><div style={{display:"flex"}}><div className="err">Wrong Ans</div><div className="lang">C++</div></div></>:<>
<div style={{display:"flex"}}>
<div className="accepted">Accepted !</div>
<div className="lang">C++</div></div></>):null}


</>

)


})


        )
    }


</div>
<div style={{display:"flex"}}>



</div>
       </div>

    );
};

export default Submission