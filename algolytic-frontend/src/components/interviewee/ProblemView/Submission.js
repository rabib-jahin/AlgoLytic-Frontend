import React, { useEffect, useState } from "react";
import { getSubmissions } from "../../../actions/interviewee/stats";
import CircularProgress from '@mui/material/CircularProgress';
import "../../../assets/css/interviewee/problemview/submission.css";

const Submission = (props) => {
    const [data, setData] = useState([])
    const fetchSubmissions = async (data) => {

        //   var res=await getSubmissions(data)
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

        setData(s)
    }

    useEffect(() => {

        fetchSubmissions({ user_id: 1, problem_id: props.id })

    }, [])


    return (
        <div className="submission">

            <div className="inner">



                {

                    data.length === 0 ? <CircularProgress color="success" style={{ marginLeft: "50%" }} /> : (


                        data && data.map((d, idx) => {

                            return (


                                <>
                                    {(!d.verdict ? <><div style={{ display: "flex" }}><div className="err">Wrong Ans</div><div className="lang">{d.language}</div></div></> : <>
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