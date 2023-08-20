import React, { useState, useEffect } from "react";
import { getSubList, subscribe } from "../../../actions/interviewee/subscription";
import './subscription.css';
import { checkAuth, checkStatus } from "../../../actions/interviewee/auth";
import { CircularProgress, LinearProgress } from "@mui/material";
import { showToast } from "../../../App";
const Subscription = (props) => {


  const [pending, setPending] = useState(false)

  const [data, setData] = useState([])
  const [status, setStatus] = useState({})

  const [loading, setLoading] = useState(true)

  const fetchSubs = async () => {
    var res = await getSubList(data)
    console.log(res.data)
    setData(res.data)
  }
  const fetchStatus = async () => {
    const res = await checkStatus()
    setStatus(res)
  }

  const initialize = async () => {
    try{
      await fetchSubs()
      await fetchStatus()
      setLoading(false)
    }catch(err){
      //showToast("Error Occurred")
      setLoading(false)
    }
    
  }

  useEffect(() => {
    initialize()
  }, [])

  const getPlan = async id => {
    if(!checkAuth()){
      showToast('You need to login to subscribe')
    }
    else{
      setPending(true)
      var res = await subscribe(id)
      //setPending(false)
      window.location = res.data
      console.log(res)
    }
  }


  return (
    <>
      {
        loading ? (
          <div style={{ position:'absolute',left:'0',top:'0',height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          <div >
            {pending && <LinearProgress/>}
            <div>
              <div class="container-fluid">
                <div class="container">
                  <div class="row">
                    {
                      data.length == 0 ? <></> :
                        data.map(sub => (

                          <div class="col-sm-4">
                            <div class="card text-center">
                              <div>
                                <h2> {status.id === sub.id ? "Active Plan" : ""}</h2>
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
                                    sub.title == "Basic" ? <>
                                      <li><i class="fa fa-check" aria-hidden="true"></i>Only free problems are available</li>
                                      <li><i class="fa fa-check" aria-hidden="true"></i>No live Support</li>
                                      <li><i class="fa fa-check" aria-hidden="true"></i>Solutions  of others are not visible </li>
                                    </> : sub.title == "Premium" ? <>
                                      <li><i class="fa fa-check" aria-hidden="true"></i>Premium Problems Unlocked</li>
                                      <li><i class="fa fa-check" aria-hidden="true"></i>24/7 Live Support</li> <br />
                                      <li><i class="fa fa-check" aria-hidden="true"></i>All solutions are unlocked </li>
                                    </> : (
                                      <>
                                        <li><i class="fa fa-check" aria-hidden="true"></i>Premium Problems Unlocked</li>
                                        <li><i class="fa fa-check" aria-hidden="true"></i>24/7 Live Support</li> <br />
                                        <li><i class="fa fa-check" aria-hidden="true"></i>All solutions are unlocked </li>
                                      </>



                                    )
                                  }

                                </ul>
                              </div>
                              {status.id !== sub.id && !pending && <a style={{ cursor: "pointer" }} onClick={() => {
                                if (!pending) getPlan(sub.id)
                              }}>{pending ? <CircularProgress/> : 'Get Plan'}</a>}
                            </div>
                          </div>
                        ))


                    }



                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Subscription;