import React, { useEffect, useState } from "react";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CALL_API } from "src/services/APICalls";
import { showDate } from "src/components/commonfunctions";
import { Box, Chip, Typography } from "@mui/material";
import DescriptionModal from "./DescriptionModal";
import { toast } from "react-toastify";
function AllSubscriber() {
  //   let ActionButton = <Button variant="contained">Add</Button>;
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    (async () => {
      let { data } = await CALL_API.sunscription.get();
      console.log(data);
      setTableData(data.data);
    })();
  }, []);

  return (
    <PageContainer title="Explorer Subscribers" description="">
      <DashboardCard title="Subscribers">
        <BasicTable rows={tableData} />
      </DashboardCard>
    </PageContainer>
  );
}

const BasicTable = ({ rows }) => {
  const [open, setOpen] = React.useState({
    open: false,
    content: ""
  });

  const title = {
    fontWeight: "bold",
    fontSize: "17px"
  };
  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <DescriptionModal open={open} setOpen={setOpen} />
      <TableHead>
        <TableRow>
          <TableCell style={title}>Sr No</TableCell>

          <TableCell style={title} align="left ">
            Name
          </TableCell>

          <TableCell style={title} align="left">
            Telegram
          </TableCell>
          <TableCell style={title} align="left">
            Contact
          </TableCell>

          <TableCell style={title} align="center">
            Created At
          </TableCell>
          {/* <TableCell align="center">Protein&nbsp;(g)</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow
            style={{
              fontSize: "18px",
              background: index % 2 == 0 ? "#e8e8e8" : "white"
            }}
            key={row._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell align="left" style={{ fontSize: "16px" }}>
              <Box textAlign="left" mb={1}>
                {row.fullName}
              </Box>
              <Chip label={row?.companyName} color="info" variant="outlined" />
            </TableCell>
            <TableCell align="left" style={{ fontSize: "16px" }}>
              {row?.telegram}
            </TableCell>
            <TableCell align="left" style={{ fontSize: "16px" }}>
              <Box mb={1}>{row.email}</Box>
              <Chip label={row?.phone} color="info" variant="outlined" />
            </TableCell>
            <TableCell align="center" style={{ fontSize: "16px" }}>
              {showDate(row.createdAt)}
            </TableCell>
            <TableCell align="center" style={{ fontSize: "16px" }}>
              <Chip
                label=" View"
                style={{
                  color: "white",

                  background: "#1ea1f2"
                }}
                onClick={() => {
                  setOpen({
                    open: true,
                    content: row
                  });
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default AllSubscriber;
