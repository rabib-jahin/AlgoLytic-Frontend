import React, { useState, useEffect } from "react";
import { getSubList, subscribe, uploadCSV } from "../../../actions/interviewee/subscription";
import './subscription.css';
import { checkAuth, checkStatus } from "../../../actions/interviewee/auth";
import { CircularProgress, LinearProgress } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { showToast } from "../../../App";
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import the CloudUploadIcon


const Subscription = (props) => {


  const [pending, setPending] = useState(false)

  const [data, setData] = useState([])
  const [status, setStatus] = useState({})

  const [loading, setLoading] = useState(true)
  const [loader, setLoader] = useState(false)
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
   const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
         console.log(e.dataTransfer.files)
    setIsDragActive(false);

    setSelectedFile(e.dataTransfer.files[0]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleUpload = async() => {
    // Handle file upload logic here
    if (selectedFile) {
      console.log(selectedFile)
      setLoader(true)
   var res=await uploadCSV(selectedFile)
   if(res!=undefined && res.success){

showToast("CSV successfully updated")
setLoader(false)
   }else{

    showToast("Error occured")
    setLoader(false)
   }
    }
   
  };
  const fetchSubs = async () => {

    var res = await getSubList(data)
    console.log(res.data)
    setData(res.data)
  }
  const fetchStatus = async () => {
    const res = await checkStatus()
    setStatus(res)
  }

  const initialize = async () => {
    try{
      await fetchSubs()
      await fetchStatus()
      setLoading(false)
    }catch(err){
      //showToast("Error Occurred")
      setLoading(false)
    }
    
  }

  useEffect(() => {
    initialize()
  }, [])

  const getPlan = async id => {
    if(!checkAuth()){
      showToast('You need to login to subscribe')
    }
    else{
      setPending(true)
      var res = await subscribe(id)
      if(res.success){
        

        window.location = res.data
      }
      else{
        showToast("Subscription Failed")
      }
    
     
  
    }
  }


  return (
    <>
      {
        loading ? (
          <div style={{ position:'absolute',left:'0',top:'0',height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          <div >
          
            {pending && <LinearProgress/>}
            <div>
              <div class="container-fluid">
                <div class="container">
                  <div class="row">
                    {
                      data.length == 0 ? <></> :
                        data.map(sub => (

                          <div class="col-sm-4">
                            <div class="card text-center">
                              <div>
                                <h2> {status.id === sub.id ? "Active Plan" : ""}</h2>
                              </div>
                              <div class="title">
                                <i class="fa fa-paper-plane" aria-hidden="true"></i>
                                <h2>{sub.title}</h2>

                              </div>
                              <div class="price">
                                <h4><sup>$</sup>{sub.fee.replace(/\$/g, "")}</h4>
                              </div>
                              <div class="option">
                                <ul>
                                  {
                                    sub.title == "Basic" ? <>
                                      <li><i class="fa fa-check" aria-hidden="true"></i>Only free problems are available</li>
                                      <li><i class="fa fa-check" aria-hidden="true"></i>No live Support</li>
                                      <li><i class="fa fa-check" aria-hidden="true"></i>Solutions  of others are not visible </li>
                                    </> : sub.title == "Premium" ? <>
                                      <li><i class="fa fa-check" aria-hidden="true"></i>Premium Problems Unlocked</li>
                                      <li><i class="fa fa-check" aria-hidden="true"></i>24/7 Live Support</li> <br />
                                      <li><i class="fa fa-check" aria-hidden="true"></i>All solutions are unlocked </li>
                                    </> : (
                                      <>
                                        <li><i class="fa fa-check" aria-hidden="true"></i>Premium Problems Unlocked</li>
                                        <li><i class="fa fa-check" aria-hidden="true"></i>24/7 Live Support</li> <br />
                                        <li><i class="fa fa-check" aria-hidden="true"></i>All solutions are unlocked </li>
                                      </>



                                    )
                                  }

                                </ul>
                                {
  status.id===sub.id && sub.id==3 &&(  <Button  startIcon={<FileUploadIcon/>} variant="contained" onClick={handleOpen}>
  Upload CSV
</Button>)
}
                              </div>
                              

                              {status.id !== sub.id && !pending &&<a style={{ cursor: "pointer" }} onClick={() => {
                                if (!pending) getPlan(sub.id)
                              }}>{pending ? <CircularProgress/> : 'Get Plan'}</a>}

               <>
                    
                     
                     </>


                            </div>
                          </div>
                        ))


                    }



                  </div>
                </div>
              </div>
            </div>


            <Dialog open={open} onClose={handleClose}>
            {
                         loader ? (
                                <LinearProgress/>
                            ) : (
                                <div/>
                            )
                        }
        <DialogTitle>
          Select a File
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>

          <div className={isDragActive ? 'drag-active' : ''}>
      
          <label for="images" class="drop-container" id="dropcontainer"
          
     
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
   
          >
         
  <span class="drop-title">Drop files here</span>
  or
  <input type="file" onChange={handleFileChange}   className="input" />
</label>
</div>

         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>


          </div>
        )
      }
    </>
  );
};

export default Subscription;