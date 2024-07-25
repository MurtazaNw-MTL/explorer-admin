import React, { useState } from "react";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import ContentCover from "src/views/sample-page/SamplePage";
import CategoryList from "./categoryList";
import { Button } from "@mui/material";
import AddCategoryModal from "./AddCategoryModal";

function CategoryManagement() {
  const [addNewCategory, setAddNewCategory] = useState(false);
  const closeModal = () => setAddNewCategory(false);
  // const Action = () => <Button variant="outlined">+ Add New </Button>;
  const callAction = () => setAddNewCategory(true);

  return (
    <PageContainer title="User Management" description="User Management">
      <DashboardCard
        title="Users"
        callAction={callAction}
        actionText="+ Add New"
      >
        <CategoryList />
        <AddCategoryModal show={addNewCategory} closeModal={closeModal} />
      </DashboardCard>
    </PageContainer>
  );
}

export default CategoryManagement;
