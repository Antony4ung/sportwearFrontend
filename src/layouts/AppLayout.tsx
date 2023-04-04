import Footer from "@/components/navigations/Footer";
import Header from "@/components/navigations/Header";
import React, { ReactNode, useState } from "react";
import { Box, useTheme } from "@mui/material";
import AppDrawer from "@/components/navigations/Drawer";
type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const { palette } = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: palette.background.default,
        color: palette.text.primary,
        minHeight: "100vh",
      }}
    >
      <AppDrawer isOpen={isDrawerOpen} closeDrawer={closeDrawer} />
        <Header openDrawer={openDrawer} />
        <Box sx={{ minHeight: "80vh" }}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default AppLayout;
