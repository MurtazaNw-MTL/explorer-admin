import React from "react";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import ContentCover from "src/views/sample-page/SamplePage";
import UsersList from "./userList";

function UserManagement() {
  return (
    <PageContainer title="User Management" description="User Management">
      <DashboardCard title="Users">
        <UsersList />
      </DashboardCard>
    </PageContainer>
  );
}

export default UserManagement;
