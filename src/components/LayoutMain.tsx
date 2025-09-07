import HeaderComponent from "../components/HeaderComponent";
import { Outlet } from "react-router-dom";
import logo from "../img/the-cooffe.webp";
import FooterComponent from "./FooterComponent";
const stylef = {
  backgroundColor: "black",
};
const style = {
  height: "100px",
  width: "320px",
};
const LayoutMain = () => {
  return (
    <>
      <HeaderComponent showCartIcon={false} style={style} logoSrc={logo} />
      <main>
        <Outlet />
      </main>
      <FooterComponent style={stylef} />
    </>
  );
};

export default LayoutMain;
