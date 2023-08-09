import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl } from '../../App';

const cookies = new Cookies();

export const getSubmissionStats=async (data)=>{
    let base_url=getApiUrl();
    //console.log(base_url+"/tag/list")
  
    var res=await axios.post(base_url+"/problem/submissionstats",data,)
    .catch(error => {
      console.log(error);
      
    });

    return {
      data:"demo"
    }
  
    return res.data



}

export const getSubmissions=async (id)=>{
    let base_url=getApiUrl();
    //console.log(base_url+"/tag/list")
  
    var res=await axios.get(base_url+"/problem/submissions/"+id,{headers:{authorization:'Bearer '+cookies.get('token')}})
    .catch(error => {
      console.log(error);
      
    });
 
    return res.data



}