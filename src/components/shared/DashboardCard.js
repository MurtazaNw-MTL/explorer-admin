import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Button,
  TextField
} from "@mui/material";
import { MyIcons } from "src/views/icons/Icons";
import { useNavigate } from "react-router";

const DashboardCard = ({
  title,
  subtitle,
  children,
  ActionButton,
  actionText,
  callAction,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  actionSearch=()=>{},
  showSearch=false,
  searchField="",
  back = false
}) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
      {cardheading ? (
        <CardContent>
          <Typography variant="h5">{headtitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: "30px" }}>
          {title ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={"center"}
              mb={3}
            >
              <Box>
                {title ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    {back && (
                      <MyIcons.LEFTARROW
                        onClick={() => {
                          navigate(-1);
                        }}
                      />
                    )}
                    <Typography variant="h5"> {title}</Typography>
                  </div>
                ) : (
                  ""
                )}

                {subtitle ? (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
            <Box display="flex" gap="10px">
  {showSearch && (
    <div style={{position:"relative",display:"flex",alignItems:"center"}}>

      <TextField value={searchField} name="search" onChange={actionSearch}/>
      <div style={{position:"absolute",right:0}}>

      <MyIcons.SEARCH fontSize="large" />
      </div>
    </div>
              )}

{actionText && (
                <Button variant="outlined" onClick={callAction}>
                  {actionText}
                </Button>
              )}
            </Box>
              
            </Stack>
          ) : null}

          {children}
        </CardContent>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
