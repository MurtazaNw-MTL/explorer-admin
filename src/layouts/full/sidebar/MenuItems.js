import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus
} from "@tabler/icons";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "User Management"
  },
  {
    id: uniqueId(),
    title: "User",
    icon: IconMoodHappy,
    href: "/user-management"
  },

  // {
  //   id: uniqueId(),
  //   title: "Dashboard",
  //   icon: IconLayoutDashboard,
  //   href: "/dashboard"
  // },
  // {
  //   navlabel: true,
  //   subheader: "Utilities"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Typography",
  //   icon: IconTypography,
  //   href: "/ui/typography"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Shadow",
  //   icon: IconCopy,
  //   href: "/ui/shadow"
  // },
  // {
  //   navlabel: true,
  //   subheader: "Auth"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/auth/login"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/auth/register"
  // },
  // {
  //   navlabel: true,
  //   subheader: "Extra"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Sample Page",
  //   icon: IconAperture,
  //   href: "/sample-page"
  // }
];

export const Menuitems2 = [
  {
    navlabel: true,
    subheader: "Dashboard"
  },

  {
    id: uniqueId(),
    title: "User ",
    icon: IconLayoutDashboard,
    href: "/manage-users"
  },
    {
    navlabel: true,
    subheader: "Table"
  },

  {
    id: uniqueId(),
    title: "Ethereum",
    icon: IconLayoutDashboard,
    href: "/manage-ethereum"
  },
  {
    id: uniqueId(),
    title: "Bitcoin",
    icon: IconLayoutDashboard,
    href: "/manage-bitcoin"
  },
      {
    navlabel: true,
    subheader: "Transaction"
  },

  // {
  //   id: uniqueId(),
  //   title: "Bitcoin",
  //   icon: IconLayoutDashboard,
  //   href: "/transaction-bitcoin"
  // },
  {
    id: uniqueId(),
    title: "Manage Fields",
    icon: IconLayoutDashboard,
    href: "/transaction-fields"
  },
  // {
  //   id: uniqueId(),
  //   title: "Manager ",
  //   icon: IconLayoutDashboard,
  //   href: "/manage-users2"
  // },
  // {
  //   navlabel: true,
  //   subheader: "Product"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Category Management",
  //   icon: IconLayoutDashboard,
  //   href: "/manage-category"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Game Management",
  //   icon: IconLayoutDashboard,
  //   href: "/manage-game"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Withdrawal Management",
  //   icon: IconLayoutDashboard,
  //   href: "/manage-transaction"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Privacy Policy",
  //   icon: IconLayoutDashboard,
  //   href: "/privacy-policy"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Terms & Conditions",
  //   icon: IconLayoutDashboard,
  //   href: "/terms-and-conditions"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Roadmap",
  //   icon: IconLayoutDashboard,
  //   href: "/roadmap"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Support",
  //   icon: IconLayoutDashboard,
  //   href: "/support"
  // },
  // {
  //   id: uniqueId(),
  //   title: "About Us",
  //   icon: IconLayoutDashboard,
  //   href: "/about-us"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Product Management",
  //   icon: IconLayoutDashboard,
  //   href: "/manage-product"
  // }
];

export default Menuitems;
