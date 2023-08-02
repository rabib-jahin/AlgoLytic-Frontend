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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
       
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      paddingLeft: "100px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      paddingLeft: "100px",
      color:"white"
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "#3C3939",
      color:"white"
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
      color:"white"
    },
  }));
  
  function createData(
    Status: string,
    Title: string,
    Acceptance: number,
    Difficulty: number,
    Topic: string,
  ) {
    return { Status, Title, Acceptance, Difficulty, Topic };
  }
  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon style={{color:"white"}}/> : <FirstPageIcon style={{color:"white"}} />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight style={{color:"white"}} /> : <KeyboardArrowLeft style={{color:"white"}} />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft style={{color:"white"}} /> : <KeyboardArrowRight style={{color:"white"}}  />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon  style={{color:"white"}}/> : <LastPageIcon style={{color:"white"}} />}
        </IconButton>
      </Box>
    );
  }
  
  
  const rows = [
    createData('yes', 'Two Sum', 6.0, 24, 4.0),
    createData('no', 'Add Two Integers', 9.0, 37, 4.3),
    createData('yes', 262, 16.0, 24, 6.0),
    createData('no', 305, 3.7, 67, 4.3),
    createData('yes', 356, 16.0, 49, 3.9),
    createData('no', 305, 3.7, 67, 4.3),
    createData('yes', 356, 16.0, 49, 3.9),
    createData('no', 305, 3.7, 67, 4.3),
    createData('yes', 356, 16.0, 49, 3.9),
    createData('no', 305, 3.7, 67, 4.3),
    createData('yes', 356, 16.0, 49, 3.9),
  ];
const ProblemList = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
   
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
 

     
      const redirectProb=(id)=>{

console.log(id)
window.location.href="/problem/"+id

      }
    
  useEffect(()=>{
let data={}

// props.fetchProblems(data)
// console.log(props.probs)


  },[])
   
    return (
        <>
         <TableContainer component={Paper} style={{backgroundColor:"#262626"}}>
      <Table sx={{ minWidth: 200, marginTop:"100px" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align="left">Title</StyledTableCell>
            <StyledTableCell align="left">Acceptance</StyledTableCell>
            <StyledTableCell align="left">Difficulty</StyledTableCell>
            <StyledTableCell align="left">Topic</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{cursor:"pointer"}}>

          
          {
            Object.keys(props.probs).length==0?<></>
:(rowsPerPage > 0
  ? props.probs.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  :props.probs
    

).map((row) => (
            <StyledTableRow key={row.name} align="left">
              <StyledTableCell align="left" component="th" scope="row">
                {
                    row.status==1?<DoneIcon color="primary"/>:<RemoveCircleIcon color="danger"/>
                }
            
              </StyledTableCell>
              <StyledTableCell  align="left" onClick={()=>redirectProb(row.id)}>{row.title}
                {
                    row.is_premium?<WorkspacePremiumIcon color="primary"/>:null
                }
              </StyledTableCell>
              
               
               
              <StyledTableCell align="left">{row.Acceptance}</StyledTableCell>
              <StyledTableCell align="left">{row.difficulty}</StyledTableCell>
              <StyledTableCell align="left">{row.tag}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              style={{color:"white"}}
              count={Object.keys(props.probs).length==0?"":props.probs.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
        </>     
    );
};

export default ProblemList
