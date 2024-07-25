import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import { MyTheme } from "src/layouts/customTheme";
import { CALL_API } from "src/services/APICalls";
import { MyIcons } from "src/views/icons/Icons";

function BitCoinTable() {
  const [bitcoinTable, setbitcoinTable] = useState([]);
  const [tableId, settableId] = useState(null)

  useEffect(() => {
    getTableData();
  }, []);
  const getTableData = async () => {
    try {
      const { data } = await CALL_API.table.data({});
      setbitcoinTable(data.data[0].bitcoin);
      settableId(data.data[0]._id)
    } catch (e) {
      console.log(e);
    }
  };
  const onChangeField=(value,index)=>{
    let temp=[...bitcoinTable]
    temp[index]=value
    setbitcoinTable(temp)
  }
  const addNew=()=>{
    setbitcoinTable([...bitcoinTable,null])
  }

  const updateFields=async()=>{
try {
const {data}=await CALL_API.table.update({_id:tableId,bitcoin:bitcoinTable})
if(data.success){
  toast.success(data.message)
}
} catch (error) {
  console.log(error)
  toast.error(error.response.data.message)
}
  }
const deleteField=(value)=>{
  let temp=[...bitcoinTable]
  const index = temp.indexOf(value);
if (index > -1) { // only splice array when item is found
  temp.splice(index, 1); // 2nd parameter means remove one item only
}
setbitcoinTable(temp)
}
console.log(bitcoinTable)
  return (
    <PageContainer
      title="Bitcoin Management"
      description="Bitcoin Management"
    >
      <DashboardCard title="Bitcoin">
        <Grid container gap={3} justifyContent="center">
          {bitcoinTable?.map((item, key) => {
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
          return  <MenuItem key={key} value={item}>{parseData[item]}</MenuItem>
        })}
       
      </Select>
    </FormControl>
  );
};

export default BitCoinTable;
const parseData = {
  size:"Size",
  version:"Version",
  weight:"Weight",
  fee:"Fee",
    "feePerKB":"Fee per KB",
  "feePerKWU":"Fee per KWU",
  is_coinbase:"Coinbase",
  witness:"Witness",
locktime:"Locktime",  
  gasPrice: "Gas Price",
  chainId:"Chain Id",
  email:"Email"


};
const FieldData = [
  "size",
  "weight",
  "is_coinbase",
  "fee",
  "feePerKB",
  "feePerKWU",
  "version",
  "witness",
  "locktime",
  "version",
  "chainId",
  "gasPrice",
  "email"

];
