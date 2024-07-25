import { Card, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { MyTheme } from 'src/layouts/customTheme'
import { MyIcons } from 'src/views/icons/Icons'
import EditRoadMapModal from './editRoadmMapModal'
import DeleteConfirm from './deleteCofirmModal'

function RoadMapCard({data={},pageReloader}) {
  const [editRoadMap, seteditRoadMap] = useState({
    show:false,
    data:{}
  })
  const [deleteRoadMap, setDeleteRoadMap] = useState({
    show:false,
    data:{}
  })
  const closeModal=()=>seteditRoadMap({show:false,data:{}})
  const closeDelete=()=>setDeleteRoadMap({show:false,data:{}})
  return (
    <Card >
       <EditRoadMapModal pageReloader={pageReloader} data={editRoadMap} closeModal={closeModal} />
       <DeleteConfirm pageReloader={pageReloader} data={deleteRoadMap} closeModal={closeDelete} />

    <Grid container p={2}>
        <Grid item xs={9} md={11}  >
            <Typography  fontSize={20} borderColor="#d8d8d8" fontWeight="bold">{data?.title}</Typography>
            
        </Grid>
        <Grid item xs={3} md={1}  display="flex" width="100%" justifyContent="space-around" >
          
           <MyIcons.EDIT style={{color:MyTheme.bgColor1}} onClick={()=>{
            seteditRoadMap({
              show:true,data
            })
           }}/>
         

           <MyIcons.Delete style={{
           color:"red"}}
           onClick={()=>{
            setDeleteRoadMap({
              show:true,
              data
            })
           }}
           />
         
            
        </Grid>
        <Grid item xs={12}>
            <p>{data?.content}</p>
        </Grid>
        <Grid item xs={12}>
            <Typography textAlign="right" color={MyTheme.bgColor1} >{data?.time}</Typography>
        </Grid>
    </Grid>
    </Card>
  )
}

export default RoadMapCard