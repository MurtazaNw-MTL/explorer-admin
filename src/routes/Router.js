import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";
// import UserManagement from "src/Pages/userManagement";
import UserManagement from "src/Pages/userManagement1";
import EthereumTable from "src/Pages/tableFields";
import BitCoinTable from "src/Pages/tableFields/bitcoinTable";
import EthEditFields from "src/Pages/transaction";
import EditFields from "src/Pages/transaction";
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank/BlankLayout"))
);
const Dashboard = Loadable(lazy(() => import("../views/dashboard/Dashboard")));
const Error = Loadable(lazy(() => import("../views/authentication/Error")));
const Register = Loadable(
  lazy(() => import("../views/authentication/Register"))
);
const Login = Loadable(lazy(() => import("../views/authentication/Login")));

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/manage-users" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      // { path: "/user-detail/:id", exact: true, element: <UserDetailPage /> },
      { path: "/manage-users", exact: true, element: <UserManagement /> },
      { path: "/manage-game", exact: true, element: <UserManagement /> },
      { path: "/manage-ethereum", exact: true, element: <EthereumTable /> },
      { path: "/manage-bitcoin", exact: true, element: <BitCoinTable /> },
      { path: "/transaction-fields", exact: true, element: <EditFields /> },
      // { path: "/privacy-policy", exact: true, element: <PrivacyPolicy /> },
      // { path: "/terms-and-conditions", exact: true, element: <TermsConditions /> },
      // { path: "/roadmap", exact: true, element: <RoadMapManagement /> },
      // { path: "/support", exact: true, element: <Support /> },
      // { path: "/about-us", exact: true, element: <AboutUs /> },
      // {
      //   path: "/product-detail/:name/:id",
      //   exact: true,
      //   element: <ProductDetail />
      // },
      // {
      //   path: "/manage-games",
      //   exact: true,
      //   element: <GameManagement />
      // },
      // {
      //   path: "/manage-product",
      //   exact: true,
      //   element: <ProductManagement />
      // },
      // { path: "/sample-page", exact: true, element: <SamplePage /> },
      // { path: "/icons", exact: true, element: <Icons /> },
      // { path: "/ui/typography", exact: true, element: <TypographyPage /> },
      // { path: "/ui/shadow", exact: true, element: <Shadow /> },
      { path: "*", element: <Navigate to="/auth/404" /> }
    ]
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/login", element: <Login /> },
      { path: "*", element: <Navigate to="/auth/404" /> }
    ]
  }
];

export default Router;
