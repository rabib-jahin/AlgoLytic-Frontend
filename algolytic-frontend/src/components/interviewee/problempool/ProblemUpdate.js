import React, { useState,useEffect,useRef } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { createProb, updateProb } from "../../../actions/interviewee/problemList";
import { showToast } from "../../../App";
import "./create.css"
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { Link, useLocation } from "react-router-dom";
import { checkAdmin, checkStatus } from "../../../actions/interviewee/auth";
const ProblemUpdate = (props) => {

    const location=useLocation();
    const state=location.state

  const [data,setData]=useState({})
  const [progress, setProgress] = React.useState(0);
  const [isPremium,setIsPremium]=useState(state.isPremium)
  const [isLive,setIsLive]=useState(state.isLive)
  const [status,setStatus]=useState("")

  const titleRef=useRef();
  const tagRef=useRef();
  const descRef=useRef();
  const inRef=useRef();
  const outRef=useRef();
  const minRef=useRef();
  const moutRef=useRef();
  const diffRef=useRef();
  const logoRef=useRef();
  const ratingRef=useRef();
 

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const fetchStatus=async()=>{

    const res=await checkAdmin()
    console.log(res)
    setStatus(res)
    
          }
        useEffect(()=>{
    
  
     fetchStatus()
           
          },[])
const handleChange=()=>{


setIsLive(!isLive)
}
const handleChangePremium=()=>{

    setIsPremium(!isPremium)
}
const handleClick=async()=>{


let obj={
    title:titleRef.current.value,
    logo:logoRef.current.value,
    difficulty:diffRef.current.value,
    tag:tagRef.current.value,
    rating:ratingRef.current.value,
  
    isLive:isLive?1:0,
    isPremium:isPremium?1:0,
    data_json:{

        description:descRef.current.value,
        input:inRef.current.value,
        output:outRef.current.value,
        "match-input":minRef.current.value,
        "match-output":moutRef.current.value,
    }






}
console.log(obj)

var res=await updateProb(obj,state.problem_id)
console.log(res);
if(res.success){

    showToast("Problem Successfully Created")
}else{
    showToast("Something went wrong.") 
}
}
  const fetchStats=async ()=>{
    // var res=await getSubmissionStats()
    // console.log(res)
    // setData(res?res.data:{})
  }

//   useEffect(()=>{
//   //props.fetchProblems({})
// console.log(props.probs)

// fetchStats()
// console.log(data)
// const timer = setInterval(() => {
//   setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
// }, 50);


//   },[])
  return (
    <>
    { status?
    (
    <Box sx={{ width: '80%',marginTop:"50px",marginLeft:"60px" }}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
      <TextField inputRef={titleRef} defaultValue={state.title}  InputLabelProps={{
    style: { color: 'white' },
  }} fullWidth sx={{ input: { color: 'white' } }} id="outlined-basic" label="Title" variant="outlined"  />
      </Grid>
      <Grid item xs={6}>
      <TextField   inputRef={descRef} defaultValue={state.data_json.description}  InputLabelProps={{
    style: { color: 'white' },
  }}   fullWidth sx={{ input: { color: 'white' } }} multiline  id="outlined-basic" label="Description" variant="outlined" />
      </Grid>
      <Grid item xs={6}>
      <TextField inputRef={diffRef} defaultValue={state.difficulty}  InputLabelProps={{
    style: { color: 'white' },
  }} fullWidth sx={{ input: { color: 'white' } }} id="outlined-basic" label="Difficulty" variant="outlined" />
      </Grid>
      <Grid item xs={6}>
      <TextField inputRef={tagRef} defaultValue={state.tag}  InputLabelProps={{
    style: { color: 'white' },
  }} fullWidth sx={{ input: { color: 'white' } }} id="outlined-basic" label="Tag" variant="outlined" />
      </Grid>

      <Grid item xs={6}>
      <TextField inputRef={inRef} defaultValue={state.data_json.input}  InputLabelProps={{
    style: { color: 'white' },
  }} fullWidth sx={{ input: { color: 'white' } }} id="outlined-basic" label="Input" variant="outlined" />
      </Grid>
      <Grid item xs={6}>
      <TextField inputRef={outRef} defaultValue={state.data_json.output}  InputLabelProps={{
    style: { color: 'white' },
  }} fullWidth sx={{ input: { color: 'white' } }} id="outlined-basic" label="Output" variant="outlined" />
      </Grid>

      <Grid item xs={6}>
      <TextField inputRef={minRef} defaultValue={state.data_json["match-input"]}  InputLabelProps={{
    style: { color: 'white' },
  }} fullWidth sx={{ input: { color: 'white' } }} id="outlined-basic" label="Match Input" variant="outlined" />
      </Grid>
      <Grid item xs={6}>
      <TextField inputRef={moutRef} defaultValue={state.data_json["match-output"]}  InputLabelProps={{
    style: { color: 'white' },
  }} fullWidth sx={{ input: { color: 'white' } }} id="outlined-basic" label="Match Output" variant="outlined" />
      </Grid>

      <Grid item xs={6}>
      <TextField inputRef={logoRef} defaultValue={state.logo} InputLabelProps={{
    style: { color: 'white' },
  }} fullWidth sx={{ input: { color: 'white' } }} id="outlined-basic" label="Logo" variant="outlined" />
      </Grid>
      <Grid item xs={6}>
      <TextField inputRef={ratingRef}  defaultValue={state.rating} InputLabelProps={{
    style: { color: 'white' },
  }} fullWidth sx={{ input: { color: 'white' } }} id="outlined-basic" label="Rating" variant="outlined" />
      </Grid>
      <Grid item xs={6}>
        <>
        <span style={{color:"white"}}>Live</span>
      <Switch
  checked={isLive}
  onChange={handleChange}
  inputProps={{ 'aria-label': 'controlled' }}
  label="Live"
/>
</>
           </Grid>
           <Grid item xs={6}>
           <span style={{color:"white"}}>Premium</span>
      <Switch
  checked={isPremium}
  onChange={handleChangePremium}
  inputProps={{ 'aria-label': 'controlled' }}
/>

           </Grid>

           <Grid item xs={6}>
   

           </Grid>

           <Grid item xs={6}>
           <Button size="large" variant="contained" onClick={handleClick}>Update</Button>

   </Grid>
    </Grid>
  </Box>):<>Operation Denied</>}

  </>
  );
};

export default ProblemUpdate;
