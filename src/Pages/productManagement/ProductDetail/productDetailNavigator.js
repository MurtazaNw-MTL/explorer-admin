import { Grid, Typography } from "@mui/material";
import React from "react";
import { MyTheme } from "src/layouts/customTheme";

function ProductDetailNavigator({ selectedLabel, setselectedLabel }) {
  const TabItem = ({ text }) => {
    return (
      <Grid
        item
        xs={6}
        md={6}
        p={1}
        onClick={() => setselectedLabel(text)}
        style={{
          borderRadius: "10px"
        }}
      >
        <div
          style={{
            border: "1px solid " + MyTheme.bgColor1,
            padding: "10px",
            borderRadius: "5px",
            background: selectedLabel == text ? MyTheme.bgColor1 : "",
            color: selectedLabel == text ? "white" : MyTheme.bgColor1,
            cursor: "pointer"
          }}
        >
          <Typography textAlign="center" fontWeight="bold">
            {text}
          </Typography>
        </div>
      </Grid>
    );
  };
  return (
    <Grid container columnGap={0}>
      <TabItem text="Seller" />
      <TabItem text="Product" />
      {/* <TabItem text="Detail" /> */}
      {/* <TabItem text="Detail" /> */}
    </Grid>
  );
}

export default ProductDetailNavigator;
