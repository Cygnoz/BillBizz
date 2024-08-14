import { useState } from "react";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import SubHeader from "./SubHeader/SubHeader";
import { Outlet } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Layout = ({}: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex">
      <SideBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <div className="w-[100%]">
        <Header />
        <SubHeader activeIndex={activeIndex} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;