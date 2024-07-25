import React from "react";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import ContentCover from "src/views/sample-page/SamplePage";
import ProductList from "./productList";

function ProductManagement() {
  return (
    <PageContainer title="Product Management" description="Product Management">
      <DashboardCard title="Product">
        <ProductList />
      </DashboardCard>
    </PageContainer>
  );
}

export default ProductManagement;
