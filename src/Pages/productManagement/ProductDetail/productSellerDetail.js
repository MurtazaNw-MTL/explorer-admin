import { Button, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import ShowAvatar from "src/components/Common/CommonComponent";

function ProductSellerDetail({ product, onClick }) {
  console.log(product, "<<<<thisisproduct");
  return (
    <div style={{ padding: "10px 0px" }}>
      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          gap={1}
          justifyContent="end"
          // textAlign="right"
        >
          <ShowAvatar name={product?.seller?.fullName} />
          <Typography fontSize={20}>{product?.seller?.fullName}</Typography>
          {/* <Chip
            label={product?.seller?.isVerified ? "Verified" : "Not Verified"}
            color={product?.seller?.isVerified ? "success" : "warning"}
          /> */}
        </Grid>
        <Grid item xs={12}>
          <Button onClick={onClick}>View User</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductSellerDetail;
