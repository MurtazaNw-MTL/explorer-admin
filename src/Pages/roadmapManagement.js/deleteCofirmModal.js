import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { CALL_API } from "src/services/APICalls";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 5
};

export default function DeleteConfirm({ data, pageReloader, closeModal }) {
  const [open, setOpen] = React.useState(data.show);
  const [firstCategory, setFirstCategory] = React.useState([]);
  const [secondCategory, setsecondCategory] = React.useState([]);
  const handleOpen = () => setOpen(true);
  React.useEffect(() => {
    return () => {};
  }, []);

  const [formData, setformData] = React.useState({
    title: "",
    content: "",
    time: "",
    _id: null
  });
  const handleClose = () => setOpen(false);
  // const getFirstCategory=()
  React.useEffect(() => {
    console.log(data, "<<<<thisisdata");
    setformData({ ...data.data });
  }, [data]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await CALL_API.RoadMap.delete(formData);
      if (data.success) {
        console.log(data);
        toast.success("Roadmap Deleted");
        pageReloader();
        closeModal();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={data.show}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container rowGap={2}>
            <Grid item xs={12}>
              <Typography textAlign="left" fontWeight="bold" fontSize={22}>
                {" "}
                Confirmation
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={16} >
                Are you sure you want to delete Roadmap
              </Typography>
            </Grid>
          
         
            <Grid item xs={12} md={12} display="flex" justifyContent="end" >
              <Button variant="contained" onClick={closeModal} >
                Cancel
              </Button>
              <Button color="error" variant="outlined" onClick={handleSubmit}  style={{marginLeft:"15px"}}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
