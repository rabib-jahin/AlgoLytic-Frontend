import { Button, CircularProgress } from "@mui/material";
import React, { useState,useEffect } from "react";
import { submitCode } from "../../../actions/interviewee/submit";

import "../../../assets/css/interviewee/problemview/submitcode.css";
import CodeEditorWindow from "./CodeEditorWindow";



import { defineTheme } from "./defineTheme";

const SubmitCode = (props) => {
    const [text,setText]=useState("")
    

    const defaultCode=`#include<iostream>
using namespace std;

int main(){
    //your code here;
    
    return 0;
}`

    const [code, setCode] = useState(defaultCode);
    const [theme, setTheme] = useState("cobalt");

    const onChange = (action, data) => {
        switch (action) {
          case "code": {
            setCode(data);
            break;
          }
          default: {
            console.warn("case not handled!", action, data);
          }
        }
      };


      const [loading,setLoading]=useState(false)
      const setVerdict=props.setVerdict

      const submitProblem=async (data)=>{
        let body={

            problem_id:parseInt(props.id),
            user_id:1,
            code:data,

        }
        console.log(body)
        setLoading(true)
        setVerdict(null)
       
        var res=await submitCode(body)
        console.log(res)
        setVerdict(res.verdict)
        setLoading(false)
      }

    const submit=()=>{


submitProblem(code);

    }

      useEffect(() => {
        defineTheme("oceanic-next").then((_) =>
          setTheme({ value: "oceanic-next", label: "Oceanic Next" })
        );
      }, []);

    return (
        <div className="submit-code">
            {/* <textarea className="text" onChange={(e)=>setText(e.target.value)}></textarea> */}
            <CodeEditorWindow 
                code={code}
                onChange={onChange}
                language={'cpp'}
                theme={theme.value}
            />
            <div>
                {
                    loading?(
                        <CircularProgress style={{marginLeft:"50%"}}/>
                    ):(
                        <Button style={{marginLeft:"50%"}} color="primary" onClick={submit}>Submit</Button>
                    )
                }



            </div>
        </div>
    );
};

export default SubmitCode