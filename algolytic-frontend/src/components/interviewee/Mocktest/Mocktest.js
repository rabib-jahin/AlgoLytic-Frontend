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
  

  // let d = {}
  // if (to !== "premium")
  //   props.body[to] = item;
  // if (to == "difficulty") {
  //   d = { ...props.body, difficulty: item.toLowerCase() }
  //   props.setBody(d);


  // }
  // if (to === "status") {
  //   d = { ...props.body, status: item }
  //   props.setBody(d);


  // }
  // if (to === "premium") {

  //   if (item == "Regular") {
  //     d = { ...props.body, isPremium: 0 }
  //     props.setBody(d);


  //   }
  //   else {
  //     d = { ...props.body, isPremium: 1 }
  //     props.setBody(d);

  //   }
  // }
  // if (to == "tag") {
  //   d = { ...props.body, tag: item.toLowerCase() }
  //   props.setBody(d);

  // }

  // console.log(d)
}

}
    const handleClick = () => {
      setOpen(true);
     
    };
    const handleClose = () => {
      setOpen(false);
    };
 

    
return (
        <div class="container">

<h3 class="test">Test Formats</h3>
  <div class="cards" onClick={handleClick}>
    <div class="card-item">
      <div class="card-image">
      </div>
      <div class="card-info">
        <h2 class="card-title">Exploring around</h2>
        <p class="card-intro">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
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
          Modal title
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
          
          {/* <div className="dropdown-content" style={{ marginLeft: index == 3 ? "-2px" : index == 1 ? "-8px" : null, position: 'absolute', top: '100%' }}>
              {button.items?.map((item, itemIndex) => (
                <div onClick={() => filter(item.name, button.name, index)} key={itemIndex} className="dropdown-item text-green2">
                  {item.name}
                </div>
              ))}
            </div> */}
  <div className="middle" style={{ marginLeft: "10px" }}>
      {buttons.length>0 && buttons.map((button, index) => (
        <div key={index} style={{ marginRight: index < buttons.length - 1 ? '50px' : 0, position: 'relative' }}>
          <div style={{ display: "flex" }}>
            <button
              className="rounded-button"
              id={"btn" + index}
              style={{ marginLeft: index == 3 ? "10px" : index == 2 ? "28px" : null }}

            >
              {button.name}

            </button>
            {showDropdown[index] ? <KeyboardArrowUpIcon onClick={() => toggleDropdown(index)} className="rounded-button" style={{ marginLeft: "15px" }} /> : <KeyboardArrowDownIcon onClick={() => toggleDropdown(index)} className="rounded-button" style={{ marginLeft: "15px" }} />}
          </div>
          {showDropdown[index] && button.name !== "Tag" && (
            <div className="dropdown-content" style={{ marginLeft: index == 3 ? "-2px" : index == 1 ? "-8px" : null, position: 'absolute', top: '100%' }}>
              {button.items.map((item, itemIndex) => (
                <div onClick={() => filter(item, button?.name, index)}   key={itemIndex} className="dropdown-item text-green2">
                  {item}
                </div>
              ))}
            </div>
          )}
          {showDropdown[index] && button.name == "Tag" && (

            <div className="dropdown-content" style={{ marginLeft: index == 3 ? "-2px" : index == 1 ? "-8px" : null, position: 'absolute', top: '100%' }}>
              {button.items?.map((item, itemIndex) => (
                <div onClick={() => filter(item?.name, button?.name, index)} key={itemIndex} className="dropdown-item text-green2">
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
      
    </div>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
          Create
          </Button>
        </DialogActions>
      </BootstrapDialog>
</div>
            
    );
};

export default Mocktest;