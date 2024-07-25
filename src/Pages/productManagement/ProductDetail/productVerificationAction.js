import { Box, Button, Grid, Modal } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { CALL_API } from "src/services/APICalls";
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
  data
  // closeParent
}) {
  // const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleOpen = () => {
    setShowConfirm(true);
  };

  const blockUser = async () => {
    if (message.trim() == "") return toast.error("Message can't be empty");
    try {
      let apiData = await CALL_API.PRODUCT.verify({
        isVerified: false,
        verificationMessage: message,
        _id: data._id
      });
      if (apiData.data.success) {
        toast.error(`${data?.title} has been blocked`);
        handleClose();
        pageReloader();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const approveProduct = async () => {
    try {
      let apiData = await CALL_API.PRODUCT.verify({
        isVerified: true,
        verificationMessage: null,
        _id: data._id
      });
      if (apiData.data.success) {
        toast.success(`Product has been approved`);
        handleClose();

        pageReloader();
      }
    } catch (error) {
      toast.error(error.message);
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
function ApproveModal({
  showConfirm,
  setShowConfirm,
  pageReloader,
  data
  // closeParent
}) {
  // const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleOpen = () => {
    setShowConfirm(true);
  };

  const approveProduct = async () => {
    try {
      let apiData = await CALL_API.PRODUCT.verify({
        isVerified: true,
        verificationMessage: null,
        _id: data._id
      });
      if (apiData.data.success) {
        toast.success(`Product has been approved`);
        handleClose();

        pageReloader();
      }
    } catch (error) {
      toast.error(error.message);
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

          <Grid container columnSpacing={2}>
            <Grid item xs={4}>
              {" "}
              <Button onClick={handleClose}> Cancel</Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="success"
                onClick={approveProduct}
              >
                Approve
              </Button>
            </Grid>
          </Grid>

          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function ProductVerificationAction({ product, pageReloader }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showApproveModal, setshowApproveModal] = useState(false);

  // const blockProduct = () => {
  //   // not verify
  // };

  return (
    <Grid container justifyContent="end">
      <Grid item xs={4} textAlign="right">
        {product?.isVerified && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => setShowConfirm(true)}
          >
            Block
          </Button>
        )}
        {!product?.isVerified && (
          <Button
            variant="contained"
            color="success"
            onClick={() => setshowApproveModal(true)}
          >
            Verify
          </Button>
        )}
        <BlockModal
          showConfirm={showConfirm}
          data={product}
          setShowConfirm={setShowConfirm}
          pageReloader={pageReloader}
        />
        <ApproveModal
          showConfirm={showApproveModal}
          data={product}
          // pageReloader={}
          setShowConfirm={setshowApproveModal}
          pageReloader={pageReloader}
        />
      </Grid>
    </Grid>
  );
}

export default ProductVerificationAction;
