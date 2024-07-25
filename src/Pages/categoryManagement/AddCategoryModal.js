import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4
};
const formData = {};

export default function AddCategoryModal({ show, closeModal }) {
  const [open, setOpen] = React.useState(show);
  const [firstCategory, setFirstCategory] = React.useState([]);
  const [secondCategory, setsecondCategory] = React.useState([]);
  const handleOpen = () => setOpen(true);
  React.useEffect(() => {
    return () => {};
  }, []);

  const [formData, setformData] = React.useState({
    level: "",
    firstCategory: "",
    secondCategory: "",
    name: "",
    description: ""
  });
  const handleClose = () => setOpen(false);
  // const getFirstCategory=()

  const handleChange = (e) => {
    let { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
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
          <Grid container>
            <Grid item xs={12}>
              <Typography textAlign="center"> Add Game</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Select Type</Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData?.level}
                  label="Type"
                  name="level"
                  onChange={handleChange}
                >
                  {["FIRST", "SECOND", "THIRD"].map((item, key) => {
                    return (
                      <MenuItem value={item} key={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            {formData?.level == "THIRD" && (
              <Grid item xs={12}>
                <Typography>Select First Category</Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    First Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData?.firstCategory}
                    label="First Category"
                    name="firstCategory"
                    onChange={handleChange}
                  >
                    {["FIRST", "SECOND", "THIRD"].map((item, key) => {
                      return (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
