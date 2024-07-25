import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'

function Vouts({arrFields,setarrFields}) {
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
        <TextField label={`Vout ${key+1}`} fullWidth value={item.value} key={item.timeStamp} onChange={(e)=> handleChange(e.target.value,key)} />
     </Grid>
      })}
   
   </Grid>
  )
}

export function Senders({arrFields,setarrFields}) {
  // const [arrFields, setarrFields] = useState([{id:1},{id:2}])

  const handleChange=(value,index)=>{
    let temp=[...arrFields]
    temp[index].scriptpubkey_address=value
    // setarrFields(temp)

    setarrFields(prev=> ({...prev,vout:temp}))
  }


  return (
    
   <Grid container spacing={2}  display="flex">
      
      {arrFields.map((item,key)=>{
       return <Grid item xs={12}>
        <TextField label={`Address ${key+1}`} fullWidth value={item.scriptpubkey_address} key={item.timeStamp} onChange={(e)=> handleChange(e.target.value,key)} />
     </Grid>
      })}
   
   </Grid>
  )
}
export function Receipent({arrFields,setarrFields}) {
  // const [arrFields, setarrFields] = useState([{id:1},{id:2}])

  const handleChange=(value,index)=>{
    let temp=[...arrFields]
    temp[index].prevout.scriptpubkey_address=value
    // setarrFields(temp)

    setarrFields(prev=> ({...prev,vin:temp}))
  }

  return (
    
    <Grid container spacing={2}  display="flex">
      
      {arrFields.map((item,key)=>{
       return <Grid item xs={12}>
        <TextField label={`Address ${key+1}`} fullWidth value={item.prevout.scriptpubkey_address} key={item.timeStamp} onChange={(e)=> handleChange(e.target.value,key)} />
     </Grid>
      })}
   
   </Grid>
  )
}
export function VinFields({arrFields,setarrFields}) {
  // const [arrFields, setarrFields] = useState([{id:1},{id:2}])

const delteIt=(index)=>{
 let temp=[...arrFields]
 temp[index].witness =null
 setarrFields(prev=> ({...prev,vin:temp}))
}
const addElement=()=>{
   let temp=[...arrFields]
//  temp[index].witness =null
temp.push({witness:["Yes"],prevout:{value:0}})
 setarrFields(prev=> ({...prev,vin:temp}))
}

  const handleChange=(value,index)=>{
    
    let temp=[...arrFields]
    temp[index].witness=null
    // setarrFields(temp)
    setarrFields(prev=> ({...prev,vin:temp}))
  }

  return (
   <Grid container spacing={2}  display="flex">
      {arrFields.map((item,key)=>{
        if(item.witness)
       return <> <Grid item xs={11}>
        <TextField label={`Vin ${key+1}`} fullWidth value={item.witness[0]} key={key} onChange={(e)=> handleChange(e.target.value,key)} />
     </Grid>
    <Grid item xs={1}> <Button onClick={()=>delteIt(key)} variant="text" color="error">Delete</Button></Grid>
     </>
      })}
      <Button onClick={addElement}>+Add </Button>
   
   </Grid>
  )
}

export default Vouts