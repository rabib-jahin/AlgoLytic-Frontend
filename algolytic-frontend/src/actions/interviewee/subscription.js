import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl } from '../../App';

const cookies = new Cookies();
const formData = new FormData();

export const getSubList=async ()=>{
    let base_url=getApiUrl(); 
    var res=await axios.get(base_url+"/subscription/list")
    .catch(error => {
      console.log(error);
      
    });
    console.log(res.data)
    return res.data

}

export const subscribe=async (id)=>{
  let base_url=getApiUrl(); 
  if(!(cookies.get('token')==undefined || cookies.get('token')==null)){
    var res=await axios.post(base_url+'/subscription/subscribe',{
      sub_id:id
    },{headers:{authorization:'Bearer '+cookies.get('token')}}).catch(e=>console.log(e))
    return res.data
  }
  return {success:false}

}

export const uploadCSV=async (data)=>{
  formData.append('csvFile', data);
  let base_url=getApiUrl(); 
  if(!(cookies.get('token')==undefined || cookies.get('token')==null)){
    var res=await axios.post(base_url+'/subscription/upload',formData,{headers:{authorization:'Bearer '+cookies.get('token')}}).catch(e=>console.log(e))
    console.log(res)
    return res?.data
  }
  return {success:false}

}