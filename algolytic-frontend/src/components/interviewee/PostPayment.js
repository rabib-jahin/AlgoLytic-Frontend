import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const PostPayment=props=>{

    const params=useParams()

    useEffect(()=>{
        console.log(params)
    },[])

    return (
        <div style={{color:'white'}}>
            Hello World
        </div>
    )
}

export default PostPayment