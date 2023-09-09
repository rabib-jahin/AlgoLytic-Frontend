import React from "react";
import { useState,useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import "./mocktest.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import LinearProgress from "@mui/material/LinearProgress";

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle'; 
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { getTagList } from "../../../actions/interviewee/tagList";
import { createTest, getTests } from "../../../actions/interviewee/mocktest";
import { showToast } from "../../../App";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  const Card2 = (props) => {
    return (
      <li className="card-home">
        <span >{props.title}</span>
        <p>{props.copy}</p>
      </li>
    )
  }
const Mocktest = (props) => {

   const items = [
        {
            icon:"face",
            copy:'01. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },{
            icon:"pets",
            copy:'02. Sed do eiusmod tempor incididunt ut labore.'
        },{
            icon:"stars",
            copy:'03. Consectetur adipiscing elit.'
        },{
            icon:"invert_colors",
            copy:'04. Ut enim ad minim veniam, quis nostrud exercitation.'
        },{
            icon:"psychology",
            copy:'05. Llamco nisi ut aliquip ex ea commodo consequat.'
        },{
            icon:"brightness_7",
            copy:'06. Misi ut aliquip ex ea commodo consequat.'
        },
        {
            icon:"brightness_7",
            copy:'06. Misi ut aliquip ex ea commodo consequat.'
        },
        {
            icon:"brightness_7",
            copy:'06. Misi ut aliquip ex ea commodo consequat.'
        }
        ,{
            icon:"brightness_7",
            copy:'06. Misi ut aliquip ex ea commodo consequat.'
        },
        {
            icon:"brightness_7",
            copy:'06. Misi ut aliquip ex ea commodo consequat.'
        }
    ];
 
  const [tags,setTags]= React.useState([])
   
  const [tests,setTests]= React.useState([])
  const buttons = [
    {
      name: 'Difficulty',
      items: ['Easy', 'Medium', 'Hard'],
    },
    {
      name:'Tag',
      items:tags
    }

 
    
  ];
    const [open, setOpen] = React.useState(false);
   
    const [showDropdown, setShowDropdown] = useState(Array(buttons.length).fill(false));
   
    const fetchTags = async () => {
        var res = await getTagList();
       
        setTags(res.data)
        res.data.forEach(element => {
          console.log("elem",element)
          buttons[1].items.push(element)
        });

        console.log(  buttons[1].items)
      
     
      }
      const fetchTests = async () => {
        var res = await getTests()
       
        setTests(res.data)
        console.log(res.data)
       
      
     
      }

React.useEffect(()=>{

// await fetchTags()
fetchTags()

fetchTests()
},[])

const toggleDropdown = (index) => {

  setShowDropdown(prevState => {
    const newState = [...prevState];
    newState[index] = !newState[index];
    return newState;
  });
};

const filter = (item, name, idx) => {
if(item!=undefined){
  let to = name.toLowerCase()
  var elem = document.getElementById("btn" + idx)
  elem.innerText = item  


}

}
 
  const [values, setValues] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = (id) => {
  window.location.href="/test/"+id
  };
  const handleCreate = async() => {
    setLoader(true)
    let a=[]
    values.length>0 && values.forEach(val=>{
    
      a.push(val.name)
    })
     localStorage.setItem('functionCalledFlag','false')
localStorage.setItem("time",null)
   var res=await createTest(a)
   console.log(res.data)
   if(res.success){
    setLoader(false)
        window.location.href = "/test/"+res.id
   }else{
    showToast("Error occured")
   }
   setLoader(false)
    // var res=await recommend({to:a,problem_id:props.id})
    
    // console.log(res.data)
    // showToast("Successfully Recommended ")
    
    console.log(a)

  };

 

  const handleClose = () => {
    setOpen(false);
  };
  
    
return (
        <div class="container-test">

<h2 class="test">Test Formats</h2>
  {/* <div class="cards" onClick={handleClickOpen}>
    <div class="card-item">
      <div class="card-image">
      </div>
      <div class="card-info">
        <h2 class="card-title">Coding interview Mocktest</h2>
        <p class="card-intro">Test yourself with topics of your own choice. Problems will be selected based on your performance so far</p>
      </div>
    </div>
  </div> */}
 <Card   sx={{ maxWidth: 345,backgroundColor:"#474747",cursor:"pointer", '&:hover': { transform: 'scale(1.05)' } } } onClick={handleClickOpen}>
      <CardMedia
        sx={{ height: 246 }}
        image="https://www.brainlytic.org/images/52d28368-59b8-4c81-9d38-68635d25f2061694106819127.png"
        title="Test"
      />
      <CardContent sx={{ color:"white" }}>
        <Typography gutterBottom variant="h5" component="div">
        Coding interview Mocktest
        </Typography>
        <Typography variant="body2" sx={{ color:"white" }}>
        Test yourself with topics of your own choice. Problems will be selected based on your performance so far
        </Typography>
      </CardContent>

    </Card >
    <h2 class="test">Completed Tests</h2>
    <div  style={{ display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", /* Three cards per row */
    gap: "20px" }}>
      {tests.length>0&&tests.map((item, i) => (
        <Card
          key={i}
        
          sx={{
            maxWidth: 345,
            backgroundColor: "#474747",
            marginBottom: "30px" ,
            cursor: "pointer",
            width: "300px",
            height: "110px",
            '&:hover': { transform: 'scale(1.05)' }
          }}
          onClick={()=>handleClickOpen2(item.test_id)}
          
        >
          <CardContent sx={{ color: "white" }}>
            <Typography gutterBottom variant="h5" component="div">
              Test no- {i+1}
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
            <p style={{color:"yellow"}}> Marks Obtained: {item.marks}</p>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
   
  <BootstrapDialog

   PaperProps={{
    sx: {
      width: "50%",
      height: "80%"
    }
  }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
         {
                            loader ? (
                                <LinearProgress/>
                            ) : (
                                <div/>
                            )
                        }
        
        <DialogTitle sx={{ m: 0, p: 2 ,color:"black"}} id="customized-dialog-title">
          Select your topics
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
             
        <DialogContent>
          
          
          { tags!=undefined && tags.length>0  ?
          
          <Stack spacing={3}   sx={{ width: 500, color:'black' }}>
          <Autocomplete
          
            multiple
            id="tags-standard"
            options={tags}
            getOptionLabel={(option) => option.name}
            defaultValue={[tags[0]]}

            renderOption={(props, option) => {
              const { name } = option;
              return (
                <span {...props} style={{ color:'#222222',fontWeight:'bold' }}>
                  {name}
                </span>
              );
            }}

            renderInput={(params) => (
              <TextField
          
           
                {...params}
                variant="standard"
                label="Multiple values"
                placeholder="Favorites"
               
               
              
              />
            )}
            onChange={(e, value, situation, option) => {
             
  
               //write your code here
               setValues(value)
              
            
            }}
          />
         
        </Stack>
          
          
          :null}
          
          
           
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate}>Start Test</Button>
        </DialogActions>
      </BootstrapDialog>
</div>
            
    );
};

export default Mocktest;