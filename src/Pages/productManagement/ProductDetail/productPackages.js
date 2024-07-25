import { Grid } from "@mui/material";
import React, { useState } from "react";
import PartToggler from "src/components/CommonComponents/PartToggler";
import ProductPackageCard from "src/components/CommonComponents/ProductPackageCard";
import { MyTheme } from "src/layouts/customTheme";

function ProductPackage({ product = [] }) {
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
        <PartToggler toggle={toggle} setToggle={toggleIt} text="Packages" />
      </Grid>

      {toggle && (
        <Grid container justifyContent="center" columnSpacing={1}>
          {product?.packages?.map((item, key) => {
            return (
              <Grid item xs={12} md={4}>
                <ProductPackageCard onePackage={item} key={item._id} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Grid>
  );
}

export default ProductPackage;
