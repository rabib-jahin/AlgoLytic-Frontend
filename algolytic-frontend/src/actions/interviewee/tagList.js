import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl } from '../../App';

export const getTagList=async ()=>{
    let base_url=getApiUrl();
   
  
    var res=await axios.get(base_url+"/tag/list")
    .catch(error => {
      console.log(error);
      
    });
    console.log(res.data)

    return res.data



}