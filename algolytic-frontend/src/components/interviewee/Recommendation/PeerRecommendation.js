import React, { useEffect, useState } from "react";
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
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { getProbList } from "../../../actions/interviewee/problemList";
import { getUsers } from "../../../actions/interviewee/recommenedpblmList";

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
  
  function createData(
    from: String,
    status: string,
    title: string,
    Acceptance: number,
    difficulty: number,
    tag: string,
    is_premium: number
  ) {
    return { from, status, title, Acceptance, difficulty, tag, is_premium };
  }
  
  const rows = [
    createData('Rumi','yes', 'Two Sum', 6.0, 24, 4.0, 0),
    createData('Rumi','no', 'Add Two Integers', 9.0, 37, 4.3, 0),
    createData('Rumi','yes', 262, 16.0, 24, 6.0, 1),
    createData('Rumi','no', 305, 3.7, 67, 4.3, 1),
    // createData('yes', 356, 16.0, 49, 3.9, 1),
    // createData('no', 305, 3.7, 67, 4.3, 1),
    // createData('yes', 356, 16.0, 49, 3.9, 1),
    // createData('no', 305, 3.7, 67, 4.3, 1),
    // createData('yes', 356, 16.0, 49, 3.9, 1),
    // createData('no', 305, 3.7, 67, 4.3, 0),
    // createData('yes', 356, 16.0, 49, 3.9, 1),
  ];
  
  const PeerRecommendation = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };
  
    const [problems,setProblems]=useState({})
   
  
    useEffect(()=>{
      setProblems(props.probs)
    },[props.probs])

  
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
  
  
    const redirectProb = (id) => {
  
      console.log(id)
      window.location.href = "/problem/" + id
  
    }
  
    useEffect(() => {
      // let data = {}
  
      // props.fetchProblems()
      // console.log(props.probs)
      // console.log("rows", rows)
  
    }, [])
  
    return (
      <>
        <TableContainer component={Paper} style={{ backgroundColor: "#262626" }}>
          <Table sx={{ minWidth: 200, marginTop: "100px" }} aria-label="customized table">
            <TableHead>
              <TableRow>
              <StyledTableCell>From</StyledTableCell>
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
                    
                    <StyledTableRow key={row.peer_id} align="left">

                    <StyledTableCell align="left">{row.from_name}</StyledTableCell>

                    <StyledTableCell align="left" component="th" scope="row">
                      
                          <DoneIcon color="primary"/>
                      
                  
                    </StyledTableCell>
                    
       
                    <StyledTableCell  align="left" onClick={()=>redirectProb(row.problem_id)}>{row.problem.title}
                      {
                          row.problem.isPremium?<WorkspacePremiumIcon color="primary"/>:null
                      }
                    </StyledTableCell>
                    
                     
                     
                    <StyledTableCell align="left">{row.problem.acceptance}</StyledTableCell>
                    <StyledTableCell align="left">{row.problem.difficulty}</StyledTableCell>
                    <StyledTableCell align="left">{row.problem.tag}</StyledTableCell>
                  </StyledTableRow>
                  ))}
            </TableBody>
           
          </Table>
        </TableContainer>
      </>
    );
  };
  
  export default PeerRecommendation