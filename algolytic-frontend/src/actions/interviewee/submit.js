import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl } from '../../App';

export const submitCode=async (data)=>{
    let base_url=getApiUrl();
    //console.log(base_url+"/tag/list")
  
    var res=await axios.post(base_url+"/problem/submit",data)
    .catch(error => {
      console.log(error);
      
    });
    return res.data
  


}