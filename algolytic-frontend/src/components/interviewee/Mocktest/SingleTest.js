import React, { useEffect, useState, useRef } from "react";
import { styled } from '@mui/material/styles';
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Done';
import "../../../assets/css/interviewee/problempool/userproblemstat.css";
import { Button } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { getSubmissionStats } from "../../../actions/interviewee/stats";
import { getRec} from "../../../actions/interviewee/recommenedpblmList";
import { getTestProblems, submitTest} from "../../../actions/interviewee/mocktest";
import { useParams } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {

    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    paddingLeft: "100px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingLeft: "100px",
    color: "white"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#3C3939",
    color: "white"
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
    color: "white"
  },
}));

const SingleTest= (props) => {

  // timer codes
  const {id}=useParams()

  const Ref = useRef(null);
 
  // The state for our timer
  const [timer, setTimer] = useState('00:00:00');
  const [submitted, setSubmitted] = useState(0);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [data, setData] = useState({});

  const getTimeRemaining = (e) => {
      const total = Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / 1000 / 60 / 60) % 24);
      return {
          total, hours, minutes, seconds
      };
  }

  const startTimer = (e) => {
      let { total, hours, minutes, seconds }
                  = getTimeRemaining(e);
      if (total >= 0) {

          // update the timer
          // check if less than 10 then we need to
          // add '0' at the beginning of the variable
          setTimer(
              (hours > 9 ? hours : '0' + hours) + ':' +
              (minutes > 9 ? minutes : '0' + minutes) + ':'
              + (seconds > 9 ? seconds : '0' + seconds)
          )

          localStorage.setItem("time", (hours > 9 ? hours : '0' + hours) + ':' +
          (minutes > 9 ? minutes : '0' + minutes) + ':'
          + (seconds > 9 ? seconds : '0' + seconds))
      }else{
        const functionCalledFlag = localStorage.getItem('functionCalledFlag');
        if(functionCalledFlag==='false'){
          onClickSubmit()
          localStorage.setItem('functionCalledFlag','true')
        }
      }
  }

const formatTime=(seconds)=> {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(
    minutes
  ).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  return formattedTime;
}
  const clearTimer = (e) => {

      // If you adjust it you should also need to
      // adjust the Endtime formula we are about
      // to code next   
   if(localStorage.getItem("time")!='null'){
    setTimer(localStorage.getItem("time"))
   }
    else  setTimer('20:00:00');

      // If you try to remove this line the
      // updating of timer Variable will be
      // after 1000ms or 1sec
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
          startTimer(e);
          
      }, 1000)
      Ref.current = id;
  }
  const timeStringToSeconds=(timeString)=> {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
  }
  
  const getDeadTime = () => {
      let deadline = new Date();

      // This is where you need to adjust if
      // you entend to add more time
      if(localStorage.getItem("time")!='null'){

        deadline.setSeconds(deadline.getSeconds() +timeStringToSeconds(localStorage.getItem("time")) );
      }else
      deadline.setSeconds(deadline.getSeconds() + 1200);
      
      return deadline;
  }

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
     clearTimer(getDeadTime());
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickSubmit = async() => {
      // clearTimer(getDeadTime());
      setLoader(true)
      setSubmitted(1);
      var obj={id:id}
      var res=await submitTest(obj)
      setData(res.data)
      setLoader(false)
      window.location.reload();

      //  window.sessionStorage.setItem("tests",JSON.stringify([]))
      //    window.sessionStorage.setItem("test_id",null)
  }

  // problem codes

  const [problems,setProblems]=useState({})
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const fetchTestProblems=async (data)=>{
    // setProbs({})
    setLoader2(true)
    var res=await getTestProblems(id)

    setProblems(res.data);
    let serial=1;
    let d=[]
    let obj={}
    console.log(res.data)
    setLoader2(false)
    
    res.data.problems&&res.data.problems.forEach(r=>{

obj=r;
obj["serial"]=serial;
serial+=1

d.push(obj)
})
console.log(d)
    window.sessionStorage.setItem("tests",JSON.stringify(d))
    window.sessionStorage.setItem("test_id",id)
    console.log(window.sessionStorage.getItem("tests"))

  }

  const redirectProb = (id) => {
  
      console.log(id)
      window.location.href = "/test/problem/" + id
  
    }


  useEffect(()=>{
  fetchTestProblems()

  },[])
  return (
    <div>
      {Object.keys(problems).length != 0 && problems.marks==null && submitted==0?
      (<>
      {
        loader?(<Button variant="contained" color="success" style={{margin:"20px",marginLeft:"46%"}} onClick={onClickSubmit} >
        <CircularProgress  />
      </Button>):(<Button variant="contained" color="success" style={{margin:"20px",marginLeft:"46%"}} onClick={onClickSubmit} >
        Submit Test
      </Button>)
        }</>):<></>
       
        }
        <div class="submit">
       
        </div>
      <div class="box">
        <div class="ring">
        <div class="fraction">

          {loader2?<CircularProgress/>
          
        
        :(

          Object.keys(problems).length !=0  && problems.marks!=null || submitted==1 ? (
            <>
              <div className="numerator">{Object.keys(problems).length == 0 ?<></>:problems.marks}</div>
              <hr className="division-line" />
              <div className="denominator"> {Object.keys(problems).length == 0 ? <></>:problems.problems.length*10}</div>
            </>
          ) : (<>
            <h2>{timer}</h2>
    
    
       </>
    
            
          )
        )
        }
          
        
        
        </div>
        
        </div>
        <div class="text-container">
        <div class="text-green">
          <pre>Solved : {Object.keys(problems).length == 0 ? <></>:problems.problems.filter(p=>p.state=="solved").length}</pre>
        </div>
        <div class="text-yellow">
          <pre>Unsolved:  {Object.keys(problems).length == 0 ? <></>:problems.problems.filter(p=>p.state=="unsolved").length}</pre>
        </div>
    
      </div>
 
      </div>
    
     
    
    {/* <button onClick={onClickReset}>Reset</button> */}

        <TableContainer component={Paper} style={{ backgroundColor: "#262626" }}>
          <Table sx={{ minWidth: 200, marginTop: "100px" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Acceptance</StyledTableCell>
                <StyledTableCell align="left">Difficulty</StyledTableCell>
                <StyledTableCell align="left">Topic</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ cursor: "pointer" }}>
  
  
              {
                Object.keys(problems).length == 0 ? <></>
  
  
                  : (rowsPerPage > 0
                    ? problems.problems?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : problems.problems
  
  
                  )?.map((row) => (
                    <StyledTableRow key={row.title} align="left">

                      {row.state==="solved"?<StyledTableCell align="left" component="th" scope="row">
                      
                      <DoneIcon color="primary"/>
                  
              
                </StyledTableCell>:(<StyledTableCell align="left" component="th" scope="row">
                      
                      <RemoveCircleIcon color="red"/>
                  
              
                </StyledTableCell>)}
                    
                    <StyledTableCell  align="left" onClick={()=>redirectProb(row.prob.problem_id)}>{row.prob.title}
                      {
                          row.prob.IconButtonisPremium?<WorkspacePremiumIcon color="primary"/>:null
                      }
                    </StyledTableCell>
                    
                     
                     
                    <StyledTableCell align="left">{row.prob.acceptance}</StyledTableCell>
                    <StyledTableCell align="left">{row.prob.difficulty}</StyledTableCell>
                    <StyledTableCell align="left">{row.prob.tag}</StyledTableCell>
                  </StyledTableRow>
                  ))}
            </TableBody>
           
          </Table>
        </TableContainer>
      </div>
  );
};

export default SingleTest
