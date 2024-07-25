import { Grid, TextField } from '@mui/material'
import React, { useState } from 'react'

function InternalTxs({arrFields,setarrFields}) {
  // const [arrFields, setarrFields] = useState([{id:1},{id:2}])

  const handleChange=(value,index)=>{
    let temp=[...arrFields]
    temp[index].value=value
    // setarrFields(temp)
    setarrFields(prev=> ({...prev,internTxs:temp}))
  }


  return (
    
   <Grid container spacing={2}  display="flex">
      
      {arrFields.map((item,key)=>{
       return <Grid item xs={12}>
        <TextField label={`Txs${key+1}`} fullWidth value={item.value} key={item.timeStamp} onChange={(e)=> handleChange(e.target.value,key)} />
     </Grid>
      })}
   
   </Grid>
  )
}

export default InternalTxs