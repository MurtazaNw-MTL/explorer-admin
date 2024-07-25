import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { CALL_API } from "src/services/APICalls";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 5
};


export default function AddCategoryModal({ show, pageReloader,closeModal }) {


  const [formData, setformData] = React.useState({
    name:"",
  address:"",
  email:null
  });


  const handleChange = (e) => {
    let { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const handleSubmit=async()=>{
    try {
      const {address,name,email} = formData
      if(!address || !name || !email) return toast.error("All Fields are required")
      console.log(formData,"<<<<")
      const {data}=await CALL_API.USER.create(formData)
    console.log(data,"<<<thisisdata")
      if(data.success){
        console.log(data)
        toast.success("User Added")
        pageReloader()
        closeModal()
      }
      
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={show}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container rowGap={2}>
            <Grid item xs={12}>
              <Typography textAlign="center" fontSize={20}>Add New User</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={16}>Enter Name</Typography>
        <TextField fullWidth value={formData?.name} name="name" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={16}>Enter Address</Typography>
        <TextField fullWidth value={formData?.address} name="address" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={16}> Enter Email</Typography>
        <TextField fullWidth value={formData?.email} name="email" onChange={handleChange}/>
            </Grid>
         <Grid item xs={12}>
          <Button  variant="contained" onClick={handleSubmit} fullWidth>Submit</Button>
         </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
