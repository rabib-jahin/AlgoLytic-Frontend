import * as React from 'react';
import Button from '@mui/material/Button';
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
        {/* <Autocomplete
          multiple
          id="tags-outlined"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Films[1]]}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="filterSelectedOptions"
              placeholder="Favorites"
            />
          )}
        />
        <Autocomplete
          multiple
          id="tags-filled"
          options={top100Films.map((option) => option.title)}
          defaultValue={[top100Films[1].title]}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="freeSolo"
              placeholder="Favorites"
            />
          )}
        />
        <Autocomplete
          multiple
          id="tags-readOnly"
          options={top100Films.map((option) => option.title)}
          defaultValue={[top100Films[1].title, top100Films[1].title]}
          readOnly
          renderInput={(params) => (
            <TextField {...params} label="readOnly" placeholder="Favorites" />
          )}
        /> */}
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
  

const ShareProblem= (props) =>  {
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
  
var res=await recommend({to:a,problem_id:props.id})

console.log(res.data)
showToast("Successfully Recommended ")

console.log(a)
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(()=>{

  
    setUsers(props.users)
    
    console.log("users",users)
    
    
    
    },[props.users])

  return (
    <div>
      <Button style={{ marginTop: '8px' }} variant="outlined" onClick={handleClickOpen} style={{ marginLeft: "670px", height: "60px", marginTop: "-50px" }}>
        Share
      </Button>
      <Dialog open={open} onClose={handleClose} className="dialogue">
       {/* overlayStyle={{ borderRadius: 16, borderWidth: 1, backgroundColor: 'lightblue', borderColor: 'gold' }} */}
        <DialogTitle>Share Problem</DialogTitle>
        <DialogContent>
          <DialogContentText>
           
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add user"
            type="Name"
            fullWidth
            variant="standard"
            
          /> */}
          { users!=undefined && users.length>0  ?
          
          <Stack spacing={3} sx={{ width: 500,input:{color:'black'} }}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={users}
            getOptionLabel={(option) => option.login}
            defaultValue={[users[0]]}
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
             
  
               //write your code here
               setValues(value)
              
            
            }}
          />
          {/* <Autocomplete
            multiple
            id="tags-outlined"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            defaultValue={[top100Films[1]]}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="filterSelectedOptions"
                placeholder="Favorites"
              />
            )}
          />
          <Autocomplete
            multiple
            id="tags-filled"
            options={top100Films.map((option) => option.title)}
            defaultValue={[top100Films[1].title]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="freeSolo"
                placeholder="Favorites"
              />
            )}
          />
          <Autocomplete
            multiple
            id="tags-readOnly"
            options={top100Films.map((option) => option.title)}
            defaultValue={[top100Films[1].title, top100Films[1].title]}
            readOnly
            renderInput={(params) => (
              <TextField {...params} label="readOnly" placeholder="Favorites" />
            )}
          /> */}
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

export default ShareProblem;