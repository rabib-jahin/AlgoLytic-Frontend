import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl } from '../../App';

const cookies = new Cookies();

export const getRecommendedpblmList=async ()=>{
    // have to change this after doing backend
    let base_url=getApiUrl();
   
  
    var res=await axios.get(base_url+"/recommendation/peerpblmlist",{headers:{authorization:'Bearer '+cookies.get('token')}})
    .catch(error => {
      console.log(error);
      
    });
    

    return res?.data



}

export const getRec=async ()=>{
  // have to change this after doing backend
  let base_url=getApiUrl();
 

  var res=await axios.get(base_url+"/recommendation/recompblmlist",{headers:{authorization:'Bearer '+cookies.get('token')}})
  .catch(error => {
    console.log(error);
    
  });
  

  return res?.data



}

export const getUsers=async ()=>{
  // have to change this after doing backend
  let base_url=getApiUrl();
 

  var res=await axios.get(base_url+"/recommendation/userlist",{headers:{authorization:'Bearer '+cookies.get('token')}})
  .catch(error => {
    console.log(error);
    
  });
  
  return res?.data




}

export const recommend=async (data)=>{
  // have to change this after doing backend
  let base_url=getApiUrl();
 

  var res=await axios.post(base_url+"/recommendation/recommend",data,{headers:{authorization:'Bearer '+cookies.get('token')}})
  .catch(error => {
    console.log(error);
    
  });
 // console.log(res.data)

  return res?.data
}

// dummy

export const getDummys=async ()=>{
  // have to change this after doing backend
  let base_url=getApiUrl();
 
  
  var res=await axios.get(base_url+"/recommendation/dummylist",{headers:{authorization:'Bearer '+cookies.get('token')}})
  .catch(error => {
    console.log(error);
    
  });
  console.log(res.data)
  return res?.data
}

export const createDummy=async (data)=>{
  // have to change this after doing backend
  let base_url=getApiUrl();
 
  console.log(data)
  var res=await axios.post(base_url+"/recommendation/createdummy",data,{headers:{authorization:'Bearer '+cookies.get('token')}})
  .catch(error => {
    console.log(error);
    
  });
 // console.log(res.data)

  return res?.data
}
