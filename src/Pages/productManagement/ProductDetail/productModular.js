import { Grid } from "@mui/material";
import React, { useState } from "react";
import PartToggler from "src/components/CommonComponents/PartToggler";
import ProductPackageCard, {
  ModularFeature
} from "src/components/CommonComponents/ProductPackageCard";
import { MyTheme } from "src/layouts/customTheme";

function ProductModular({ product = [] }) {
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
        <PartToggler toggle={toggle} setToggle={toggleIt} text="Modular" />
      </Grid>

      {toggle && (
        <Grid container justifyContent="center" columnSpacing={1} p={2}>
          {product?.modular?.map((item, key) => {
            return (
              <Grid item xs={12} md={8}>
                <ModularFeature feature={item} key={item._id} index={key} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Grid>
  );
}

export default ProductModular;
