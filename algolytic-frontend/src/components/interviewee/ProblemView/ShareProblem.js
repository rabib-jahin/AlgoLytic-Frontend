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


 function Tags() {
    return (
      <Stack spacing={3} sx={{ width: 500 }}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Films[1]]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
            />
          )}
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button style={{ marginTop: '8px' }} variant="outlined" onClick={handleClickOpen} style={{ marginLeft: "500px", height: "60px", marginTop: "-50px" }}>
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
          <Tags/>
          
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Share</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ShareProblem;