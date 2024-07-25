import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import CustomLoader from 'src/components/custom-scroll/CustomLoader';
import { CALL_API } from 'src/services/APICalls';
import { STORAGE } from 'src/services/baseCall';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const initialData={
    currentPassword:"",
    newPassword:"",
}
function UpdatePassword({show,onClose}) {
    const [showLoader, setshowLoader] = useState(false)
    const [formData, setformData] = useState(initialData)
    const submit=async(e)=>{
try {
    
    e.preventDefault()
    const user=await STORAGE.getUser()
const {currentPassword,password}=formData
if(!currentPassword.trim() || !password.trim()) return toast.error("All Fields are required")
setshowLoader(true)   
const {data}=await CALL_API.LOGIN.UpdatePassword({...formData,email:user.email})
    if(data.success){
        setshowLoader(false)
 toast.success(data.message)
 onClose()
    }else{
        setshowLoader(false)
    }
    // const 
    
} catch (error) {
    console.log("Error",error)
     toast.error(error?.response?.data?.message)
     setshowLoader(false)
}
    }
    const handleChange=e=>{
        const {name,value}=e.target
        setformData({...formData,[name]:value})
    }
  return (
    <div>
        <Modal
  open={show}
  onClose={onClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
    <form onSubmit={submit}>
  <Box sx={style} display="flex" flexDirection="column" gap="20px">

    <Typography fontSize={18} textAlign="center" color="black">Change Password</Typography>
  <TextField onChange={handleChange} name="currentPassword"  value={formData.currentPassword} fullWidth label="Current Password"/>
    <TextField onChange={handleChange} name="password" value={formData.password}  fullWidth label="New Password"/>
  {showLoader?  <CustomLoader />:
   <Button type="submit" onClick={submit} variant='contained'>Change Password</Button>
  }
  </Box>
    </form>
</Modal>
    </div>
  )
}

export default UpdatePassword