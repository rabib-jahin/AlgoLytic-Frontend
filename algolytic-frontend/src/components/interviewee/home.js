import React from "react";
import "./home.css"
import { Container, Card, CardContent, CardActionArea, IconButton,
   
    } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import  ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState,useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
// import "./mocktest.css"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { getTagList } from "../../actions/interviewee/tagList";
import { getPopularProblems } from "../../actions/interviewee/problemList";

const Card2 = (props) => {
    return (
      <li className="card-home" onClick={()=>window.location.href="/problem/"+props.copy.problem_id} >
        <span class="material-icons">{props.icon}</span>
        <p>{props.copy.title}</p>
      </li>
    )
  }
  

const Home = (props) => {
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
    const [moveClass, setMoveClass] = useState('');
  const [carouselItems, setCarouselItems] = useState(items);
  const [probs, setProbs] = useState([]);
  useEffect(() => {
    document.documentElement.style.setProperty('--num', carouselItems.length);
  }, [carouselItems])
  
  const handleAnimationEnd = () => {
    if(moveClass === 'prev'){
      shiftNext([...carouselItems]);
    }else if(moveClass === 'next'){
      shiftPrev([...carouselItems]);
    }
    setMoveClass('')
  }
  
  const shiftPrev = (copy) => {
    let lastcard = copy.pop();
    copy.splice(0, 0, lastcard);
    setCarouselItems(copy);
  }
  
  const shiftNext = (copy) => {
    let firstcard = copy.shift();
    copy.splice(copy.length, 0, firstcard);
    setCarouselItems(copy);
  }

  const fetch=async()=>{

var res=await getPopularProblems()
console.log(res.data)
setProbs(res.data)
  }
    useEffect(()=>{

        fetch()
    },[])
return (
        <div >
              <div class="box-home2 offset-top-left-shadow" style={{fontSize:"18px"}}>Popular Problems New</div>
    {/* <div class="box offset-top-left-shadow"><div>Popular Problems</div></div> */}
    <div className="carouselwrapper module-wrapper">
      <div className="ui">
        <button onClick={() => setMoveClass('next')} className="prev">
          <span className="material-icons">chevron_left</span>
        </button>
        <button onClick={() => setMoveClass('prev')} className="next">
          <span className="material-icons">chevron_right</span>
        </button>
      </div>
      <ul  style={{marginLeft:"39px"}} onAnimationEnd={handleAnimationEnd} className={`${moveClass} carousel`}>
        {probs.length>0&& probs.map((t, index) => 
          <Card2 key={ index} icon={items[index].icon} copy={t.problem}  />
        )}
      </ul>
    </div>
    <div class="container-circle offset-top-left-shadow">
  <div class="circle">
    <p>Features</p>
  </div>
</div>
    <div class="container-home">
  <div class="box-home"> Live Coding</div>
  <div class="box-home">Solutions in Different Languages</div>
  <div class="box-home">Practice Test</div>
  <div class="box-home">Real Time Recommendation</div>
</div>
</div>
            
    );
};

export default Home;