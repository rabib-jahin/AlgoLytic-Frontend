import React, { useEffect, useState,useRef } from "react";
import "../../../assets/css/interviewee/problempool/filtering.css";
import { ArrowDownward } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { getTagList } from "../../../actions/interviewee/tagList";
import TextField from '@mui/material/TextField';

const Filtering = (props) => {

  // state to keep track of which collapse content is active
  const [activeIndex, setActiveIndex] = useState(-1);
  const [text, setText] = useState("");
  const [tags, setTags] = useState([])
  const [data, setData] = useState({})
  const acRef=useRef();
  const actypeRef=useRef();

  // array of objects for each button with its name and dropdown items
  const buttons = [
    {
      name: 'Difficulty',
      items: ['Easy', 'Medium', 'Hard'],
    },

    {
      name: 'Tag',
      items: tags,
    },
    {
      name: 'Status',
      items: ['Regular', 'Premium'],
    },
  ];

  const [showDropdown, setShowDropdown] = useState(Array(buttons.length).fill(false));
  const fetchTags = async () => {
    var res = await getTagList();
    console.log("data", res.data)
    setTags(res.data)
  }
  const search = () => {

    var res = props.probs?.data?.filter(p => p.title.includes(text))
    props.setProbs({})

    console.log(res)


    
    props.setProbs({... props.probs,data:res})

  }
  const filter = (item, name, idx) => {

    let to = name.toLowerCase()
    var elem = document.getElementById("btn" + idx)
    elem.innerText = item

    let d = {}
    if (to !== "premium")
      props.body[to] = item;
    if (to == "difficulty") {
      d = { ...props.body, difficulty: item.toLowerCase() }
      props.setBody(d);


    }
    if (to === "status") {
      d = { ...props.body, status: item }
      props.setBody(d);


    }
    if (to === "premium") {

      if (item == "Regular") {
        d = { ...props.body, isPremium: 0 }
        props.setBody(d);


      }
      else {
        d = { ...props.body, isPremium: 1 }
        props.setBody(d);

      }
    }
    if (to == "tag") {
      d = { ...props.body, tag: item.toLowerCase() }
      props.setBody(d);

    }

    d = { ...props.body, ac: acRef.current.value }
    props.setBody(d);
    d = { ...props.body, actype: actypeRef.current.value }
    props.setBody(d);

    console.log(d)


  }
  const filterfun = () => {

   
    console.log(acRef.current.value)
    console.log(actypeRef.current.value)
    props.fetchProblems()
    props.setBody({})
  }
  useEffect(() => {


    fetchTags()
  }, [])
  const toggleDropdown = (index) => {

    setShowDropdown(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="middle" style={{ marginLeft: "10px" }}>
      {buttons.map((button, index) => (
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
                <div onClick={() => filter(item, button.name, index)} key={itemIndex} className="dropdown-item text-green2">
                  {item}
                </div>
              ))}
            </div>
          )}
          {showDropdown[index] && button.name == "Tag" && (
            <div className="dropdown-content" style={{ marginLeft: index == 3 ? "-2px" : index == 1 ? "-8px" : null, position: 'absolute', top: '100%' }}>
              {button.items?.map((item, itemIndex) => (
                <div onClick={() => filter(item.name, button.name, index)} key={itemIndex} className="dropdown-item text-green2">
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <Button style={{ marginTop: '8px' }} variant="outlined" className="dropdown-item text-green2" onClick={filterfun} style={{ marginLeft: "50px", height: "60px", marginTop: "40px" }}>
        Filter
      </Button>
      <div className="searchbar-container">

        <input onChange={(e) => setText(e.target.value)} type="text" placeholder="Search..." className="searchbar-input" />
        <button onClick={search} className="searchbar-button"><SearchIcon /></button>
      </div>
      <TextField inputRef={acRef}   InputLabelProps={{
        style: { color: 'white' },
      }} fullWidth sx={{ input: { color: 'white' } }} id="outlined-basic" label="Acceptance" variant="outlined"  />
      <TextField inputRef={actypeRef}   InputLabelProps={{
        style: { color: 'white' },
      }} fullWidth sx={{ input: { color: 'white' } }} id="outlined-basic" label="Actype" variant="outlined"  />
    </div>
  );
}

export default Filtering;
