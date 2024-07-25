import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import { MyTheme } from 'src/layouts/customTheme';
import { MyIcons } from 'src/views/icons/Icons';
import { showDate } from 'src/components/commonfunctions';
import { CALL_API } from 'src/services/APICalls';
import { toast } from 'react-toastify';
import { NoData } from 'src/components/Common/CommonComponent';

const columns = [
  { id: 'Sr', label: 'Sr', minWidth: 20 },
  { id: 'XMR Wallet Address', label: 'XMR Wallet Address', minWidth: 170,align:"center" },
  { id: 'Amount', label: 'Amount', minWidth: 170,align:"center" },
  { id: 'Status', label: 'Status', minWidth: 100,align:"center" },
//   {
//     id: 'Code',
//     label: 'Code',
//     minWidth: 100,
//     align: 'left',
//     format: (value) => value.toLocaleString('en-US'),
//   },
  {
    id: 'Date',
    label: 'Date',
    minWidth: 170,
    align: 'right',

    format: (value) => value.toLocaleString('en-US'),
  },
  
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function TrasactionList({withdrawData=[],reloadPage,userData}) {
  console.log(withdrawData,"<<<<thisisreferrals")
  const [showHide, setShowHide] = React.useState(false)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const hanndleUpdate=async(id,status)=>{
try {
  const {data}=await CALL_API.TRANSACTION.put({id,status})
  if(data.success){
    toast.success(data.message)
    reloadPage()

  }
  console.log(data,"<<<thisiis data")
} catch (error) {
  toast.error(error?.response?.data?.message)
}
}

  // <Paper sx={{ width: '100%', overflow: 'hidden' }}>
  return (
    <>
    <Grid container bgcolor={MyTheme.lightGrapy} px={2} py={1}  mt={3} alignItems="left">
      <Grid item xs={10} >

      <Typography  fontSize={18} >
              Withdrawal Request
            </Typography>
      </Grid>
      <Grid item xs={2} textAlign="right">
       {!showHide? <MyIcons.DOWNICON 
        fontSize='large' onClick={()=>{
        setShowHide(!showHide)
       }}
       />: <MyIcons.UPICON
          fontSize='large'
       onClick={()=>{
        setShowHide(!showHide)
       }}
      />}
       
      </Grid>
    </Grid>
  {showHide &&    <TableContainer sx={{ maxHeight: 440 }}>
      {withdrawData.length >0 ? <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow style={{background:"black",color:"white"}}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,fontSize:"12px",fontSize:"16px" }}
                  
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {withdrawData
              ?.map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}
                      style={{
                    background:   index % 2 != 0? "#e7f1f594":"white",
                    
                  }}
                  >
                   <TableCell >
                        {index+1}
                        </TableCell>
                   <TableCell  align="center" >
                        {userData?.account?.metamaskAddress}
                        </TableCell>
                   <TableCell  align="center" >
                        {row?.amount}
                        </TableCell>
                   <TableCell  align="center">
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={row?.status}
          style={{
            color:row?.status=="APPROVED"?"green":row?.status=="REJECTED"?"red":"blue"
          }}
          onChange={(e)=>{
            hanndleUpdate(row?._id,e.target.value)
          }}
          label="Status"
        >
       
          <MenuItem value="PENDING">Pending</MenuItem>
          <MenuItem value="APPROVED">Approved</MenuItem>
          <MenuItem value="REJECTED">Rejected</MenuItem>
        </Select>
      </FormControl>
                        {/* {row?.status} */}
                        </TableCell>
                   <TableCell  align="right">
                    {showDate(row?.createdAt)}
                        </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>:<NoData text="No Withdrawal Request Found" />}
      </TableContainer>}
      
      </>
      );
      // </Paper>
}