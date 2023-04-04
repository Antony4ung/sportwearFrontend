import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppLayout from "@/layouts/AppLayout";
import Delivery from "@/components/order/Delivery";
import Payment from "@/components/order/Payment";
import PlaceOrder from "@/components/order/PlaceOrder";
import TabPanel from "@/components/order/TabPannel";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Button from "@mui/material/Button";

const data = [
  {
    label: "Delivery",
    id: 0,
  },
  {
    label: "Payment Method",
    id: 1,
  },
  {
    label: "Place oredr",
    id: 2,
  },
];

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function OrderTabs() {
  const [value, setValue] = useState(0);

  const [orderPh, setOrderPh] = useState("");
  const [orderPostal, setOrderPostal] = useState("");
  const [orderAddress, setOrderAddress] = useState("");
  const [payment, setPayment] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs sx={{ my: 3 }} value={value} onChange={handleChange} centered>
        {data.map((i, index) => (
          <Tab
            disabled={index !== value}
            {...a11yProps(index)}
            key={i.id}
            label={i.label}
          />
        ))}
      </Tabs>

      <Container
        sx={{ my: 5, display: "flex", justifyContent: "end" }}
        maxWidth="lg"
      >
        {value > 0 && (
          <Button
            onClick={() => setValue(value - 1)}
            variant="outlined"
            startIcon={<KeyboardReturnIcon />}
          >
            Back
          </Button>
        )}
      </Container>

      <TabPanel value={value} index={0}>
        <Delivery
          orderAddress={orderAddress}
          setOrderAddress={setOrderAddress}
          orderPh={orderPh}
          setOrderPh={setOrderPh}
          orderPostal={orderPostal}
          setOrderPostal={setOrderPostal}
          next={() => setValue(1)}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Payment
          setPayment={setPayment}
          payment={payment}
          next={() => setValue(2)}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PlaceOrder
          orderAddress={orderAddress}
          orderPh={orderPh}
          orderPostal={orderPostal}
          payment={payment}
        />
      </TabPanel>
    </Box>
  );
}

OrderTabs.getLayout = function getLayout(page: React.ReactNode) {
  return <AppLayout>{page}</AppLayout>;
};
