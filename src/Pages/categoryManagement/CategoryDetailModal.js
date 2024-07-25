import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { MyIcons } from "src/views/icons/Icons";
import ShowAvatar, { TextAndIcon } from "src/components/Common/CommonComponent";
import { CopyIt } from "src/components/commonfunctions";
import { CALL_API } from "src/services/APICalls";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};
function BlockModal({
  showConfirm,
  setShowConfirm,
  pageReloader,
  data,
  closeParent
}) {
  // const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleOpen = () => {
    setShowConfirm(true);
  };
  const blockUser = async () => {
    if (message.trim() == "") return toast.error("Message can't be empty");
    let apiData = await CALL_API.USERS.block({
      id: data._id,
      status: true,
      message
    });
    if (apiData.data.success) {
      toast.error(`${data?.fullName} has been blocked`);
      handleClose();
      closeParent();
      pageReloader();
    }
  };
  const handleClose = () => {
    setShowConfirm(false);
  };

  return (
    <React.Fragment>
      <Modal
        open={showConfirm}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Confirmation Alert</h2>
          <p id="child-modal-description">
            Are you sure, you want to block {data?.fullName}
          </p>
          <textarea
            value={message}
            style={{ width: "100%" }}
            rows={3}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Grid container columnSpacing={2}>
            <Grid item xs={4}>
              {" "}
              <Button onClick={handleClose}> Cancel</Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" color="error" onClick={blockUser}>
                Block
              </Button>
            </Grid>
          </Grid>

          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
        </Box>
      </Modal>
    </React.Fragment>
  );
}
function UnblockModal({
  showConfirm,
  setShowConfirm,
  pageReloader,
  closeParent,
  data
}) {
  // const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setShowConfirm(true);
  };
  const unBlockUser = async () => {
    let apiData = await CALL_API.USERS.block({
      id: data._id,
      status: false,
      message: ""
    });
    if (apiData.data.success) {
      toast.success(`${data?.fullName} has been unblocked`);
      closeParent();
      pageReloader();
    } else {
      toast.error(apiData.message);
    }
  };
  const handleClose = () => {
    setShowConfirm(false);
  };

  return (
    <React.Fragment>
      <Modal
        open={showConfirm}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Confirmation Alert</h2>
          <p id="child-modal-description">
            Are you sure, you want to Unblock {data?.fullName}
          </p>

          <Grid container columnSpacing={2}>
            <Grid item xs={4}>
              {" "}
              <Button onClick={handleClose}> Cancel</Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" color="error" onClick={unBlockUser}>
                Unblock
              </Button>
            </Grid>
          </Grid>

          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
        </Box>
      </Modal>
    </React.Fragment>
  );
}
function VerifyUserModal({
  showConfirm,
  setShowConfirm,
  pageReloader,
  closeParent,
  data
}) {
  // const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setShowConfirm(true);
  };
  const Verify = async () => {
    let apiData = await CALL_API.USERS.verify({
      id: data._id,
      status: true
    });
    if (apiData.data.success) {
      toast.success(`${data?.fullName} has been Verified`);
      closeParent();
      pageReloader();
    } else {
      toast.error(apiData.message);
    }
  };
  const handleClose = () => {
    setShowConfirm(false);
  };

  return (
    <React.Fragment>
      <Modal
        open={showConfirm}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Confirmation Alert</h2>
          <p id="child-modal-description">
            Are you sure, you want to Verify {data?.fullName}
          </p>

          <Grid container columnSpacing={2}>
            <Grid item xs={4}>
              {" "}
              <Button variant="contained" onClick={handleClose}>
                {" "}
                Cancel
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" color="error" onClick={Verify}>
                Verify
              </Button>
            </Grid>
          </Grid>

          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function CategoryDetailModal({
  showModal,
  setShowModal,
  pageReloader
}) {
  //   const [open, setOpen] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showUnblockModal, setShowUnblockModal] = React.useState(false);
  const [data, setdata] = React.useState(showModal.data);
  console.log(showModal, "<<<<thisismodal");
  const [showVerificationModal, setShowVerificationModal] =
    React.useState(false);
  // let { data } = showModal;
  React.useEffect(() => {
    setdata(showModal.data);
    // return () => {
    //   setShowModal({
    //     data: null,
    //     open: false
    //   });
    // };
  }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const updateState = async () => {
    try {
      const apiData = await CALL_API.CATEGORY.put({ ...data, id: data._id });
      toast.success(apiData.data.message);
      setShowModal(false);
      pageReloader();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {/* <Button onClick={}>Open modal</Button> */}
      <Modal
        open={showModal.open}
        onClose={() => setShowModal({ open: false, data: null })}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography textAlign="center" fontSize={20} fontWeight="bold">
            Edit Category
          </Typography>

          <Grid container textAlign="right" justifyContent="end">
            <Grid item xs={4} textAlign="right">
              <Typography fontSize={20}>
                <MyIcons.PRODUCTS /> {data?.productCount} Products
              </Typography>
            </Grid>
          </Grid>

          <div className="">
            <Typography variant="h5">Name</Typography>{" "}
            <TextField
              value={data?.name}
              onChange={handleChange}
              name="name"
              fullWidth
            />
          </div>
          <br />
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data?.isActive ? true : false}
              name="isActive"
              style={{
                color: data?.isActive ? "green" : "red",
                // border: data?.isActive ? " 1px solid green" : " 1px solid red",
                outline: "none"
              }}
              label=""
              onChange={handleChange}
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </Select>
          </FormControl>
          <br />

          <Typography fontWeight="bold">Description</Typography>
          <textarea
            value={data?.description}
            name="description"
            rows={4}
            style={{
              width: "100%",
              padding: "10px"
            }}
            onChange={handleChange}
          />
          <br />
          <Grid container justifyContent="end">
            <Grid item xs={3} textAlign="right">
              <Button
                // variant=""
                // color="success"
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            </Grid>

            <Grid item xs={3} textAlign="right">
              <Button variant="contained" color="success" onClick={updateState}>
                Update
              </Button>
            </Grid>
          </Grid>
          <BlockModal
            showConfirm={showConfirm}
            data={data}
            closeParent={handleClose}
            setShowConfirm={setShowConfirm}
            pageReloader={pageReloader}
          />
          <UnblockModal
            showConfirm={showUnblockModal}
            data={data}
            closeParent={handleClose}
            setShowConfirm={setShowUnblockModal}
            pageReloader={pageReloader}
          />
          <VerifyUserModal
            showConfirm={showVerificationModal}
            data={data}
            closeParent={handleClose}
            setShowConfirm={setShowVerificationModal}
            pageReloader={pageReloader}
          />
        </Box>
      </Modal>
    </div>
  );
}
