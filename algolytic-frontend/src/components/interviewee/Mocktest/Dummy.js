import React from "react";
import { useState,useEffect,useRef } from "react";
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
import TextField from '@mui/material/TextField';
import { getTagList } from "../../../actions/interviewee/tagList";
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { getDummys } from '../../../actions/interviewee/recommenedpblmList';
import { createDummy } from '../../../actions/interviewee/recommenedpblmList';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const Dummy = (props) => {

    const titleRef=useRef();
    const [values, setValues] = React.useState([]);
    const [diff, setDiff] = React.useState([]);
    const [dummyara, setDummy] = React.useState([]);
    // const [users, setUsers] = React.useState([]);
 
  const [tags,setTags]= React.useState([])

  const buttons = [
    
    {
      name:'Difficulty',
      items:['Easy','Medium','Hard'],
    }

 
    
  ];

  const fetchDummy = async () => {
    var res = await getDummys()
   
    setDummy(res.data)
  
 
  }

  React.useEffect(()=>{

    // await fetchTags()
    fetchDummy()
    
    },[])


    const [open, setOpen] = React.useState(false);
   
    const [showDropdown, setShowDropdown] = useState(Array(buttons.length).fill(false));

    const createdummydata = async (obj) => {
      var res = await createDummy(obj);
    }

    const handleClickOpen = () => {
      let obj={
        title:titleRef.current.value,
        tag: ["bfs","dfs"],
        rating:1200
      }

      console.log(obj)
      createdummydata(obj)

    };

    
   

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

  if (to == "difficulty") {
    setDiff(item.toLowerCase())
  }


}

}
    const handleClick = () => {
      setOpen(true);
     
    };
    const handleClose = () => {
      setOpen(false);
    };
 
    const items = ["a","b","c"];
    
return (
    <div>
    <div className="text">
         <TextField inputRef={titleRef}   InputLabelProps={{
        style: { color: 'white' },
      }} fullWidth sx={{ input: { color: 'white' } }} id="outlined-basic" label="Title" variant="outlined"  />
      </div>


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

<Button style={{ marginTop: '8px' }} variant="contained" onClick={handleClickOpen} style={{ marginLeft: "670px", marginTop: "-45px" }} >
        Add
      </Button>

      <ul>
      {dummyara.map((item, index) => (
        <li key={index}><h2>{item.rating}</h2></li>
        
      ))}
    </ul>
  </div>
))}


</div>           
    
 </div>   
   
);

        };

export default Dummy;