import React, { useState, useEffect ,useRef} from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/interviewee/navbar.css";
import CircularProgress from "@mui/material/CircularProgress";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../../assets/images/icons/algolytic.jpg";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from '@mui/material/Button';
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from "@mui/material/TextField";
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import LinearProgress from "@mui/material/LinearProgress";

import {
  checkAuth,
  loginUser,
register,
  logout,
} from "../../../actions/interviewee/auth";
import { showToast } from "../../../App";




const NavBar = (props) => {
  const [activeOption, setActiveOption] = useState("problems");
  const [authDialogOpen,setAuthDialogOpen]=useState(false)
  const [state,setState]=useState(0)
  const nameRef=useRef()
  const loginRef=useRef()
  const passRef=useRef()
  const rePassRef=useRef()

  const handleOptionClick = (option) => {
    setActiveOption(option);
    window.sessionStorage.setItem("option", option);
  };

  const [isAuth, setAuth] = useState(checkAuth());

  const [authLoading, setAuthLoading] = useState(false);

  const handleCallbackResponse = async (response) => {
    // if ("credential" in response) {
    //   setAuthLoading(true);
    //   var result = await googleLogin({ credential: response.credential });
    //   if (result) {
    //     setAuth(true);
    //     showToast("Successfully Logged In");
    //   } else showToast("Authentication Failed");
    //   setAuthLoading(false);
    // }
  };
  const regClick=async()=>{

    const login = loginRef.current.value
    const password = passRef.current.value
    const name = nameRef.current.value
    const repass = rePassRef.current.value
    if (name.length === 0)
    showToast('Please enter a name')
    else if(login.length===0)
    showToast('Please enter a login id')

else if (password.length < 6)
    showToast('Password length must be greater or equals to 6')
else if (password !== repass)
    showToast('Please re enter password correctly')
  else{  
    var data={
      name,
      login,
      password,
    }
     register(data)
  }

  }
  const loginClick=async()=>{
    const login = loginRef.current.value
    const password = passRef.current.value
    if (password.length < 6)
    showToast('Password length must be greater or equals to 6')
    else{
      var data={
  
        login,
        password,
      }
      setAuthLoading(true)
     var res=await loginUser(data)
     if(res.success){
      showToast("Successfully Logged in")
      setAuth(true)
      setAuthLoading(false)
      setAuthDialogOpen(false)
      window.location.reload();
     }else{
      if(res.message){
        showToast(res.message)  

      }else
      showToast(res.error)
      setAuthLoading(false)
     
     }
         
    }


  }

  const logoutClick = () => {
    logout();
    setAuth(false);
    
  
    showToast("Logged Out");
    window.location.reload();
  };

  useEffect(() => {

    setAuth(checkAuth())
    // if (!isAuth) {
    //   /* global google */
    //   google.accounts.id.initialize({
    //     client_id:
    //       "988155575801-s3c394rgr41j19l41vebloavr4lhf09k.apps.googleusercontent.com",
    //     callback: handleCallbackResponse,
    //   });
    //   google.accounts.id.renderButton(document.getElementById("google-btn"), {
    //     theme: "outline",
    //     size: "large",
    //   });
    // }
  }, [isAuth]);

  return (
    <header className="header">
      <div className="">
        <Link to="/">
          <img className="logo-image" src={logo} alt="LOGO" />
        </Link>
      </div>
      <ul className="navbar-menu">
        <li
          className={    window.sessionStorage.getItem("option") === "problems" ? "active":""}
          onClick={() => handleOptionClick("problems")}
        >
          <a href="/">Problems</a>
        </li>
        <li
          className={window.sessionStorage.getItem("option")  === "learn" ? "active" : ""}
          onClick={() => handleOptionClick("learn")}
        >
          <a href="/tests">Test</a>
        </li>
        <li
          className={ window.sessionStorage.getItem("option") ==="recommendation"? "active" : ""}
          onClick={() => handleOptionClick("recommendation")}
        >
          <a href="/Recommendation">Recommendation</a>
        </li>
        <li
          className={ window.sessionStorage.getItem("option")==="subscription" ? "active" : ""}
          onClick={() => handleOptionClick("subscription")}
        >
          <a href="/subscription">Subscription</a>
        </li>

        <li
          className={window.sessionStorage.getItem("option")=== "create" ? "active" : ""}
          onClick={() => handleOptionClick("create")}
        >
          <a href="/create">Create Problem</a>
        </li>
        
      </ul>
      <div className="header-right">
        {isAuth ? (
          <>
            <NotificationsNoneIcon fontSize="large" className="header-icon" />
            <Link to="/user-progress">
              <AccountCircleIcon fontSize="large" className="header-icon" />
            </Link>
            {authLoading ? (
              <CircularProgress className="header-icon" />
            ) : (
              <LogoutIcon
                onClick={logoutClick}
                fontSize="large"
                className="header-icon"
              />
            )}
          </>
        ) : (
         <div style={{display:"flex"}}>
      

<Button variant="contained" onClick={()=>{setAuthDialogOpen(true);setState(2)}} >Login</Button>
<Button variant="contained" onClick={()=>{setAuthDialogOpen(true);setState(1)}} style={{marginLeft:"10px"}}>Register</Button>
   
       
       
       </div>
      )}
      </div>
      <div>
      <Dialog open={authDialogOpen} aria-labelledby="form-dialog-title">

      {
                            authLoading ? (
                                <LinearProgress/>
                            ) : (
                                <div/>
                            )
                        }
      <DialogTitle id="form-dialog-title">
                            
     { state === 1 ? (<div>Register</div>):(<div>Login</div>)
}                      
          </DialogTitle>
          <DialogContent>

          {
                                state == 1 ? (
                                    <div>
                                        <TextField
                                            inputRef={nameRef}
                                            style={{marginTop: '12px'}}
                                            margin="dense"
                                            label="Name"
                                            variant="outlined"
                                            autoComplete='off'
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircleIcon color='primary'/>
                                                    </InputAdornment>
                                                ),
                                                style: {
                                                    padding: 2
                                                }
                                            }}
                                        /><br/></div>
                                ) : (
                                    <div/> 
                                )

}
{
                               state==1 || state === 2 ? (
                                    <TextField

                                        inputRef={loginRef}
                                        style={{marginTop: '12px'}}
                                        margin="dense"
                                        label="Login"
                                        variant="outlined"
                                        autoComplete='off'
                                        InputProps={{
                                           
                                            style: {
                                                padding: 2
                                            },
                                            autocomplete: 'off',
                                            form: {
                                                autocomplete: 'off',
                                            },
                                        }}
                                    />  ) : (
                                      <div/>
                                  )
                              }
                              <br/>
                                 {
                                state < 3 ? (
                                    <TextField

                                        inputRef={passRef}
                                        style={{marginTop: '12px'}}
                                        margin="dense"
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon color='primary'/>
                                                </InputAdornment>
                                            ),
                                            style: {
                                                padding: 2
                                            },
                                            autocomplete: 'new-password',
                                            form: {
                                                autocomplete: 'off',
                                            },
                                        }}
                                    />
                                ) : (
                                    <div/>
                                )
                            }
                                <br/>
                               {
                                state ==1 ? (
                                    <TextField

                                        inputRef={rePassRef}
                                        style={{marginTop: '12px'}}
                                        margin="dense"
                                        label="Re-enter Password"
                                        type="password"
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon color='primary'/>
                                                </InputAdornment>
                                            ),
                                            style: {
                                                padding: 2
                                            },
                                            autocomplete: 'new-password',
                                            form: {
                                                autocomplete: 'off',
                                            },
                                        }}
                                    />
                                ) : (
                                    <div/>
                                )
                            }
                                <br/>
                              
                              {
                                state == 1 ? (
                                    <div>
                                        <center>

                                         
                                            <Button  onClick={regClick}
                                                    style={{marginTop: '8px'}} variant="outlined" color="primary">
                                                Register
                                            </Button>
                                        </center>
                                        <center style={{marginTop: '8px'}}>or Already Have An Account ?</center>
                                        <center><Button  onClick={() => {
                                            setState(2)
                                        }} style={{marginTop: '8px', marginBottom: '8px'}} variant="outlined"
                                                        color="secondary">
                                            Login to existing account
                                        </Button></center>
                                    </div>
                                ) : state == 2 ?
                                    (
                                        <div>
                                            <center>
                                                {/*<ReCAPTCHA
                                        sitekey="6LejnMIcAAAAAK7JEhofX7c-fedw58BI-AnTYz2u"
                                        onChange={onLoginCaptchaChange}
                                    />*/}
                                                <Button  onClick={loginClick}
                                                        style={{marginTop: '8px'}} variant="outlined" color="primary">
                                                    Login
                                                </Button>
                                            </center>
                                            <center style={{marginTop: '8px'}}>or Need An Account ?</center>
                                            <center><Button  onClick={() => {
                                               setState(1)
                                            }} style={{marginTop: '8px', marginBottom: '8px'}} variant="outlined"
                                                            color="secondary">
                                                Create A New Account
                                            </Button></center>
                                        </div>
                                    ) : (
                                        <div/>
                                    )
                            }

                              <center>
    <center>
        <Button  onClick={()=>{setAuthDialogOpen(false)}} startIcon={<CloseIcon/>}
                style={{marginTop: '8px', marginBottom: '8px'}} variant="outlined">
            Close
        </Button>
    </center>
</center>
          </DialogContent>
        </Dialog>

      </div>
    </header>
  );
};

export default NavBar;