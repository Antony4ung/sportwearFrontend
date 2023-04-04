import React from "react";
import { Box, TextField, Button, Card } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Image from "next/image";
import { toast } from "react-toastify";

type Props = {};

const HomeBanner = (props: Props) => {
  return (
    <Box
      sx={{
        minHeight: "40vh",
        my: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <Card variant="outlined" sx={{display: "flex",
        justifyContent: "center",
        alignItems: "center",p:5}}>
        <TextField
          sx={{ minWidth: "300px" }}
          size="small"
          id="outlined-basic"
          label="Get latest news from us"
        />
        <Button onClick={()=>{
          toast("Email subscribed", {
            autoClose: 1000,
            type: toast.TYPE.INFO,
          });
        }} size="large" sx={{ml:1}} variant="contained">
          <NotificationsActiveIcon />
      </Button>
      </Card>
    </Box>
  );
};

export default HomeBanner;
