import React, { useEffect } from "react";
import { MetaMaskSDK } from "@metamask/sdk";
import { ACTIONS } from "src/Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CALL_API } from "src/services/APICalls";
import { toast } from "react-toastify";
import { STORAGE } from "src/services/baseCall";
const MMSDK = new MetaMaskSDK({});
function MetamaskLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { metamask } = useSelector((state) => state.AllState);
  console.log(metamask, "<<<thisis state");

  useEffect(() => {
    showPopup2();
    return () => {};
  }, [metamask.address]);
const showPopup2=async()=>{
  try {
  const user=await STORAGE.getUser()
  console.log(user,"<<<<thisisuser")
  if(!user) navigate("/auth/login")
    
  } catch (error) {
    console.log("Error",error)
  }
}

  const showPopup = async () => {
    // return null;
    if (window.ethereum) {
      let checkSession = await sessionStorage.getItem("metamask");
      // if (checkSession != "true") return navigate("/auth/login");

      try {
        if (!metamask.address) {
          // alert("hrere");
          // navigate("/auth/login");
          await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then(async (res) => {
              let address = res[0];

              console.log("my address---->", res);

              const { data } = await CALL_API.users.getByWallet(address);
              console.log(data.data, "metamaskloginuserlogin");
              if (!data.success)
                return toast.error("You are not authorized to access it");
              if (data.data[0].role == "admin") {
                ACTIONS.saveMetamaskDetails(dispatch, { address });
                // toast.success("Login successful!");
                navigate("/");
              } else {
                toast.error("You are not authorized to access it");
              }
            });
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("install metamask extension!!");
    }
  };
  return <div></div>;
}

export default MetamaskLogin;
