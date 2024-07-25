import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Chip, Grid, TextField } from "@mui/material";
import { MyTheme } from "src/layouts/customTheme";
import { toast } from "react-toastify";
import CopyAllIcon from "@mui/icons-material/CopyAll";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 24,
  p: 4
};

export default function DescriptionModal({ open, setOpen }) {
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen({ open: false });
  const copyIt = (field, val) => {
    navigator.clipboard.writeText(val);
    toast.success(field + " copied");
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            fontWeight="bold"
            textAlign="center"
            color={MyTheme.bgColor1}
          >
            Project Detail
          </Typography>
          <Grid
            container
            rowSpacing={2}
            mt={3}
            fontWeight="bold"
            fontSize={18}
            alignItems="center"
          >
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontWeight="bold" fontSize={16}>
                  Full Name
                </Typography>
                <CopyAllIcon
                  style={{
                    color: MyTheme.bgColor1,
                    cursor: "pointer"
                  }}
                  onClick={() => copyIt("Name", open?.content?.fullName)}
                />
              </div>
              <TextField value={open?.content?.fullName} fullWidth />
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontWeight="bold" fontSize={16}>
                  Company Name
                </Typography>
                <CopyAllIcon
                  style={{
                    color: MyTheme.bgColor1,
                    cursor: "pointer"
                  }}
                  onClick={() =>
                    copyIt("Company Name", open?.content?.companyName)
                  }
                />
              </div>
              <TextField value={open?.content?.companyName} fullWidth />
            </Grid>

            <Grid item xs={12} md={12}>
              <Grid container>
                <Grid item xs={12} md={8}>
                  Content Details
                </Grid>
              </Grid>

              <Grid
                container
                fontWeight="400"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
              >
                <Grid item xs={4}>
                  Telegram
                </Grid>
                <Grid item xs={8} textAlign="right">
                  {open?.content?.telegram ? open?.content?.telegram : "NA"}{" "}
                  <CopyAllIcon
                    style={{
                      color: MyTheme.bgColor1,
                      cursor: "pointer"
                    }}
                    onClick={() =>
                      copyIt("Telegram Id", open?.content?.telegram)
                    }
                  />
                </Grid>
                <Grid item xs={4} textAlign="left">
                  Email
                </Grid>{" "}
                <Grid item xs={8} textAlign="right">
                  {open?.content?.email ? open?.content?.email : "NA"}{" "}
                  <CopyAllIcon
                    style={{
                      color: MyTheme.bgColor1,
                      cursor: "pointer"
                    }}
                    onClick={() => copyIt("Email Id", open?.content?.email)}
                  />
                </Grid>{" "}
                <Grid item xs={4} textAlign="left">
                  Phone
                </Grid>{" "}
                <Grid item xs={8} textAlign="right">
                  {open?.content?.phone ? open?.content?.phone : "NA"}{" "}
                  <CopyAllIcon
                    style={{
                      color: MyTheme.bgColor1,
                      cursor: "pointer"
                    }}
                    onClick={() => copyIt("Phone", open?.content?.phone)}
                  />
                </Grid>{" "}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={4}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Typography
                // mt={3}
                alignItems="center"
                fontWeight="bold"
                fontSize={18}
                // bgcolor="	#E5E4E2"
                borderRadius={2}
                color={MyTheme.bgColor1}
                // p={1}
              >
                Description{" "}
              </Typography>
              <CopyAllIcon
                style={{
                  color: MyTheme.bgColor1,
                  cursor: "pointer"
                }}
                onClick={() => copyIt("Name", open?.content?.fullName)}
              />
            </div>
          </Grid>

          <Typography
            id="modal-modal-description"
            p={1}
            // sx={{ mt: 2 }}
            bgcolor="#F6F6F6"
          >
            {open?.content?.projectDescription}
          </Typography>
          <Grid container justifyContent="right" mt={2}>
            <Grid item xs={4}>
              {" "}
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>{" "}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
