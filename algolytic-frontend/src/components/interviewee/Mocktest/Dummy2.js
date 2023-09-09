import * as React from 'react';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import "../../../assets/css/interviewee/problemview/shareproblem.css";
import { recommend } from '../../../actions/interviewee/recommenedpblmList';
import { showToast } from '../../../App';


 function Tags(data) {
console.log(data)
    return (
      <Stack spacing={3} sx={{ width: 500,input:{color:'black'} }}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={data.data}
          getOptionLabel={(option) => option.login}
          defaultValue={[data.data[0]]}
          renderInput={(params) => (
            <TextField
           
         
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
              sx={{input:{color:'black'}}}
             
            
            />
          )}
          onChange={(e, value, situation, option) => {
           


            
          
          }}
        />
        
      </Stack>
    );
  }
  
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },    
    
  ];
  

const Dummy2= (props) =>  {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [values, setValues] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleShare = async() => {
let a=[]
values.length>0 && values.forEach(val=>{

  a.push(val.id)
})


// var res=await recommend({to:a,problem_id:props.id})

// console.log(res.data)
showToast("Successfully Recommended ")

console.log(a)
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(()=>{

    var res=["aaaaaa","bbbbbbbbbb","ccccc"]
    setUsers(res)
    
    console.log("users",users)
    
    
    
    },[])

  return (
    <div>
      <Button style={{ marginTop: '8px' }} variant="contained" onClick={handleClickOpen} style={{ marginLeft: "670px", marginTop: "-45px" }} startIcon={<ShareIcon/>}>
        Share
      </Button>
      <Dialog open={open} onClose={handleClose} className="dialogue">
       {/* overlayStyle={{ borderRadius: 16, borderWidth: 1, backgroundColor: 'lightblue', borderColor: 'gold' }} */}
        <DialogTitle>Share Problem</DialogTitle>
        <DialogContent>
          <DialogContentText>
           
          </DialogContentText>
        
          { users!=undefined && users.length>0  ?
          
          <Stack spacing={3}   sx={{ width: 500, color:'black' }}>
          <Autocomplete
          
            multiple
            id="tags-standard"
            options={users}
            getOptionLabel={(option) => option}
            defaultValue={[users[0]]}

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
          <Button onClick={handleShare}>Share</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dummy2;