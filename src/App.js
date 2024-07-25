import { CssBaseline, ThemeProvider } from "@mui/material";
import { useNavigate, useRoutes } from "react-router-dom";
import Router from "./routes/Router";
import "./styles/global.css";
import "./styles/tooltip.css";
import "./styles/users.css";
import "./styles/product.css";
import "react-image-gallery/styles/css/image-gallery.css";

import "react-toastify/dist/ReactToastify.css";

import { baselightTheme } from "./theme/DefaultColors";
import { Provider } from "react-redux";
import { store } from "../src/Redux/Store";
import MetamaskLogin from "./components/metamask/metamasklogin";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { STORAGE } from "./services/baseCall";
// dfd
function App() {
  const navigate=useNavigate()
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  useEffect(() => {
    (async ()=>{
      const data=await STORAGE.getUser()
      console.log(data,"<<<this is data")
if(data){
  navigate("/")
}else{
  // navigate("/")
  navigate("/auth/login")
}
    })()

  }, [])
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {routing}
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
