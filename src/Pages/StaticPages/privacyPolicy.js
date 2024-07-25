import { Button, Grid, TextField, Typography } from "@mui/material";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TextEditor from "src/components/CommonComponents/TextEditor";
import PageContainer from "src/components/container/PageContainer";
import CustomLoader from "src/components/custom-scroll/CustomLoader";
import DashboardCard from "src/components/shared/DashboardCard";
import { CALL_API } from "src/services/APICalls";

function PrivacyPolicy() {
  const [showLoader, setshowLoader] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });
  const [editorState, setEditorState] = useState("<h3>Loading...</h3>");
  //   const [editorState, setEditorState] = useState(() =>
  //     EditorState.createEmpty()
  //   );

  useEffect(() => {
    try {
      (async () => {
        setshowLoader(true);
        const { data } = await CALL_API.STATIC.getPrivacyPolicy({
          _id: "64e2f86fe3b33857ca4c7bf5"
        });
        console.log(data, "<<<<privacy");
        if (data.success) {
          let privacyData = data.data[0];
          console.log(privacyData, "<<<<thisisprivacyData");

          setFormData({ ...formData, ...privacyData });
          setEditorState(privacyData.content);
          setshowLoader(false);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(editorState, "<<<thisisconvertedcontent");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const submit = async () => {
    try {
      console.log(formData, "<<<thisisformdata");
      const { data } = await CALL_API.STATIC.privacyUpdate(formData);

      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <PageContainer title="Privacy Policy" description="Privacy Policy">
      <DashboardCard title="Privacy Policy">
        {showLoader ? (
          <CustomLoader />
        ) : (
          <Grid container rowSpacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Typography fontSize={18} mb={1}>
                Title
              </Typography>
              <TextField
                fullWidth
                value={formData?.title}
                onChange={handleChange}
                name="title"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={18} mb={1}>
                Content
              </Typography>

              <TextEditor
                convertedContent={editorState}
                setConvertedContent={setEditorState}
                setFormData={setFormData}
                formData={formData}
              />
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Button
                fullWidth
                style={{ margin: "auto" }}
                onClick={submit}
                variant="contained"
              >
                Update
              </Button>
            </Grid>
          </Grid>
        )}
      </DashboardCard>
    </PageContainer>
  );
}

export default PrivacyPolicy;
