import { Outlet } from "react-router-dom";
import Header from "../shared/header";
import Footer from "../shared/footer";

const MainLayout = () => {
  return (
    <div className="">
      <Header />
      <div className="max-w-7xl mx-auto min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
