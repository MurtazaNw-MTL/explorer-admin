import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import { isEditable } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditFields from "..";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CALL_API } from "src/services/APICalls";
import {
  capitalizeFirstLetter,
  dateTimeTotimeStamp,
  timestampToDateString
} from "src/components/commonfunctions";
import Vouts, { Receipent, Senders, VinFields } from "./InnterValues";
import CustomLoader from "src/components/custom-scroll/CustomLoader";

function BitcoinFields({ txsData, freeEditableFields, updateIt, network }) {
  const [addFieldData, setaddFieldData] = useState({
    field: null,
    value: null
  });
  const [nonEditableFields, setnonEditableFields] = useState([]);
  const [showLoader, setshowLoader] = useState(false);
  const [editableFields, seteditableFields] = useState(freeEditableFields);
  const [toggle, settoggle] = useState(false);
  const showAddField = () => {
    if (addFieldData.field != null)
      return toast.error("Please fill the above field");
    setaddFieldData({ field: "", value: "" });
  };

  useEffect(() => {
    if (txsData.data.length) {
      setnonEditableFields({
        ...txsData.data[0],
        txsFeeUsd: txsData.data[0]?.txsFeeUsd ? txsData.data[0]?.txsFeeUsd : -1,
        amtTxsUsd: txsData.data[0]?.amtTxsUsd ? txsData.data[0]?.amtTxsUsd : -1,
        witness:
          typeof txsData.data[0]?.witness == "boolean"
            ? txsData.data[0]?.witness
              ? true
              : false
            : txsData.data[0]?.vin?.length &&
              txsData.data[0]?.vin[0]?.witness?.length
            ? true
            : false
      });
    }
  }, [txsData]);

  const handleEditableField = (e, index) => {
    const { name, value } = e.target;
    seteditableFields((res) => {
      let temp = [...res];
      temp[index] = { ...temp[index], [name]: value };
      return temp;
    });
  };

  const handleSubmit = async () => {
    try {
      let freeFields = editableFields;

      setshowLoader(true);
      if (updateIt) {
        let payload = {
          ...nonEditableFields,
          amtTxsUsd: parseInt(nonEditableFields.amtTxsUsd),
          txsFeeUsd: parseInt(nonEditableFields.txsFeeUsd),

          freeFields: JSON.stringify(freeFields)
        };
        delete payload.sigops;
        const { data } = await CALL_API.BtcTxsAPIs.update(payload);
        if (data.success) {
          toast.success(data.message);
          settoggle(!toggle);
          setshowLoader(false);
        } else {
          toast.error("Error while updating ");
          setshowLoader(false);
        }
      } else {
        let payload = {
          ...nonEditableFields,
          amtTxsUsd: parseInt(nonEditableFields.amtTxsUsd),
          txsFeeUsd: parseInt(nonEditableFields.txsFeeUsd),

          freeFields: JSON.stringify(freeFields)
        };
        delete payload.sigops;
        const { data } = await CALL_API.BtcTxsAPIs.create(payload);
        if (data.success) {
          toast.success(data.message);
          settoggle(!toggle);
          setshowLoader(false);
          setTimeout(() => {
            window.location.href = "/transaction-fields";
          }, 2000);
        } else {
          toast.error("!!Error");
          setshowLoader(false);
        }
      }
    } catch (error) {
      console.log(error);
      setshowLoader(false);
      toast.error("!!Error");
    }
  };
  const removeEditableField = (rmv) => {
    seteditableFields((res) => res.filter((item) => item.field !== rmv.field));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setnonEditableFields({ ...nonEditableFields, [name]: value });
  };
  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setnonEditableFields({
      ...nonEditableFields,
      status: { ...nonEditableFields.status, [name]: value }
    });
  };

  return (
    <div>
      <Grid container spacing={2}>
        {Object.keys(nonEditableFields)?.map((item, key) => {
          let checkType = typeof nonEditableFields[item];

          if (
            ![
              "_id",
              "__v",
              "freeFields",
              "r",
              "s",
              "v",
              "internalTxs",
              "size",
              "version",
              "locktime"
            ].includes(item) &&
            checkType != "object"
          )
            return (
              <Grid item xs={12} md={6}>
                {/* <Typography>{item.toUpperCase()}</Typography> */}
                <Typography>
                  {parseData[item]
                    ? parseData[item]
                    : capitalizeFirstLetter(item)}
                </Typography>
                {(() => {
                  if (["chainId", "txid"].includes(item))
                    return (
                      <Typography
                        border={1}
                        bgcolor="lightgrey"
                        p={2}
                        borderColor="gray"
                        borderRadius={1}
                      >
                        {nonEditableFields[item]}
                      </Typography>
                    );
                  else
                    return (
                      <TextField
                        fullWidth
                        name={item}
                        onChange={handleChange}
                        value={nonEditableFields[item]}
                      />
                    );
                })()}
              </Grid>
            );
        })}

        <Grid item xs={12} md={6}>
          <Typography>Fee Per KB (Fee / Size)</Typography>
          <Typography
            border={1}
            bgcolor="lightgrey"
            p={2}
            borderColor="gray"
            borderRadius={1}
          >
            {nonEditableFields.fee / nonEditableFields.size}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Fee Per KWU (Fee / Weight)</Typography>
          <Typography
            border={1}
            bgcolor="lightgrey"
            p={2}
            borderColor="gray"
            borderRadius={1}
          >
            {nonEditableFields.fee / nonEditableFields.weight}
          </Typography>
        </Grid>
        {nonEditableFields?.status &&
          Object.keys(nonEditableFields.status)?.map((item, key) => {
            return (
              <Grid item xs={12} md={6}>
                <Typography>
                  {parseData[item]
                    ? parseData[item]
                    : capitalizeFirstLetter(item)}
                </Typography>
                {(() => {
                  if (["confirmed"].includes(item))
                    return (
                      <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">Confirmed</InputLabel> */}
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={nonEditableFields.status[item]}
                          name="confirmed"
                          label="Confirmed"
                          onChange={handleStatusChange}
                        >
                          <MenuItem value={true}>True</MenuItem>
                          <MenuItem value={false}>False</MenuItem>
                        </Select>
                      </FormControl>
                    );
                  if (item == "block_time") {
                    return (
                      <TextField
                        fullWidth
                        type="datetime-local"
                        name={item}
                        onChange={(e) => {
                          let timeStamp = dateTimeTotimeStamp(e.target.value);
                          let obj = {
                            ...e,
                            target: {
                              ...e.target,
                              name: "block_time",
                              value: timeStamp
                            }
                          };

                          handleStatusChange(obj);
                        }}
                        value={timestampToDateString(
                          nonEditableFields.status[item]
                        )}
                      />
                    );
                  } else
                    return (
                      <TextField
                        fullWidth
                        name={item}
                        onChange={handleStatusChange}
                        value={nonEditableFields.status[item]}
                      />
                    );
                })()}
              </Grid>
            );
          })}
      </Grid>
      <Grid item xs={12} md={6} mt={2}>
        <Typography>Amount Transacted ( Sum of Vout Value(s) )</Typography>
        <Typography
          border={1}
          p={2}
          bgcolor="lightgrey"
          borderColor="gray"
          borderRadius={1}
        >
          {nonEditableFields?.vout?.reduce((total, curr) => {
            return +total + +curr.value;
          }, 0) /
            10 ** 8}
        </Typography>
      </Grid>
      {nonEditableFields?.vout?.length && (
        <Box mt={4}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Vout Values</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Vouts
                arrFields={nonEditableFields.vout}
                setarrFields={setnonEditableFields}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      )}

      {nonEditableFields?.vin?.length && (
        <Box mt={4}>
          <Typography>Witness</Typography>
          <Switch
            checked={nonEditableFields.witness}
            onChange={(event) => {
              setnonEditableFields({
                ...nonEditableFields,
                witness: !nonEditableFields.witness
              });
            }}
          />
          {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        </AccordionSummary>
        <AccordionDetails>
            <VinFields
            arrFields={nonEditableFields.vin}
            setarrFields={setnonEditableFields}
          />
        </AccordionDetails>
      </Accordion> */}
        </Box>
      )}
      {nonEditableFields?.vin?.length && (
        <Box mt={4}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Sender ({nonEditableFields?.vin?.length})</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Receipent
                arrFields={nonEditableFields.vin}
                setarrFields={setnonEditableFields}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
      {nonEditableFields?.vout?.length && (
        <Box mt={4}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Recipients ({nonEditableFields?.vout?.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Senders
                arrFields={nonEditableFields.vout}
                setarrFields={setnonEditableFields}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
      <Box mt={4}>
        <Typography my={4} fontSize={20} fontWeight="bold">
          Free Fields
        </Typography>

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {editableFields?.map((item, key) => {
            return (
              <>
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    name="field"
                    label="Field"
                    value={item.field}
                    onChange={(e) => handleEditableField(e, key)}
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    name="value"
                    label={"Value"}
                    value={item.value}
                    onChange={(e) => handleEditableField(e, key)}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    color="error"
                    onClick={() => removeEditableField(item)}
                  >
                    Delete
                  </Button>
                </Grid>
              </>
            );
          })}

          {addFieldData.field != null && (
            <AddFieldForm
              addFieldData={addFieldData}
              editableFields={editableFields}
              seteditableFields={seteditableFields}
              setaddFieldData={setaddFieldData}
            />
          )}
          <Grid item xs={12} textAlign="center">
            <Button onClick={showAddField}> + Add Field</Button>
          </Grid>
          <Grid item xs={12} md={6} mt={4} textAlign="center">
            {showLoader ? (
              <CustomLoader />
            ) : (
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

const AddFieldForm = ({
  addFieldData,
  seteditableFields,
  setaddFieldData,
  editableFields
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setaddFieldData({ ...addFieldData, [name]: value });
  };
  const handleSubmit = () => {
    if (!addFieldData.field.trim() || !addFieldData.value.trim())
      return toast.error("Field/Value both are required");
    seteditableFields([...editableFields, addFieldData]);
    setaddFieldData({ field: null, value: null });
  };
  return (
    <>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Field"
          value={addFieldData.field}
          name="field"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Value"
          value={addFieldData.value}
          name="value"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6} md={1} textAlign="center">
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </Grid>
    </>
  );
};

export default BitcoinFields;

const parseData = {
  size: "Size",
  version: "Version",
  weight: "Weight",
  txsFeeUsd: "Txs Fee (Usd)",
  amtTxsUsd: "Amount Txs (Usd)",
  fee: "Fee",
  feePerKB: "Fee per KB",
  feePerKWU: "Fee per KWU",
  is_coinbase: "Coinbase",
  witness: "Witness",
  locktime: "Locktime",
  gasPrice: "Gas Price",
  chainId: "Chain Id",
  email: "Email",
  blockHash: "Block Hash",
  blockNumber: "Block Number",
  transactionIndex: "Transaction Index",
  baseFeePerGas: "Base Fee Per Gas",
  gasUsed: "Gas Used"
};
