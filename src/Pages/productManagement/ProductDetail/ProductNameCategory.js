import { Chip, Grid, Typography } from "@mui/material";
import React from "react";
import { MyTheme } from "src/layouts/customTheme";

function ProductNameCategory({ product = {} }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography fontSize={22} fontWeight="bold" color={MyTheme.bgColor2}>
          {product?.title}
        </Typography>
        <Grid item xs={12} mt={2}>
          <div className="productDetailCat">
            {product?.category?.map((item, key) => {
              return <Chip label={item?.name} />;
            })}
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductNameCategory;
