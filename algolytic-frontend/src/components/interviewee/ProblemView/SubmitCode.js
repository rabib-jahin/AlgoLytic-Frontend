import { Button, CircularProgress } from "@mui/material";
import React, { useState,useEffect } from "react";
import { submitCode } from "../../../actions/interviewee/submit";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import "../../../assets/css/interviewee/problemview/submitcode.css";
import CodeEditorWindow from "./CodeEditorWindow";



import { defineTheme } from "./defineTheme";
import { checkAuth } from "../../../actions/interviewee/auth";
import { showToast } from "../../../App";



const SubmitCode = (props) => {
    const [text,setText]=useState("")

    const defaultCode={
cpp:`#include<iostream>
using namespace std;

int main(){
    //your code here;
    
    return 0;
}`,
java:`// Java IDE for Algolytic
// Use this editor to write, compile and run your Java code online

class Main {
    public static void main(String[] args) {
        //System.out.println("Hello, World!");
    }
}`,
javascript:`console.log('Hello World')`,
python:`print('hello world')`
}

    const [code, setCode] = useState(defaultCode['cpp']);
    const [theme, setTheme] = useState("cobalt");
    const [language, setLanguage] = React.useState('cpp');

    useEffect(()=>{
      console.log(code)
    },[code])

    const handleChange = (event: SelectChangeEvent) => {
      setLanguage(event.target.value);
      setCode(defaultCode[event.target.value])
    };
  

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

      const compilerToIdeMapping={
        cpp:'cpp',
        java:'java',
        javascript:'nodejs',
        python:'python3'
      }

      const submitProblem=async (data)=>{
        if(checkAuth()){
          let body={

            problem_id:parseInt(props.id),
            user_id:1,
            code:data,
            lang:compilerToIdeMapping[language]

          }
          console.log(body)
          setLoading(true)
          setVerdict(null)
        
          var res=await submitCode(body)
          setVerdict(res.verdict)
          if(!res.verdict)
            showToast(res.message)
          setLoading(false)
        }else{
          showToast("You need to login to submit")
        }
        
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
                key={language}
                onChange={onChange}
                language={language}
                theme={theme.value}
            />
            <div>
                {
                    loading?(
                        <CircularProgress style={{marginLeft:"10%"}}/>
                    ):(
                       
                      <div style={{display:"flex"}}>
                      <Button style={{marginLeft:"10%"}} color="primary" onClick={submit}>Submit</Button>
            

        <FormControl sx={{ m: 1, minWidth: 80 ,color:"white"}} style={{marginLeft:"30%"}}>
        <InputLabel id="demo-simple-select-autowidth-label" sx={{ color: "white" }}>Language</InputLabel>
        <Select
          sx={{ color: "white" }}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={language}
          onChange={handleChange}
          autoWidth
          label="Language"
        >
          <MenuItem value={'cpp'}>c++</MenuItem>
          <MenuItem value={'java'}>java</MenuItem>
          <MenuItem value={'javascript'}>javascript</MenuItem>
          <MenuItem value={'python'}>python</MenuItem>
        </Select>
      </FormControl>

                  </div>
                    )
                }



            </div>
        </div>
    );
};

export default SubmitCode