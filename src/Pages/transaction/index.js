import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import PageContainer from "src/components/container/PageContainer";
import CustomLoader from "src/components/custom-scroll/CustomLoader";
import DashboardCard from "src/components/shared/DashboardCard";
import EthereumFields from "./Ethereum";
import { BASE_CALL } from "src/services/baseCall";
import { CALL_API } from "src/services/APICalls";
import { toast } from "react-toastify";
import BitCoinTable from "../tableFields/bitcoinTable";
import BitcoinFields from "./Bitcoin";

function EditFields() {
  const [txsId, setTxsId] = useState("");
  const [txsData, settxsData] = useState(null);
  const handleTxsChange = (e) => setTxsId(e.target.value);
  const [showTxsLoader, setshowTxsLoader] = useState(false);
  const [freeEditableFields, setfreeEditableFields] = useState([]);
  const [netWork, setnetWork] = useState(null);

  const [updateIt, setupdateIt] = useState(false);
  const handleSubmitTxs = async (e) => {
    e.preventDefault();
    if (txsId.trim() == "")
      return toast.error("Please enter transaction field.");
    try {
      setshowTxsLoader(true);
      const checkDbData = await CALL_API.EthTxsAPIs.getRemoteTxsDAta({
        searchItem: txsId,
        pageNumber: 1
      });
      if(checkDbData.data.message =="Data cannot be found for invalid address"){
      setshowTxsLoader(false)
        return toast.error(checkDbData.data.message)
      }
      console.log("CheckDbData", checkDbData.data);
      setnetWork(checkDbData.data.data.network);

      const { data } =
        checkDbData.data.data.network == "Ethereum"
          ? await CALL_API.EthTxsAPIs?.get({
              hash: txsId,
              pageNumber: 1
            })
          : await CALL_API.BtcTxsAPIs?.get({
              hash: txsId,
              pageNumber: 1
            });

      console.log("Networkdatas", data.data);
      setupdateIt(true);

      updateDeditableFields(data.data, checkDbData.data.data.network);
      settxsData({ data: data.data });
      setshowTxsLoader(false);
    } catch (error) {
      console.log(error, "<<<Error");
      const { data } = await CALL_API.EthTxsAPIs.getRemoteTxsDAta({
        searchItem: txsId,
        pageNumber: 1
      });
      console.log(data,"<<<remote")
      settxsData(data.data);  
      setshowTxsLoader(false);
      if(data.data.network=="Ethereum"){
        setfreeEditableFields([
           
          {
            field: "r",
            value: data.data.data[0].r
          },
          {
            field: "s",
            value: data.data.data[0].s
          },
          {
            field: "v",
            value: data.data.data[0].v
          },
          // {
          //   field: "Internal value",
          //   value: data.data.data[0].value
          // },
          {
            field: "Base Fee Per Gas",
       
            value: data.data.data[0].baseFeePerGas
            // value: data.data.data[0].value
          },
          // 
         
        ]);
      }else {
 setfreeEditableFields([
           
          {
            field: "Size",
            value: data.data.data[0].size
          },
          // {
          //   field: "Weight",
          //   value: data.data.data[0].weight
          // },
          {
            field: "Locktime",
            value: data.data.data[0].locktime
          },
          {
            field: "Version",
            value: data.data.data[0].version
          },
      
          // 
         
        ]);
      }
    }
  };
  const updateDeditableFields = (Ardata, network) => {
    const data=Ardata[0]
    if (data?.freeFields) {
      console.log("Freefields",data)

      
      let parsed = JSON.parse(data.freeFields);
      if (parsed.length) setfreeEditableFields(parsed);
    
  };}

  console.log(txsData, "<<<<transactiondata");
  return (
    <>
      <PageContainer title=" Transaction" description="Ethereum Transaction">
        <DashboardCard title="">
          <form onSubmit={handleSubmitTxs}>
            <Grid container rowGap={2} justifyContent="center" alignItems="center">
              <Grid xs={12} item md={7}   sm={12} textAlign="center">
                <TextField
                  value={txsId}
                  onChange={handleTxsChange}
                  placeholder="Enter Transaction hash"
                  sx={{}}
                  fullWidth
                />
              </Grid>
              <Grid
              item
                xs={12}
                md={1}
                 sm={12}
                style={{ height: "53px" }}
                textAlign="center"
                alignItems="center"
              >
                {showTxsLoader ? (
                  <CustomLoader />
                ) : (
                  <Button
                    type="submit"
                    style={{ height: "100%" }}
                    variant="outlined"
                  >
                    Search
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </DashboardCard>
      {!showTxsLoader &&  <Box mt={4}>
          { txsData && netWork=="Ethereum" && (
            <DashboardCard title="Transaction">
              <EthereumFields
                freeEditableFields={freeEditableFields}
                network={netWork}
                updateIt={updateIt}
                txsData={txsData}
              />
            </DashboardCard>
          )}
          {  netWork=="Bitcoin" && (
            <DashboardCard title="Transaction">
              <BitcoinFields
                freeEditableFields={freeEditableFields}
                network={netWork}
                updateIt={updateIt}
                txsData={txsData}
              />
            </DashboardCard>
          )}
        </Box>}
      </PageContainer>
    </>
  );
}

export default EditFields;
