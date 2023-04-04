import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import React from "react";
import FlexCenter from "../wrappers/FlexCenterRow";

type Props = {
  next: () => void;
  orderAddress: string;
  setOrderAddress: React.Dispatch<React.SetStateAction<string>>;
  orderPh: string;
  setOrderPh: React.Dispatch<React.SetStateAction<string>>;
  orderPostal: string;
  setOrderPostal: React.Dispatch<React.SetStateAction<string>>;
};

const Delivery = ({
  next,
  orderAddress,
  setOrderAddress,
  orderPh,
  orderPostal,
  setOrderPh,
  setOrderPostal,
}: Props) => {
  return (
    <FlexCenter sx={{ mt: 5 }}>
      <Card sx={{ minWidth: 400, maxWidth: 500 }} variant="outlined">
        <CardHeader
          subheaderTypographyProps={{ textAlign: "center" }}
          subheader="Delivery address"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            sx={{ my: 1 }}
            label="Phone number"
            variant="outlined"
            value={orderPh}
            onChange={(e) => setOrderPh(e.target.value)}
          />
          <TextField
            fullWidth
            sx={{ my: 1 }}
            label="Street and City"
            variant="outlined"
            value={orderAddress}
            onChange={(e) => setOrderAddress(e.target.value)}
          />
          <TextField
            fullWidth
            sx={{ my: 1 }}
            label="Postal code"
            variant="outlined"
            value={orderPostal}
            onChange={(e) => setOrderPostal(e.target.value)}
          />
          <Button disabled={!orderPh || !orderAddress || !orderPostal} onClick={next} fullWidth variant="contained" sx={{ mt: 2 }}>
            Continue
          </Button>
        </CardContent>
      </Card>
    </FlexCenter>
  );
};

export default Delivery;
