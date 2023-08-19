import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl } from '../../App';

export const getProbList=async (data)=>{
  let url=""
    let base_url=getApiUrl();
    
    console.log("body",data)
    if(Object.keys(data).length==0){
      url=base_url+"/problem/list"

    }
   
    else{
      let temp=""
      let i=1
for(var prop in data){

  if(i==1)
  temp+=prop+"="+data[prop]
  else
  temp+="&"+prop+"="+data[prop]

  i+=1
}
url=base_url+"/problem/filter?"+temp
    }
  console.log(url)
    var res=await axios.get(url)
    .catch(error => {
      console.log(error);
      
    });

   
    return res?.data



}