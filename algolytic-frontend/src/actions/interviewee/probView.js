import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl } from '../../App';

export const getProbData=async (id)=>{
    let base_url=getApiUrl();
    console.log(base_url+"/problem/"+id)
  
    var res=await axios.get(base_url+"/problem/get/"+id)
    .catch(error => {
      console.log(error);
      
    });
  return {

    data:"hello"
  }
    return res.data



}