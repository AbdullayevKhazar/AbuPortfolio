import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Drawer from "../components/Drawer";
import { useState } from "react";
const MainLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Navbar openDrawer={() => setDrawerOpen(true)} />
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
