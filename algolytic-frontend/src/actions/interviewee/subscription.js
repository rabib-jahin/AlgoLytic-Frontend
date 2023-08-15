import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl } from '../../App';

export const getSubList=async ()=>{
    let base_url=getApiUrl();
   
  
    var res=await axios.get(base_url+"/subscription/list")
    .catch(error => {
      console.log(error);
      
    });
    console.log(res.data)

    return res.data



}