import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl } from '../../App';

const cookies = new Cookies();

export const getSolutions=async (id)=>{
    let base_url=getApiUrl();
    //console.log(base_url+"/tag/list")
  
    var res=await axios.get(base_url+"/problem/solutions/"+id,{headers:{authorization:'Bearer '+cookies.get('token')}})
    .catch(error => {
      console.log(error);
      
    });

   
  
    if(res){
        return res.data
    }
    return null



}

