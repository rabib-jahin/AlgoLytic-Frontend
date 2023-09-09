import React from "react";
import { useState,useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import "./mocktest.css"
import Button from '@mui/material/Button';
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const Mocktest = (props) => {
 
  const [tags,setTags]= React.useState([])
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

React.useEffect(()=>{

// await fetchTags()
fetchTags()

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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCreate = async() => {
    let a=[]
    values.length>0 && values.forEach(val=>{
    
      a.push(val.name)
    })
      
    // var res=await recommend({to:a,problem_id:props.id})
    
    // console.log(res.data)
    // showToast("Successfully Recommended ")
    
    console.log(a)
    window.location.href = "/test/1"
  };

 

  const handleClose = () => {
    setOpen(false);
  };
  
    
return (
        <div class="container">

<h2 class="test">Test Formats</h2>
  <div class="cards" onClick={handleClickOpen}>
    <div class="card-item">
      <div class="card-image">
      </div>
      <div class="card-info">
        <h2 class="card-title">Coding interview Mocktest</h2>
        <p class="card-intro">Test yourself with topics of your own choice. Problems will be selected based on your performance so far</p>
      </div>
    </div>
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
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
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
        <DialogContent dividers>
          
        
        </DialogContent>        
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