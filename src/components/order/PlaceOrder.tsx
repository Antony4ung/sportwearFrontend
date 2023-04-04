import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart } from "@/redux/slices/cartSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import NoItems from "../404/Notems";
import FlexAround from "../wrappers/FlexAround";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import {useSession} from 'next-auth/react'

type Props = {
  orderAddress: string;
  orderPh: string;
  orderPostal: string;
  payment:string
};


const PlaceOrder = ({orderPh,orderAddress,orderPostal,payment}: Props) => {
  const { cartItems, totalPrice } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const {data:session} = useSession()

  const removeClick = (removeID: string, sizeRm: string) => {
    dispatch(
      removeFromCart({
        id: removeID,
        size: sizeRm,
      })
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card sx={{ maxWidth: "100%" }} variant="outlined">
          <CardContent>
            <Box>
              <Typography
                sx={{ mb: 2 }}
                color={"text.secondary"}
                variant="body2"
              >
                Delivery address details
              </Typography>
              <Typography sx={{ mb: 2 }} color={"text.primary"} variant="body1">
                {session?.user.email} / {orderPh} / {orderAddress} / {orderPostal}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ mt: 3 }}>
              <Typography
                sx={{ mb: 2 }}
                color={"text.secondary"}
                variant="body2"
              >
                Payment method
              </Typography>
              <Typography sx={{ mb: 2 }} color={"text.primary"} variant="body1">
                {payment}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Button disabled={!orderPh || !orderAddress || !orderPostal || !payment || !cartItems } sx={{ my: 2 }} fullWidth variant="contained">
          { !orderPh || !orderAddress || !orderPostal || !payment || !cartItems ? "First fill details or go cart" : "Order confirm"}
        </Button>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card variant="outlined">
          <CardHeader
            subheaderTypographyProps={{ textAlign: "right" }}
            subheader="checkout"
          />
          <Divider />
          <CardContent>
            {cartItems ? (
              <>
                {cartItems.map((i) => (
                  <Box key={i.id}>
                    <FlexAround sx={{ my: 2, jusContent: "space-evenly" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Image
                          alt={i.name}
                          src={i.photoUrl}
                          width={50}
                          height={50}
                        />
                        <Typography sx={{ maxWidth: "200px", ml: 2 }}>
                          {i.name}
                        </Typography>
                      </Box>

                      <Typography variant="body2">{i.count}x</Typography>

                      <Typography variant="h6">{i.price} Ks</Typography>
                      <IconButton onClick={() => removeClick(i.id, i.size)}>
                        <DoDisturbOnIcon />
                      </IconButton>
                    </FlexAround>
                  </Box>
                ))}
                <Divider />
                <Box
                  sx={{
                    my: 2,
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
              </>
            ) : (
              <NoItems
                h="40vh"
                title="No cart items"
                imageSrc="/empty-cart.png"
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PlaceOrder;
