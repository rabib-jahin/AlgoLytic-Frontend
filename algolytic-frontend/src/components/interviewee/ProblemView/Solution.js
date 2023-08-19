import React, { useState ,useEffect} from "react";

import "../../../assets/css/interviewee/problemview/solution.css";
import { getProbData } from "../../../actions/interviewee/probView";
import { getSolutions } from "../../../actions/interviewee/solution";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Editor from "@monaco-editor/react";
import Button from '@mui/material/Button';
import { checkStatus } from "../../../actions/interviewee/auth";

const Solution = (props) => {
    const[data,setData]=useState([])
    const [status,setStatus]=useState(false)
    const[dialogOpen,setDialogOpen]=useState(false)
      const [code,setCode]=useState("")
    const [lang,setLang]=useState("cpp")

    const fetchStatus=async()=>{

        var res=await checkStatus();
        
    setStatus(res.status)
    
      }
   
    const fetchSolutions=async (id)=>{
        var res=await getSolutions(id)
        
       setData(res?res.data:[])
   
      }
    useEffect(()=>{
        fetchStatus()
        fetchSolutions(props.id)
   
    
       
      },[])
    return (
        <div className="solution">
            {data.length===0?<> No solutions found</>:data[0].problem.isPremium==1 && status==false?<>Subscribe to view solutions!!</>:
(data && data.map(d=>(

<div class="card-1" onClick={()=>{setDialogOpen(true);setCode(d.solution);setLang(d.language)}} >
<div class="lang2">
    {d.language}
</div>
</div>


))


            )}
    
    <Dialog open={dialogOpen} aria-labelledby="form-dialog-title">

<DialogTitle id="form-dialog-title">
Solution
    </DialogTitle>

      <DialogContent>
<div>


<div className="overlay  overflow-hidden w-full h-full shadow-4xl" style={{marginTop:"10px",width:"500px"}}>
<Editor
height="calc(50vh - 80px)"
width="500px"
language={lang}
value={code}
theme={"vs-dark"}



defaultValue={code}

/>
</div>

<Button  onClick={()=>{setDialogOpen(false)}} startIcon={<CloseIcon/>}
    style={{marginTop: '8px', marginBottom: '8px'}} variant="outlined">
Close
</Button>

</div>
      </DialogContent>
    </Dialog>
        

        </div>
    );
};

export default Solution