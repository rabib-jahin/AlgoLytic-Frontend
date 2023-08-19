import React, { useEffect, useState } from "react";
import { getSubmissions } from "../../../actions/interviewee/stats";
import CircularProgress from '@mui/material/CircularProgress';
import "../../../assets/css/interviewee/problemview/submission.css";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Editor from "@monaco-editor/react";
import Button from '@mui/material/Button';
const Submission = (props) => {
    const [data, setData] = useState([])
    const [code, setCode] = useState("")
    const [lang, setLang] = useState("cpp")
    const [dialogOpen, setDialogOpen] = useState(false)
    const fetchSubmissions = async (data) => {

        var res = await getSubmissions(data)
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
        setData(res ? res.data : [])
    }

    useEffect(() => {

        fetchSubmissions(props.id)

    }, [])


    return (
        <div className="submission">

            <div className="inner">



                {

                    data.length === 0 ? <h1>No Sumbissions</h1> : (


                        data && data.map((d, idx) => {

                            return (


                                <>
                                    {(d.verdict == "false" ? <><div style={{ display: "flex" }}><div className="err">Wrong Ans</div><div className="lang" style={{ cursor: "pointer" }} onClick={() => { setDialogOpen(true); setCode(d.solution); setLang(d.language) }} >{d.language}</div></div></> : <>
                                        <div style={{ display: "flex" }}>
                                            <div className="accepted">Accepted</div>
                                            <div style={{ cursor: "pointer" }} className="lang" onClick={() => { setDialogOpen(true); setCode(d.solution); setLang(d.language) }} >{d.language}</div></div></>)}


                                </>

                            )


                        })


                    )
                }


            </div>
            <Dialog open={dialogOpen} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">
                    Submission
                </DialogTitle>

                <DialogContent>
                    <div>


                        <div className="overlay  overflow-hidden w-full h-full shadow-4xl" style={{ marginTop: "10px", width: "500px" }}>
                            <Editor
                                height="calc(50vh - 80px)"
                                width="500px"
                                language={lang}
                                value={code}
                                 theme={"oceanic-next"}
                               
                                options={{readOnly: true}}
                                



                                defaultValue={code}
                            //   onChange={handleEditorChange}
                            />
                        </div>

                        <Button onClick={() => { setDialogOpen(false) }} startIcon={<CloseIcon />}
                            style={{ marginTop: '8px', marginBottom: '8px' }} variant="outlined">
                            Close
                        </Button>

                    </div>
                </DialogContent>
            </Dialog>

        </div>

    );
};

export default Submission