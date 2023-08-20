import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl,showToast } from '../../App';

const cookies = new Cookies();

const COOKIE_AGE=31536000
let loader=false;


export const checkAuth=()=>{
    return !(cookies.get('token')==undefined || cookies.get('token')==null)
}

export const checkAdmin=async()=>{
    let base_url=getApiUrl();
    if(!(cookies.get('token')==undefined || cookies.get('token')==null)){
        var res=await axios.get(base_url+'/auth/checkadmin',{headers:{authorization:'Bearer '+cookies.get('token')}}).catch(e=>console.log(e))
 console.log(res?.data)
        return res?.data
    }
   
    return false
}


export const checkStatus=async()=>{
    let base_url=getApiUrl();
    if(!(cookies.get('token')==undefined || cookies.get('token')==null)){
        var res=await axios.get(base_url+'/auth/status',{headers:{authorization:'Bearer '+cookies.get('token')}}).catch(e=>console.log(e))
  console.log(res)
        if(res?.data?.data[0]?.sub_id!="1"){
        return {status:true,id:res.data.data[0].sub_id,type:res.data.data[0].type}
    }
    if(Object.keys(res?.data?.data[0]).length>0){

        return {status:false,id:1,type:res.data.data[0].type}
    }
    return {status:false,id:1,type:""}
    }
   
    return {status:false,id:0,type:null}
}
export const checkLoading=()=>{
    return loader
}

export const loginUser=async(data)=>{
    let base_url=getApiUrl();
    loader=true
 
   var res=await axios.post(base_url+'/auth/login',data).catch(e=>console.log(e))
   console.log(res.data)  
   if(res.data.success){
            cookies.set('token',res.data.token,{ path: '/', maxAge: COOKIE_AGE }) //setting token
          
        }
 return res.data
}

export const register=(data)=> {
    let base_url=getApiUrl();
    console.log("########req data########")
   
    axios.post(base_url+'/auth/register',data).then(res=>{  
     
        if(!res.data.success){
           showToast(res.data.message)
        }else{
            showToast("Successfully Registered")
        }

    }).catch(err=>{
        switch(err.response.status){
            case 409:
                showToast('User already exists')
                break
            case 500:
                showToast('Internal server error')
                break
            default:
                showToast('Connectvity problem')
        }
    
    })
}

export const logout=()=>{
    cookies.remove('token',{ path: '/' })
}