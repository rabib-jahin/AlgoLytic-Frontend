import React, { useEffect, useState, useRef } from "react";
import { styled } from '@mui/material/styles';
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
import { getTestProblems} from "../../../actions/interviewee/mocktest";

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

  const Ref = useRef(null);
 
  // The state for our timer
  const [timer, setTimer] = useState('00:00:00');
  const [submitted, setSubmitted] = useState(0);
  const [marks, setMarks] = useState(20);

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
      }
  }

  const clearTimer = (e) => {

      // If you adjust it you should also need to
      // adjust the Endtime formula we are about
      // to code next   
      setTimer('00:02:10');

      // If you try to remove this line the
      // updating of timer Variable will be
      // after 1000ms or 1sec
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
          startTimer(e);
      }, 1000)
      Ref.current = id;
  }

  const getDeadTime = () => {
      let deadline = new Date();

      // This is where you need to adjust if
      // you entend to add more time
      deadline.setSeconds(deadline.getSeconds() + 130);
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
  const onClickSubmit = () => {
      // clearTimer(getDeadTime());
      setSubmitted(1);
  }

  // problem codes

  const [problems,setProblems]=useState({})
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const fetchTestProblems=async (data)=>{
    // setProbs({})
    var res=await getRec()
    setProblems(res);

  }

  const redirectProb = (id) => {
  
      console.log(id)
      window.location.href = "/problem/" + id
  
    }


  useEffect(()=>{
  fetchTestProblems()

  },[])
  return (
    <div>
        <div class="submit">
        <Button variant="contained" color="success" onClick={onClickSubmit} >
          Submit Test
        </Button>
        </div>
      <div class="box">
        <div class="ring">
        <div class="fraction">
          
        {submitted === 1 ? (
        <>
          <div className="numerator">{marks}</div>
          <hr className="division-line" />
          <div className="denominator">40</div>
        </>
      ) : (
        <h2>{timer}</h2>
      )}
        
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
                    ? problems.data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : problems
  
  
                  )?.map((row) => (
                    <StyledTableRow key={row.title} align="left">
                    <StyledTableCell align="left" component="th" scope="row">
                      
                          <DoneIcon color="primary"/>
                      
                  
                    </StyledTableCell>
                    <StyledTableCell  align="left" onClick={()=>redirectProb(row.problem_id)}>{row.title}
                      {
                          row.isPremium?<WorkspacePremiumIcon color="primary"/>:null
                      }
                    </StyledTableCell>
                    
                     
                     
                    <StyledTableCell align="left">{row.acceptance}</StyledTableCell>
                    <StyledTableCell align="left">{row.difficulty}</StyledTableCell>
                    <StyledTableCell align="left">{row.tag}</StyledTableCell>
                  </StyledTableRow>
                  ))}
            </TableBody>
           
          </Table>
        </TableContainer>
      </div>
  );
};

export default SingleTest
