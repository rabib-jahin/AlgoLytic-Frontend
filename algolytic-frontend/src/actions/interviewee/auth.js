import Cookies from 'universal-cookie';
import axios from 'axios'
import { getApiUrl } from '../../App';

const cookies = new Cookies();

const COOKIE_AGE=31536000


export const checkAuth=()=>{
    return !(cookies.get('token')==undefined || cookies.get('token')==null)
}

export const googleLogin=async ({credential})=>{
    try{
        var result=await axios.post(`${getApiUrl()}/auth/google-login`,{credential})
        if(result.data.success){
            cookies.set('token',result.data.token,{ path: '/', maxAge: COOKIE_AGE })
            return true
        }
        return false
    }catch(e){
        return false
    }
}

export const logout=()=>{
    cookies.remove('token',{ path: '/' })
}