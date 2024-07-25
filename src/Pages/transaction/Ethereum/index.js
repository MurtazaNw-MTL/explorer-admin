import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { isEditable } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditFields from "..";
import { CALL_API } from "src/services/APICalls";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  capitalizeFirstLetter,
  dateTimeTotimeStamp,
  timestampToDateString
} from "src/components/commonfunctions";
import InnerValues from "./InnerValues";
import InternalTxs from "./InnerValues";
import CustomLoader from "src/components/custom-scroll/CustomLoader";

function EthereumFields({ txsData, freeEditableFields, updateIt, network }) {
  const [addFieldData, setaddFieldData] = useState({
    field: null,
    value: null
  });
  const [nonEditableFields, setnonEditableFields] = useState([]);
  const [showLoader, setshowLoader] = useState(false);
  const [editableFields, seteditableFields] = useState(freeEditableFields);
  console.log(updateIt, "<<<<updatedIT");
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
        amtTxsUsd: txsData.data[0]?.amtTxsUsd ? txsData.data[0]?.amtTxsUsd : -1
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
  console.log(nonEditableFields, "<<<thisisNonEditablefield");
  const handleSubmit = async () => {
    try {
      let freeFields = editableFields;

      console.log(freeFields, network, "<<thesearefreefields");
      setshowLoader(true);
      if (updateIt) {
        const { data } =
          network == "Ethereum"
            ? await CALL_API.EthTxsAPIs.update({
                ...nonEditableFields,
                amtTxsUsd: parseInt(nonEditableFields.amtTxsUsd),
                txsFeeUsd: parseInt(nonEditableFields.txsFeeUsd),
                freeFields: JSON.stringify(freeFields)
              })
            : await CALL_API.BtcTxsAPIs.update({
                ...nonEditableFields,
                freeFields: JSON.stringify(freeFields)
              });
        if (data.success) {
          toast.success(data.message);
          setshowLoader(false);
        } else {
          toast.error("!!Error");

          setshowLoader(false);
        }
      } else {
        const { data } =
          network == "Ethereum"
            ? await CALL_API.EthTxsAPIs.create({
                ...nonEditableFields,
                amtTxsUsd: parseInt(nonEditableFields.amtTxsUsd),
                txsFeeUsd: parseInt(nonEditableFields.txsFeeUsd),
                freeFields: JSON.stringify(freeFields)
              })
            : await CALL_API.BtcTxsAPIs.create({
                ...nonEditableFields,
                freeFields: JSON.stringify(freeFields)
              });
        if (data.success) {
          toast.success(data.message);
          setshowLoader(false);
          setTimeout(() => {
            window.location.href = "/transaction-fields";
          }, 2000);
        }
      }
    } catch (error) {
      toast.error("!!Error");
      setshowLoader(false);
      console.log(error);
    }
  };
  const removeEditableField = (rmv) => {
    // console.log(field,"<<<<thisiisfield")
    seteditableFields((res) => res.filter((item) => item.field !== rmv.field));
  };
  const handleChange = (e) => {
    console.log("habndle");
    const { name, value } = e.target;
    setnonEditableFields({ ...nonEditableFields, [name]: value });
  };

  console.log(editableFields);
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
              "baseFeePerGas"
            ].includes(item) &&
            checkType != "object"
          ) {
            if (item == "gas") {
              return (
                <>
                  <Grid item xs={12} md={12}>
                    <Typography>
                      Transaction Fee (Gas Used * Gas Price)
                    </Typography>
                    <Typography
                      border={1}
                      bgcolor="lightgrey"
                      p={2}
                      borderColor="gray"
                      borderRadius={1}
                    >
                      {nonEditableFields.gasUsed * nonEditableFields.gasPrice}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography>
                      {parseData[item]
                        ? parseData[item]
                        : capitalizeFirstLetter(item)}
                    </Typography>
                    <TextField
                      fullWidth
                      name={item}
                      onChange={handleChange}
                      value={nonEditableFields[item]}
                    />
                  </Grid>
                </>
              );
            } else if (item == "timestamp") {
              return (
                <Grid item xs={12} md={6}>
                  {/* <Typography>{item.toUpperCase()}</Typography> */}
                  <Typography>Timestamp</Typography>
                  <TextField
                    fullWidth
                    name={item}
                    type="datetime-local"
                    onChange={(e) => {
                      let timeStamp = dateTimeTotimeStamp(e.target.value);
                      let obj = {
                        ...e,
                        target: {
                          ...e.target,
                          name: "timestamp",
                          value: timeStamp
                        }
                      };

                      handleChange(obj);
                    }}
                    value={timestampToDateString(+nonEditableFields[item])}
                  />
                </Grid>
              );
            }
            return (
              <Grid item xs={12} md={6}>
                {/* <Typography>{item.toUpperCase()}</Typography> */}
                <Typography>
                  {item == "value"
                    ? "Amount transacted"
                    : parseData[item]
                    ? parseData[item]
                    : capitalizeFirstLetter(item)}
                </Typography>
                {(() => {
                  if (["hash"].includes(item))
                    return (
                      <Typography
                        border={1}
                        p={2}
                        borderColor="gray"
                        bgcolor="lightgrey"
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
          }
        })}
      </Grid>
      {nonEditableFields.internalTxs && (
        <Box mt={4}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Internal Txs{" "}
                <span style={{ fontWeight: "normal", fontSize: "14px" }}>
                  ({" "}
                  {nonEditableFields?.internalTxs?.reduce((total, num) => {
                    total = +total + +num.value;
                    return total;
                  }, 0) /
                    10 ** 18}{" "}
                  )
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InternalTxs
                arrFields={nonEditableFields.internalTxs}
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
                {" "}
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

export default EthereumFields;

const parseData = {
  size: "Size",
  version: "Version",
  weight: "Weight",
  fee: "Fee",
  feePerKB: "Fee per KB",
  txsFeeUsd: "Txs Fee (Usd)",
  amtTxsUsd: "Amount Txs (Usd)",
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
