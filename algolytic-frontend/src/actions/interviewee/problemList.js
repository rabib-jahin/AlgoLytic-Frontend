import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl } from '../../App';

export const getProbList=async (data)=>{
    let base_url=getApiUrl();
    console.log(base_url+"/problem/list")
  
    var res=await axios.post(base_url+"/problem/list",data)
    .catch(error => {
      console.log(error);
      
    });
    return {
      data:"problem"
    }
    return res.data



}