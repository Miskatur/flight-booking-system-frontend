import { Outlet } from "react-router-dom";
import Header from "../shared/header";
import Footer from "../shared/footer";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
