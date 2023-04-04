import AppLayout from "@/layouts/AppLayout";
import React, { ReactNode } from "react";

import { Box, Button, Container, Typography } from "@mui/material";
import { useAppSelector } from "@/redux/hooks";
import NoCartItems from "@/components/404/Notems";
import StickyHeadTable from "@/components/table/CartTabl";
import { useRouter } from "next/router";
type Props = {};

const cart = (props: Props) => {
  const router = useRouter()
  const { totalItems, cartItems,totalPrice } = useAppSelector((state) => state.cart);
  return (
    <>
      {cartItems ? (
        <Container sx={{ my: 5 }} maxWidth={"lg"}>
          <Box
            sx={{
              my: 5,
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Typography color={"text.secondary"} variant="subtitle1">
              Total cart items{" "}
            </Typography>
            <Typography variant="body1" sx={{ ml: 2 }}>
              {totalItems}
            </Typography>
          </Box>
          {cartItems && <StickyHeadTable />}

          <Box
            sx={{
              my: 5,
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Typography color={"text.secondary"} variant="subtitle1">
              Total cost{" "}
            </Typography>
            <Typography variant="body1" sx={{ ml: 2 }}>
              {totalPrice} Ks
            </Typography>
          </Box>
          
          <Box sx={{display:'flex',justifyContent:"end"}}> 
            <Button onClick={()=>router.push("/order")} variant="contained" sx={{minWidth:"200px"}}>Place an order</Button>
          </Box>

        </Container>
      ) : (
        <NoCartItems title="No cart items found" imageSrc="/empty-cart.png"/>
      )}
    </>
  );
};

export default cart;

cart.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout>{page}</AppLayout>;
};
