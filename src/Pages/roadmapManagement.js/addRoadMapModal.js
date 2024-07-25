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
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 5
};


export default function AddCategoryModal({ show, pageReloader,closeModal }) {
  const [open, setOpen] = React.useState(show);
  const [firstCategory, setFirstCategory] = React.useState([]);
  const [secondCategory, setsecondCategory] = React.useState([]);
  const handleOpen = () => setOpen(true);
  React.useEffect(() => {
    return () => {};
  }, []);

  const [formData, setformData] = React.useState({
   title:"",
   content:"",
   time:""
  });
  const handleClose = () => setOpen(false);
  // const getFirstCategory=()

  const handleChange = (e) => {
    let { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const handleSubmit=async()=>{
    try {
      const {title,content,time} = formData
      if(!title || !content || !time) return toast.error("All Fields are required")
      const {data}=await CALL_API.RoadMap.create(formData)
      if(data.success){
        console.log(data)
        toast.success("Roadmap Added")
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
              <Typography textAlign="center" fontWeight="bold" fontSize={20}> Add Roadmap</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={16}>Title</Typography>
        <TextField fullWidth value={formData?.title} name="title" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={16}>Description</Typography>
        {/* <TextField /> */}
        <textarea 
        rows={5}
        style={{
          width:"100%"
          
        }} value={formData?.content} name="content" onChange={handleChange}
        />
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={16}>Time</Typography>
        <TextField fullWidth value={formData?.time}  min={0} name="time" onChange={handleChange}/>
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
