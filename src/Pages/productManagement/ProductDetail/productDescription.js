import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import PartToggler from "src/components/CommonComponents/PartToggler";
import { MyTheme } from "src/layouts/customTheme";

function ProductDescription({ product }) {
  const [toggle, setToggle] = useState(false);
  const toggleIt = () => setToggle(!toggle);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography mt={1} fontSize={16} borderRadius={5}>
          {product?.shortDescription}
        </Typography>
        {/* <Typography
          borderRadius={5}
          fontSize={18}
          p={2}
          style={{
            background: MyTheme.lightGrapy
          }}
        >
          Short Description
        </Typography>
        <Typography mt={1} fontSize={16} borderRadius={5}>
          {product?.shortDescription}
        </Typography> */}
      </Grid>
      <Grid
        item
        xs={12}
        mt={3}
        borderRadius={5}
        style={{
          background: MyTheme.lightGrapy
        }}
      >
        {/* <Typography
          borderRadius={5}
          fontSize={18}
          p={2}
          style={{
            background: MyTheme.lightGrapy
          }}
        >
          Description
        </Typography> */}
        <Grid item xs={12} borderRadius={5}>
          <PartToggler
            toggle={toggle}
            setToggle={toggleIt}
            text="Description"
          />
        </Grid>
        {toggle && (
          <Typography mt={1} fontSize={16} borderRadius={5} p={2}>
            {product?.shortDescription}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default ProductDescription;
