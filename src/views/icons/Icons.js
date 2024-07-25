import React from "react";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import BusinessIcon from "@mui/icons-material/Business";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import ContentCopyIcon from '@mui/icons-material/CopyAll';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardControlKey";
import DOWN_ICON from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MetamaskIcon from "../../assets/images/logos/metamask.png"
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Icons = () => {
  return (
    <PageContainer title="Icons" description="this is Icons">
      <DashboardCard title="Icons">
        <iframe
          src="https://tabler-icons.io/"
          title="Inline Frame Example"
          frameBorder={0}
          width="100%"
          height="650"
        ></iframe>
      </DashboardCard>
    </PageContainer>
  );
};

export const MyIcons = {
  BUSINESS: BusinessIcon,
  EMAIL: EmailRoundedIcon,
  CALL: CallRoundedIcon,
  EYE: RemoveRedEyeIcon,
  SEARCH: SearchIcon,
  LEFTARROW: ArrowBackIosIcon,
  RIGHTARROW: ArrowForwardIosIcon,
  PRODUCTS: ProductionQuantityLimitsIcon,
  EDIT: EditIcon,
  UPICON: UpIcon,
  Delete:DeleteIcon,
  DOWNICON: DOWN_ICON,
  CROSS:ClearIcon,
  CIRCLECHECK: CheckCircleIcon,
  COPY:ContentCopyIcon,
  MetamaskIcon:MetamaskIcon,
  Wallet:AccountBalanceWalletIcon,
  Location:LocationOnIcon
};

export default Icons;
