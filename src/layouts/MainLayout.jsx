import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64">
      <Navbar/>
      <div className="pt-20 md:pt-24 lg:pt-24">
        <Outlet/>
      </div>
    </div>
  );
};

export default MainLayout;
