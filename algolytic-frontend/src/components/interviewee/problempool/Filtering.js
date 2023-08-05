import React, { useEffect, useState } from "react";
import "../../../assets/css/interviewee/problempool/filtering.css";
import { ArrowDownward } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import { getTagList } from "../../../actions/interviewee/tagList";
const Filtering=(props)=>{

  // state to keep track of which collapse content is active
  const [activeIndex, setActiveIndex] = useState(-1);
  const [text,setText]=useState("");
  const [tags,setTags]=useState([])
  const [data,setData]=useState({})
  
  // array of objects for each button with its name and dropdown items
  const buttons = [
    {
      name: 'Difficulty',
      items: ['Easy', 'Medium', 'Hard'],
    },
    {
      name: 'Status',
      items: ['Attempted', 'Solved', 'Not Tried'],
    },
    {
      name: 'Tag',
      items:tags,
    },
    {
      name: 'Premium',
      items: ['Regular', 'Premium'],
    },
  ];

  const [showDropdown, setShowDropdown] = useState(Array(buttons.length).fill(false));
  const fetchTags=async ()=>{
    var res=await getTagList();
    console.log("data",res.data)
   setTags(res.data)
  }
  const search=()=>{

let d={}
d={... props.body,search:text}
props.setBody(d);


props.fetchProblems(d)


  }
  const filter=(item,name)=>{

let to=name.toLowerCase()


let d={}

props.body[to]=item;
if(to=="difficulty"){
d={... props.body,difficulty:item}
props.setBody(d);


}
if(to==="status"){
  d={... props.body,status:item}
    props.setBody(d);


}
if(to==="premium"){

  if(item=="Regular") {
  d={... props.body,is_premium:false}
  props.setBody(d);
  

}
  else {
    d={... props.body,is_premium:true}
    props.setBody(d);

  }
}
if(to=="tag"){
  d={... props.body,tag:item}
  props.setBody(d);

}

console.log(d)
props.fetchProblems(d)

  }
  useEffect(()=>{


    fetchTags()
  },[])
  const toggleDropdown = (index) => {
    
    setShowDropdown(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="middle">
      {buttons.map((button, index) => (
        <div key={index} style={{marginRight: index < buttons.length - 1 ? '50px' : 0, position: 'relative'}}>
          <button
            className="rounded-button"
            style={{marginLeft:index==3?"10px":index==2?"28px":null}}
            onClick={() => toggleDropdown(index)}
          >
           {button.name}
            {showDropdown[index] ? <KeyboardArrowUpIcon style={{marginLeft:"15px"}} /> : <KeyboardArrowDownIcon style={{marginLeft:"15px"}} />}
          </button>
          {showDropdown[index] && button.name!=="Tag" && (
            <div className="dropdown-content" style={{marginLeft:index==3?"-2px":index==1?"-8px":null,position: 'absolute', top: '100%'}}>
              {button.items.map((item, itemIndex) => (
                <div onClick={()=>filter(item,button.name)} key={itemIndex} className="dropdown-item text-green2">
                {item}
                </div>
              ))}
            </div>
          )}
            {showDropdown[index] && button.name=="Tag" && (
            <div className="dropdown-content" style={{marginLeft:index==3?"-2px":index==1?"-8px":null,position: 'absolute', top: '100%'}}>
              {button.items.map((item, itemIndex) => (
                <div onClick={()=>filter(item.name,button.name)} key={itemIndex} className="dropdown-item text-green2">
                {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    <div className="searchbar-container">
    
      <input onChange={(e)=>setText(e.target.value)} type="text" placeholder="Search..." className="searchbar-input" />
      <button onClick={search} className="searchbar-button"><SearchIcon/></button>
    </div>
    </div>
  );
}

export default Filtering;
