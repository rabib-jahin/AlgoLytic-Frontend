import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl } from '../../App';

const cookies = new Cookies();

export const getTestProblems=async (test_id)=>{
    // have to change this after doing backend
    let base_url=getApiUrl();
   
  
    var res=await axios.get(base_url+"/mocktest/testpblmlist/"+test_id,{headers:{authorization:'Bearer '+cookies.get('token')}})
    .catch(error => {
      console.log(error);
      
    });
    

    return res?.data



}



// export const getStats=async ()=>{
//   // have to change this after doing backend
//   let base_url=getApiUrl();
 

//   var res=await axios.get(base_url+"/mocktest/gets",{headers:{authorization:'Bearer '+cookies.get('token')}})
//   .catch(error => {
//     console.log(error);
    
//   });
  
//   return res?.data
// }


export const createTest=async (data)=>{
  // have to change this after doing backend
  let base_url=getApiUrl();
  var a={}
  a["tags"]=data

  var res=await axios.post(base_url+"/mocktest/createTest",a,{headers:{authorization:'Bearer '+cookies.get('token')}})
  .catch(error => {
    console.log(error);
    
  });
  console.log(res.data)

  return res?.data
}

export const submitTest=async (data)=>{
  // have to change this after doing backend
  let base_url=getApiUrl();
 

  var res=await axios.post(base_url+"/mocktest/submitTest",data,{headers:{authorization:'Bearer '+cookies.get('token')}})
  .catch(error => {
    console.log(error);
    
  });
 // console.log(res.data)

  return res?.data
}
export const getTests=async ()=>{
  // have to change this after doing backend
  let base_url=getApiUrl();
 

  var res=await axios.get(base_url+"/mocktest/getCompletedTests",{headers:{authorization:'Bearer '+cookies.get('token')}})
  .catch(error => {
    console.log(error);
    
  });
 // console.log(res.data)

  return res?.data
}

