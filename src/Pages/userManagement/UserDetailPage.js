import { Avatar, Chip, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ShowAvatar from "src/components/Common/CommonComponent";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import { MyTheme } from "src/layouts/customTheme";
import { CALL_API } from "src/services/APICalls";
import { MyIcons } from "src/views/icons/Icons";
import ProfileImage from "../../assets/images/profile/profile.png";
import ReferralUserTable from "./referralList";
import TrasactionList from "./transactionList";
import CustomLoader from "src/components/custom-scroll/CustomLoader";
// import ReferralUsers from "./referralList";

function UserDetailPage() {
  const { id } = useParams();
  const [userData, setuserData] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [toggleReload, setToggleReload] = useState(false);
  const [withdrawRequest, setWithdrawRequest] = useState([]);
  const reloadPage = () => setToggleReload(!toggleReload);

  useEffect(() => {
    (async () => {
      try {
           setShowLoader(true)
      const { data } = await CALL_API.USERS.getDetail({ id });
      console.log(data, "<<<<<<thisisdata");
      setuserData(data.data);
      const withDraw = await CALL_API.TRANSACTION.get({ requestedBy: id });
      setWithdrawRequest(withDraw.data.data);
      setShowLoader(false);
      } catch (error) {
           setShowLoader(false);
      }
   
    })();
  }, [toggleReload]);

  console.log(withdrawRequest, "<<<withDraw");

  const ShowField = (name, value) => {
    return (
      <>
        {/* <Grid item xs={5} md={2} textAlign="right">
{name}
</Grid>
<Grid item xs={1} md={1} textAlign="center">:</Grid> */}
        <Grid item xs={6} md={9} textAlign="left" fontSize={15}>
          {value}
        </Grid>
      </>
    );
  };

  return (
    <PageContainer title="User Detail" description="User Management">
      <DashboardCard title="Detail" back={true}>
        {showLoader ? (
            <CustomLoader />
          ) : (   <Grid container columnSpacing={1}>
          <Grid
            item
            xs={12}
            md={2}
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <ShowAvatar
              name={userData?.firstName}
              src={
                userData?.profileImage ? userData?.profileImage : ProfileImage
              }
              cusStyle={{ width: "8rem", height: "8rem" }}
            />
            {/* <Typography mt={1} fontSize={20}>{userData?.referralCode}</Typography> */}
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography fontSize={20}>
              {userData?.firstName}
              <span style={{ marginLeft: "20px", marginRight: "20px" }}>|</span>
              <Chip
                label={userData?.referralCode}
                style={{ color: MyTheme.bgColor1 }}
              />
            </Typography>
            <Grid container rowGap={1}>
              {/* {ShowField("Referral Code",userData?.referralCode)} */}
              <Grid item xs={12} mt={2} display="flex">
                <MyIcons.EMAIL /> <span style={{ marginLeft: "5px" }}></span>{" "}
                <Typography fontSize={15}>{userData?.email}</Typography>
                <span style={{ marginLeft: "20px", marginRight: "20px" }}>
                  |
                </span>
                <MyIcons.CALL /> <span style={{ marginLeft: "5px" }}></span>{" "}
                {userData?.mobileumber ? (
                  <Typography fontSize={15}>
                    {userData?.mobileNumber}
                  </Typography>
                ) : (
                  "NA"
                )}
                <span style={{ marginLeft: "20px", marginRight: "20px" }}>
                  |
                </span>
                <MyIcons.Location /> <span style={{ marginLeft: "5px" }}></span>{" "}
                {userData?.city ? (
                  <Typography fontSize={15}>
                    {userData?.city} {userData?.countryCode}
                  </Typography>
                ) : (
                  "NA"
                )}
              </Grid>
              {/* <Grid item xs={12} mt={1} display="flex">
                <MyIcons.CALL /> <span style={{ marginLeft: "5px" }}></span>{" "}
                {userData?.mobileumber
                  ? ShowField("Mobile", userData?.mobileNumber)
                  : "NA"}
              </Grid> */}
              {/* <Grid item xs={12} mt={1} display="flex">
                <MyIcons.Location />{" "}
                <span style={{ marginLeft: "5px" }}></span>{" "}
                {userData?.city
                  ? ShowField(
                      "Location",
                      userData?.city + ", " + userData?.countryCode
                    )
                  : "NA"}
              </Grid> */}
              <Grid item xs={12} mt={1} display="flex">
                <MyIcons.Wallet /> <span style={{ marginLeft: "5px" }}></span>
                <Typography fontSize={15}>
                   {userData?.account?.metamaskAddress? userData?.account?.metamaskAddress:"NA"}{" "}
                  <span style={{ marginLeft: "20px", marginRight: "20px" }}>
                    |
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    {userData?.walletAmount} XMR
                  </span>
                </Typography>
                {/* {userData?.city? ShowField("Wallet",userData?.account?.metamaskAddress + "   |   "+userData?.walletAmount+  " XMR"):"NA"} */}
              </Grid>

              {/* {ShowField("Country",userData?.countryCde)} */}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ReferralUserTable referrals={userData?.referrals}  />
          </Grid>
       
            <Grid item xs={12}>
              <TrasactionList
                withdrawData={withdrawRequest}
                reloadPage={reloadPage}
                userData={userData}
              />
            </Grid>
         
        </Grid>
         )}
      </DashboardCard>
    </PageContainer>
  );
}

export default UserDetailPage;
