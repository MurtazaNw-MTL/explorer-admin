import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CALL_API } from "src/services/APICalls";
import {  toast } from "react-toastify";
import CustomLoader from "src/components/custom-scroll/CustomLoader";
import { CopyIt, convertStringToFormat, showDate } from "src/components/commonfunctions";
import {
  Avatar,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { MyTheme } from "src/layouts/customTheme";
import BusinessIcon from "@mui/icons-material/Business";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import CategoryDetailModal from "./gameDetailModal";
import ShowAvatar, {
  NoData,
  TextAndIcon
} from "src/components/Common/CommonComponent";
import { MyIcons } from "src/views/icons/Icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddCategoryModal from "./addGameModal";
import EditUserModal, { ConfirmationModal } from "./EditUserModal";

const UserList = ({addNewCategory,closeModal,searchField}) => {
  const [tableData, settableData] = useState([]);
  const [showLoader, setshowLoader] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [page, setpage] = useState(1);
  const [searchParams, setSearchParams] = useState();
  const [showModal, setShowModal] = useState({
    open: false,
    data: null
  });
  const navigate = useNavigate();
  const pageReloader = () => setReloadPage(!reloadPage);
  let currPage = new URLSearchParams(window.location.search).get("page") || 1;

  useEffect(() => {
    setpage(currPage);

    getUserList(currPage,searchField);
      // console.log(searchField.length,"<<<thisisuserlist")

  }, [reloadPage, filterData, page, currPage,searchField]);
  const getUserList = async (currPage,searchField) => {
    setshowLoader(true);
    try {
      let payload=filterData
      console.log(searchField,"<<<thisisuserlist")
      if(searchField?.trim() !="" && searchField !=null && searchField?.length>2){
        payload.search =searchField
      }
      let { data } = await CALL_API.USER.get({
        ...payload,
        page: currPage,
        
        // role: "USER"
      });
      if (data.success) {
        setshowLoader(false);
        console.log(data);
        settableData(data.data);
      } else {
        toast.error(data.message);

        setshowLoader(false);
      }
    } catch (error) {
      // toast.error(error.message);
      setshowLoader(false);
      settableData([]);
    }
  };
  return (
    <div>
       <AddCategoryModal pageReloader={pageReloader} show={addNewCategory} closeModal={closeModal} />
     

      {showLoader ? (
        <CustomLoader show={showLoader} />
      ) : (
        <>
          {tableData?.length ? (
            <>
              <UserTable
                tableData={tableData}
                showModal={showModal}
                pageReloader={pageReloader}
                setShowModal={setShowModal}
              />

              <Grid container justifyContent="center" mt={3}>
                <Grid item xs={1} textAlign="right">
                  <MyIcons.LEFTARROW
                    onClick={() => {
                      if (page > 1) {
                        let next = parseInt(page) - +1;
                        navigate("/manage-category?page=" + next);
                      }
                    }}
                    style={{
                      cursor: page == 1 ? "no-drop" : "pointer",
                      color: page > 1 ? MyTheme.bgColor1 : "gray"
                    }}
                  />
                </Grid>
                <Grid item xs={1} textAlign="center">
                  <Typography>{+page}</Typography>
                </Grid>
                <Grid item xs={1} textAlign="left">
                  <MyIcons.RIGHTARROW
                    onClick={() => {
                      // setpage(page + 1)
                      if (tableData.length < 10) return null;
                      let next = parseInt(page) + +1;
                      navigate("/manage-category?page=" + next);
                    }}
                    style={{
                      cursor: tableData?.length != 10 ? "no-drop" : "pointer",
                      color: tableData?.length == 10 ? MyTheme.bgColor1 : "gray"
                    }}
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            <NoData />
          )}
        </>
      )}
    </div>
  );
};

export default UserList;

const UserTable = ({
  tableData = [],
  showModal,
  setShowModal,
  pageReloader
}) => {

const [editModal, seteditModal] = useState({
  show:false,data:{}
})
const [deleteModal, setDeleteModal] = useState({
  show:false,data:{}
})

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      //   backgroundColor: theme.palette.common.black,
      //   color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    },
    // hide last border
    "&:last-child td, &:last-child th, td, th": {
      //   border: "1px solid red",
      padding: "12px 16px !important"
    },
    ":hover": {
      backgroundColor: MyTheme.tableHover
    }
  }));

  const deleteAction=async ()=>{
    try {
      const {data}=await CALL_API.USER.delete(deleteModal.data.address)
      if(data.success){
        pageReloader()
        toast.success(`User successfully deleted`)
        setDeleteModal({show:false,data:null})
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const copyToclipBoard=add=>{
    
     navigator.clipboard.writeText(add);
     toast.success("Address Copied")
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead style={{}}>
          <TableRow>
            <StyledTableCell className="bold fs18">Sr</StyledTableCell>
            <StyledTableCell className="bold fs18">Name</StyledTableCell>
            <StyledTableCell align="center" className="bold fs18">
            Address
            </StyledTableCell>
            <StyledTableCell align="center" className="bold fs18">
       Email
            </StyledTableCell>
            <StyledTableCell align="right" className="bold fs18">
              Created At
            </StyledTableCell>
            {/* <StyledTableCell align="right" className="bold fs18">
              Status
            </StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell align="left">{index + 1}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <Typography>{row?.name}</Typography>
              </StyledTableCell>

              <StyledTableCell align="center" style={{display:"flex",alignItems:"center",gap:"10px", justifyContent:"center",}}> 
                {convertStringToFormat(row?.address)}
 <MyIcons.COPY  onClick={()=>copyToclipBoard(row?.address)} style={{cursor:"pointer",color:MyTheme.bgColor1}}/>
              </StyledTableCell>
           <StyledTableCell align="center">
         {row?.email}
              </StyledTableCell>
            
              <StyledTableCell align="right" >
                {showDate(row.createdAt)}
              </StyledTableCell>
              <StyledTableCell align="right">
               <MyIcons.EDIT onClick={()=>seteditModal({show:true,data:row})} style={{color:MyTheme.bgColor1}}/>
              </StyledTableCell>
              <StyledTableCell align="right">
                <MyIcons.Delete onClick={()=>setDeleteModal({show:true,data:row})} style={{color:"red"}}/>
              </StyledTableCell>
            
             

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      {/*  extras */}
      <CategoryDetailModal
        pageReloader={pageReloader}
        showModal={showModal}
        setShowModal={setShowModal}
      />
       <EditUserModal pageReloader={pageReloader} show={editModal.show}  data={editModal.data} closeModal={()=>seteditModal({show:false,data:{}})} />
       <ConfirmationModal pageReloader={pageReloader} show={deleteModal.show} action={deleteAction}  data={deleteModal.data} message={`Are you sure you want to delete user ${deleteModal.data.name}`} closeModal={()=>setDeleteModal({show:false,data:{}})} />

    </TableContainer>
  );
};
