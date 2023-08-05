import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl } from '../../App';

export const getProbList=async (data)=>{
    let base_url=getApiUrl();
    console.log(base_url+"/problem/list")
  
    var res=await axios.get(base_url+"/problem/list")
    .catch(error => {
      console.log(error);
      
    });

   
    return res.data



}