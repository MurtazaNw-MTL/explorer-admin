import React, { useState } from "react";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import ContentCover from "src/views/sample-page/SamplePage";
import CategoryList from "./gameList";
import { Button } from "@mui/material";
import AddCategoryModal from "./addGameModal";
import { Search } from "@mui/icons-material";
import Fileinput from "./fileinput.js";

function UserManagement() {
  const [addNewCategory, setAddNewCategory] = useState(false);
  const [seachField, setseachField] = useState("");
  const closeModal = () => setAddNewCategory(false);
  const actionSearch = (e) => setseachField((prev) => e.target.value);
  // const Action = () => <Button variant="outlined">+ Add New </Button>;
  const callAction = () => setAddNewCategory(true);

  return (
    <PageContainer title="User Management" description="User Management">
      <DashboardCard
        title="Users"
        callAction={callAction}
        actionText="+ Add New"
        actionSearch={actionSearch}
        searchField={seachField}
        showSearch={true}
      >
        {/* <Fileinput/> */}
        <CategoryList
          searchField={seachField}
          addNewCategory={addNewCategory}
          closeModal={closeModal}
        />
      </DashboardCard>
    </PageContainer>
  );
}

export default UserManagement;
