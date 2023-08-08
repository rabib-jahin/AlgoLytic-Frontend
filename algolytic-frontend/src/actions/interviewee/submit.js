import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl } from '../../App';
const cookies = new Cookies();

export const submitCode=async (data)=>{
    let base_url=getApiUrl();
    //console.log(base_url+"/tag/list")
    console.log(cookies.get('token'))
  
    var res=await axios.post(base_url+"/problem/submit",data,{headers:{authorization:'Bearer '+cookies.get('token')}})
    .catch(error => {
      console.log(error);
      
    });
    return res.data
  


}