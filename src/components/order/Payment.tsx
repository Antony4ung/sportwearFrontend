import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import FlexCenter from "../wrappers/FlexCenterRow";

type Props = {
  next: () => void;
  setPayment: React.Dispatch<React.SetStateAction<string>>;
  payment: string;
};

const data = [
  {
    value: "wavepay",
    label: "Wave Pay",
    image: "",
  },
  {
    value: "kpay",
    label: "KBZ Pay",
    image: "",
  },
  {
    value: "cbpay",
    label: "CB Pay",
    image: "",
  },
];

const Payment = ({ next, setPayment, payment }: Props) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayment((event.target as HTMLInputElement).value);
  };

  return (
    <FlexCenter sx={{ mt: 5 }}>
      <Card sx={{ minWidth: 400, maxWidth: 500 }} variant="outlined">
        <CardHeader
          subheaderTypographyProps={{ textAlign: "center" }}
          subheader="Payment Methods"
        />
        <Divider />
        <CardContent>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={payment}
              onChange={handleChange}
            >
              <FormControlLabel
                value="kbz"
                control={<Radio />}
                label="KBZ Pay"
              />
              <FormControlLabel
                value="wave"
                control={<Radio />}
                label="Wave Pay"
              />
              <FormControlLabel value="cb" control={<Radio />} label="CB pay" />
            </RadioGroup>
          </FormControl>

          <Button disabled={!payment} onClick={next} fullWidth variant="contained" sx={{ mt: 2 }}>
            Continue
          </Button>
        </CardContent>
      </Card>
    </FlexCenter>
  );
};

export default Payment;
