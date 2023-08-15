import React, { useState,useEffect } from "react";
import { getSubList} from "../../../actions/interviewee/subscription";
import './subscription.css';
import { checkStatus } from "../../../actions/interviewee/auth";
const Subscription= (props) => {
    const [data,setData]=useState([])
    const [status,setStatus]=useState({})
   
    const fetchSubs=async ()=>{
        var res=await getSubList(data)
        
       setData(res.data)
       console.log("nn",res.data)
      }
      const fetchStatus=async()=>{

const res=await checkStatus()
console.log(res)
setStatus(res)

      }
    useEffect(()=>{

 fetchSubs()
 fetchStatus()
       
      },[])
    return (
        <div >

<div class="main">
<div class="container-fluid">
      <div class="container">
        <div class="row">
            {

                data.length==0?<></>:
                data.map(sub=>(

                    <div class="col-sm-4">
                    <div class="card text-center">
                    <div>
                       <h2> {status.id===sub.id?"Active Plan":""}</h2>
                        </div>
                      <div class="title">
                        <i class="fa fa-paper-plane" aria-hidden="true"></i>
                        <h2>{sub.title}</h2>
                        
                      </div>
                      <div class="price">
                        <h4><sup>$</sup>{sub.fee.replace(/\$/g, "")}</h4>
                      </div>
                      <div class="option">
                        <ul>
                            {
                                sub.title=="Basic"?<>
                                <li><i class="fa fa-check" aria-hidden="true"></i>Only free problems are available</li>
                                <li><i class="fa fa-check" aria-hidden="true"></i>No live Support</li>
                                <li><i class="fa fa-check" aria-hidden="true"></i>Solutions  of others are not visible </li>
                                </>: sub.title=="Premium"?<>
  <li><i class="fa fa-check" aria-hidden="true"></i>Premium Problems Unlocked</li>
  <li><i class="fa fa-check" aria-hidden="true"></i>24/7 Live Support</li> <br/>  
  <li><i class="fa fa-check" aria-hidden="true"></i>All solutions are unlocked </li>
</>:(
<>
<li><i class="fa fa-check" aria-hidden="true"></i>Premium Problems Unlocked</li>
<li><i class="fa fa-check" aria-hidden="true"></i>24/7 Live Support</li> <br/>   
<li><i class="fa fa-check" aria-hidden="true"></i>All solutions are unlocked </li>
</>



                                )
                            }
                 
                        </ul>
                      </div>
                      <a href="#" style={{cursor:"pointer"}}>{status.id===sub.id && sub.id!=1?"Cancel Now":"Buy now"}</a>
                    </div>
                  </div>
            


                ))

    
            }
       
         
         
        </div>
      </div>
    </div>
    </div>
        </div>
    );
};

export default Subscription;