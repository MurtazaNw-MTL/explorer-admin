import React, { useState } from "react";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import ContentCover from "src/views/sample-page/SamplePage";
import { Button } from "@mui/material";
import AddCategoryModal from "./addRoadMapModal";
import RoadMapList from "./roadMapList";

function RoadMapManagement
() {
  const [addNewCategory, setAddNewCategory] = useState(false);
  const closeModal = () => setAddNewCategory(false);
  // const Action = () => <Button variant="outlined">+ Add New </Button>;
  const callAction = () => setAddNewCategory(true);

  return (
    <PageContainer title="Roadmap Management" description="Roadmap Management">
      <DashboardCard
        title="Roadmap"
        callAction={callAction}
        actionText="+ Add New"
      >
        <RoadMapList addNewCategory={addNewCategory} closeModal={closeModal}/>
       
      </DashboardCard>
    </PageContainer>
  );
}

export default RoadMapManagement
;
