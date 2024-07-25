import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import { MyTheme } from "src/layouts/customTheme";
import { CALL_API } from "src/services/APICalls";
import { MyIcons } from "src/views/icons/Icons";

function EthereumTable() {
  const [ethereumTable, setethereumTable] = useState([]);
  const [tableId, settableId] = useState(null)

  useEffect(() => {
    getTableData();
  }, []);
  const getTableData = async () => {
    try {
      const { data } = await CALL_API.table.data({});
      setethereumTable(data.data[0].ethereum);
      settableId(data.data[0]._id)
    } catch (e) {
      console.log(e);
    }
  };
  const onChangeField=(value,index)=>{
    let temp=[...ethereumTable]
    temp[index]=value
    setethereumTable(temp)
  }
  const addNew=()=>{
    setethereumTable([...ethereumTable,null])
  }

  const updateFields=async()=>{
try {
const {data}=await CALL_API.table.update({_id:tableId,ethereum:ethereumTable})
if(data.success){
  toast.success(data.message)
}
} catch (error) {
  console.log(error)
  toast.error(error.response.data.message)
}
  }
const deleteField=(value)=>{
  let temp=[...ethereumTable]
  const index = temp.indexOf(value);
if (index > -1) { // only splice array when item is found
  temp.splice(index, 1); // 2nd parameter means remove one item only
}
setethereumTable(temp)
}
console.log(ethereumTable)
  return (
    <PageContainer
      title="Ethereum Management"
      description="Withdrawal Management"
    >
      <DashboardCard title="Ethereum">
        <Grid container gap={3} justifyContent="center">
          {ethereumTable?.map((item, key) => {
            return (
              <>
              <Grid item key={item} xs={9} display="flex" alignItems="center" gap="10px">
                <InputField currIndex={key} onChange={onChangeField} label={`Field ${key + 1}`} value={item} />
               {/* <MyIcons.CROSS onClick={()=>deleteField(item)}/> */}
              </Grid>
            
              </>
            );
          })}
          {/* <Grid item xs={12} textAlign="center">
          <Button variant="outlined" onClick={addNew}>+ Add New</Button>
          </Grid> */}
          <Grid item xs={6} textAlign="center">
              <Button variant="contained" style={{background:MyTheme.bgColor2,color:"white"}} fullWidth  onClick={updateFields}> Save </Button>
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
}
const InputField = ({ label,currIndex, value,onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={(e)=>onChange(e.target.value,currIndex)}
      >
        <MenuItem  value={null}>None</MenuItem>
        {FieldData?.map((item,key)=>{
          return  <MenuItem key={item} value={item}>{parseData[item]}</MenuItem>
        })}
       
      </Select>
    </FormControl>
  );
};

export default EthereumTable;

const parseData = {
"from_email":"From email",
  "to_email":"To email",
  "v":"v",
  "maxPriorityFeePerGas":"Max priority fee per gas",
  chainId:"Chain Id",
  gasPrice: "Gas Price",
  // "baseFeePerGas":"Base Gas Fees",
  gas:"Gas Limit",
hash:"hash",
input:"input",
nonce:"nonce",
"r":"r",
"baseFeePerGas":"Base fee per gas",
s:"s",
to:"to",
transactionIndex:"Transaction Index",
"type":"type",
value:"Internal Value",
"data":"data",
"timestamp":"Time"

};
const FieldData = [
  "chainId",
  "gasPrice",
  "gas",
  "maxPriorityFeePerGas",
  "baseFeePerGas",
  "hash",
  "input",
  "nonce",
  "r",
  "s",
  "v",
  "to",
  "transactionIndex",
  "type",
  "value",
  "data",
  "timestamp",
  "from_email",
  "to_email"
];
