import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL

const getHeader = async() => {
  const userData =await STORAGE.getUser()
  console.log(userData,"<<<<thisisuserdata")
  const header = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiaGprbGFkYXNkQEExIiwiaWF0IjoxNjk2NjY3MzA1fQ.MevfV6iADRqXXcvk_g1oOa9JydH-O6rmKMbHGC5nf18`
  };
  return header;
};


// const baseUrl = process.env.REACT_APP_BASE_URL;dd

export const BASE_CALL = {
  post: async (url, payload) =>
    await axios.post(baseUrl + url, payload, {
      headers:await getHeader()
    }),
  put: async (url, payload) =>
    await axios.put(baseUrl + url, payload, {
      headers:await getHeader()
    }),
  get: async (url, params) =>
    await axios.get(baseUrl + url, {
      params,
      headers:await getHeader()
    }),
  delete: async (url, payload) =>
    await axios.delete(baseUrl + url, {
      headers: await getHeader(),
      data:payload
    })
};




export  const STORAGE={ 
  // EXPLORER
  saveUser:async (data)=>await localStorage.setItem("PMow80A47F",JSON.stringify(data)),
  getUser:async (data)=>{
    const user=await localStorage.getItem("PMow80A47F")
  if(user){
    return JSON.parse(user)
  }else {
    return null
  }
  },
  deleteUser:async (data)=>await localStorage.removeItem("PMow80A47F"),

  
}