import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { MyGallery } from "src/components/CommonComponents/ImageGallery";
import PartToggler from "src/components/CommonComponents/PartToggler";
import { MyTheme } from "src/layouts/customTheme";

function ProductDetailMedia({ image }) {
  const [toggle, setToggle] = useState(false);
  const toggleIt = () => setToggle(!toggle);
  return (
    <Grid
      container
      mt={3}
      borderRadius={5}
      style={{
        background: MyTheme.lightGrapy
      }}
    >
      <Grid item xs={12}>
        <PartToggler toggle={toggle} setToggle={toggleIt} text="Images" />
      </Grid>
      {toggle && (
        <Grid item xs={12} md={10} margin="auto">
          <MyGallery image={image} />
        </Grid>
      )}
    </Grid>
  );
}

export default ProductDetailMedia;
