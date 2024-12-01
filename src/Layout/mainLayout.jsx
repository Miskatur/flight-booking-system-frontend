import { Outlet } from "react-router-dom";
import Header from "../shared/header";
import Footer from "../shared/footer";

const MainLayout = () => {
  return (
    <div className="">
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
