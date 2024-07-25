import { Details } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import { CALL_API } from "src/services/APICalls";
import ProductNameCategory from "./ProductNameCategory";
import { Button, Grid, Typography } from "@mui/material";
import ProductDetailNavigator from "./productDetailNavigator";
import ProductSellerDetail from "./productSellerDetail";
import UserDetailModal from "src/Pages/userManagement/UserDetailModal";
import { MyTheme } from "src/layouts/customTheme";
import ProductDescription from "./productDescription";
import { MyGallery } from "src/components/CommonComponents/ImageGallery";
import ProductDetailMedia from "./productDetailMedia";
import ProductPackage from "./productPackages";
import ProductModular from "./productModular";
import ProductVerificationAction from "./productVerificationAction";
import CustomLoader from "src/components/custom-scroll/CustomLoader";

function ProductDetail() {
  const { name, id } = useParams();
  const [productDetail, setproductDetail] = useState({});
  const [selectedLabel, setselectedLabel] = useState("Seller");
  const [isLoading, setIsLoading] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [showModal, setShowModal] = useState({
    open: false,
    data: null
  });
  useEffect(() => {
    getProduct();
  }, [reloadPage]);

  const pageReloader = () => setReloadPage(!reloadPage);
  const getProduct = async () => {
    try {
      setIsLoading(true);
      const { data } = await CALL_API.PRODUCT.get({ _id: id });
      if (data.success) {
        setproductDetail(data.data[0]);
        setShowModal({ ...showModal, data: data?.data[0]?.seller });
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <PageContainer title={name} description="Product Management">
      <DashboardCard title="Product Detail">
        {isLoading ? (
          <CustomLoader show={isLoading} />
        ) : (
          <Grid container alignItems="center">
            <Grid item xs={10}>
              <ProductNameCategory product={productDetail} />
            </Grid>
            <Grid item xs={2} textAlign="right">
              <ProductSellerDetail
                product={productDetail}
                onClick={() => {
                  setShowModal({
                    ...showModal,
                    open: true,
                    data: productDetail?.seller
                  });
                }}
              />
            </Grid>
            {/* 
          <Grid item xs={12} mt={2}>
            <ProductDetailNavigator
              selectedLabel={selectedLabel}
              setselectedLabel={setselectedLabel}
            />
          </Grid>
           */}
            {/* <Grid item xs={12}>
            <ProductSellerDetail product={productDetail} />
          </Grid> */}
            {/* <hr> */}
            <Grid item xs={12}>
              <ProductDescription product={productDetail} />
            </Grid>
            {/* <Grid></Grid> */}
            <Grid item xs={12} margin="auto">
              <ProductDetailMedia image={productDetail?.media} />
            </Grid>
            <Grid item xs={12} margin="auto">
              <ProductPackage product={productDetail} />
            </Grid>
            <Grid item xs={12} margin="auto">
              <ProductModular product={productDetail} />
            </Grid>
            <Grid item xs={12} margin="auto" mt={2}>
              <ProductVerificationAction
                product={productDetail}
                pageReloader={pageReloader}
              />
            </Grid>
          </Grid>
        )}

        {showModal.open && (
          <UserDetailModal
            pageReloader={pageReloader}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </DashboardCard>
    </PageContainer>
  );
}

export default ProductDetail;
