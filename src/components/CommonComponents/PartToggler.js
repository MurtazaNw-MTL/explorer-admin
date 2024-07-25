import { Grid, Typography } from "@mui/material";
import React from "react";
import { MyTheme } from "src/layouts/customTheme";
import { MyIcons } from "src/views/icons/Icons";

function PartToggler({ text = "", setToggle = () => {}, toggle = false }) {
  return (
    <Grid
      container
      borderRadius={5}
      fontSize={18}
      p={2}
      alignItems="center"
      style={{
        background: MyTheme.lightGray2,
        cursor: "pointer"
      }}
      onClick={setToggle}
    >
      <Grid item xs={10}>
        <Typography fontSize={18}>{text}</Typography>
      </Grid>
      <Grid item xs={2} textAlign="right">
        {toggle ? (
          <MyIcons.UPICON fontSize="large" />
        ) : (
          <MyIcons.DOWNICON fontSize="large" />
        )}
      </Grid>
    </Grid>
  );
}

export default PartToggler;
