import AppLayout from "@/layouts/AppLayout";
import React, { ReactNode } from "react";
import { Container, Typography } from "@mui/material";
import OrderHistory from "@/components/table/OrderHistory";
import NoItems from "@/components/404/Notems";
type Props = {};

const History = (props: Props) => {
  return (
    <>
      {0 ? (
        <Container sx={{ my: 5 }} maxWidth="md">
          <Typography sx={{ mb: 2 }} color={"text.secondary"} variant="body1">
            Order history
          </Typography>
          <OrderHistory />
        </Container>
      ) : (
        <NoItems imageSrc="/history.png" title="No orderList " />
      )}
    </>
  );
};

export default History;

History.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout>{page}</AppLayout>;
};
