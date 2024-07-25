import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import { toast } from "react-toastify";
import { CALL_API } from "src/services/APICalls";
import { STORAGE } from "src/services/baseCall";
import CustomLoader from "src/components/custom-scroll/CustomLoader";

const AuthLogin = ({ title, subtitle, subtext }) =>{
  const [loader, setLoader] = useState(false)
  const [formData, setFormData] = useState({email:"",password:""})
  const navigate=useNavigate()
  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData({...formData,[name]:value})

  }
  const handleSubmit=async (e)=>{
    try {
      e.preventDefault()
      setLoader(true)
      const {data}=await CALL_API.LOGIN.login(formData)
      console.log(data,"<<<<data")
      if(data.success){
        toast.success(data.message)
        STORAGE.saveUser(data.data)
        navigate("/")
        setLoader(false)

      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
      toast.error("Invalid Email / Password")
    }
  }
return (
  <>
        <form onSubmit={handleSubmit}>
    {title ? (
      <Typography fontWeight="700" variant="h2" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Stack>


   
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          color="white"
          htmlFor="username"
          mb="5px"
        >
          Email
        </Typography>
        <input className="login-input" id="username" variant="outlined" fullWidth value={formData?.email} name="email" onChange={handleChange}/>
        {/* <CustomTextField style={{color:"white"}} id="username" variant="outlined" fullWidth value={formData?.email} name="email" onChange={handleChange} /> */}
      </Box>
      <Box mt="25px">
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
             color="white"
          mb="5px"
        >
          Password
        </Typography>
       <input className="login-input"
          id="password"
          type="password"
          variant="outlined"
          fullWidth
          value={formData?.password} name="password" onChange={handleChange} 
        />
      </Box>
      {/* <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remeber this Device"
          />
        </FormGroup>
       
      </Stack> */}
    </Stack>
    <Box mt={2}>
     {loader?<CustomLoader />: <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
      type="submit"
        // component={Link}
        // to="/"
        onClick={handleSubmit}
        // type="submit"
      >
        Sign In
      </Button>}

    </Box>

    {subtitle}
       </form>
  </>
);

} 

export default AuthLogin;
