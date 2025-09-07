import HeaderComponent from "../components/HeaderComponent";
import { Outlet } from "react-router-dom";
import logo from "../img/logo.jpg";
import FooterComponent from "./FooterComponent";
const stylef = {
  backgroundColor: "rgba(87, 87, 87, 0.867)",
};
const style = {
  height: "100px",
  width: "100px",
};
const LayoutAuth = () => {
  return (
    <>
      <HeaderComponent style={style} logoSrc={logo} />
      <main>
        <Outlet />
      </main>
      <FooterComponent style={stylef} />
    </>
  );
};

export default LayoutAuth;
