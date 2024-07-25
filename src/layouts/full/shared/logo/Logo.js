import { Link } from "react-router-dom";
import { ReactComponent as LogoDark } from "src/assets/images/logos/dark-logo.svg";
import { styled } from "@mui/material";
import logo from "../../../../assets/images/logos/favicon.png";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block"
}));

const Logo = () => {
  return (
    <LinkStyled
      to="/"
      style={{ textAlign: "center", width: "100%", height: "100%" }}
    >
      {/* <LogoDark height={70} /> */}
      <img src={logo} style={{ width: "5rem", objectFit: "contain" }} />
    </LinkStyled>
  );
};

export default Logo;
