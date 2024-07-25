import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons";

import ProfileImg from "src/assets/images/profile/user-1.jpg";
import { STORAGE } from "src/services/baseCall";
import UpdatePassword from "./UpdatePassword";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [updatePasswordModal, setupdatePasswordModal] = useState({show:false})
  const navigate = useNavigate();
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const logoutHandle = async () => {
    if (window.ethereum) {
      const provider = window.ethereum;
      await STORAGE.deleteUser()
      navigate("/auth/login");
      // Request disconnection
    } else {
      console.log("Metamask is not installed or not accessible.");
    }
  };

  return (
    <Box>
      <UpdatePassword show={updatePasswordModal.show} onClose={()=>setupdatePasswordModal({show:false})}/>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main"
          })
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px"
          }
        }}
      >
        {/* <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>*/}
        <MenuItem>
    
          <ListItemText onClick={()=>setupdatePasswordModal({show:true})}>Change Password</ListItemText>
        </MenuItem> 
        <Box mt={1} py={1} px={2}>
          <Button
            // to="/auth/login"
            variant="outlined"
            color="primary"
            // component={Link}
            onClick={logoutHandle}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
