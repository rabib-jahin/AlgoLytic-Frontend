import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'

const PostPayment=props=>{

    const params=useParams()
    const navigate=useNavigate()

    const [status,setStatus]=useState(params.status)

    return (
        <Dialog open={true}>
            <DialogTitle>
                Payment {status==='success'?'SuccessFul!!!':(status==='failure'?'Failed':'Cancelled')}
            </DialogTitle>
            <DialogContent>
                <center>
                    <Typography variant='h3'>
                        {
                            status==='success'?'You Have Successfully Subscribed !!!':(
                                status==='failure'?'Payment failed, please try again...':'You have cancelled the payment'
                            )
                        }
                    </Typography>
                </center>
            </DialogContent>
            <DialogActions>
                <Button
                    color='primary'
                    startIcon={<ThumbUpIcon/>}
                    variant='contained'
                    onClick={()=>{navigate('/subscription')}}
                    >
                    Got it
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PostPayment