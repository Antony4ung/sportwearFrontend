import { Container } from "@mui/material";
import React from "react";

interface TabPanelProps {
  children?: React.ReactNode | React.ReactElement;
  index: number;
  value: number;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container maxWidth="lg">{children}</Container>
      )}
    </div>
  );
}
