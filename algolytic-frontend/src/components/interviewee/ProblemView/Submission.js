import React, { useEffect, useState } from "react";
import { getSubmissions } from "../../../actions/interviewee/stats";
import CircularProgress from '@mui/material/CircularProgress';
import "../../../assets/css/interviewee/problemview/submission.css";

const Submission = (props) => {
    const [data, setData] = useState([])
    const fetchSubmissions = async (data) => {

          var res=await getSubmissions(data)
        var s = [

            {

                "language": "cpp",
                "verdict": true
            },

            {

                "language": "java",
                "verdict": false
            },

            {

                "language": "cpp",
                "verdict": false
            }

        ]
console.log(res)
        setData(res.data)
    }

    useEffect(() => {

        fetchSubmissions( props.id )

    }, [])


    return (
        <div className="submission">

            <div className="inner">



                {

                    data.length === 0 ? <h1>No Sumbissions</h1>  : (


                        data && data.map((d, idx) => {

                            return (


                                <>
                                    {(d.verdict=="false" ? <><div style={{ display: "flex" }}><div className="err">Wrong Ans</div><div className="lang">{d.language}</div></div></> : <>
                                        <div style={{ display: "flex" }}>
                                            <div className="accepted">Accepted</div>
                                            <div className="lang">{d.language}</div></div></>)}


                                </>

                            )


                        })


                    )
                }


            </div>
            <div style={{ display: "flex" }}>



            </div>
        </div>

    );
};

export default Submission