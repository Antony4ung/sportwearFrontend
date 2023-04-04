import React from "react";
import { Container, Grid } from "@mui/material";
import ProductCard from "../cards/ProductCard";
import { useAppSelector } from "@/redux/hooks";

type Props = {};

const HomeProductsShow = (props: Props) => {
  const { products, loading, error } = useAppSelector(
    (state) => state.homeProducts
  );

  return (
    <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center" }}>
      <Grid container spacing={3}>
        {products && products.map((item) => <ProductCard key={item._id} data={item} />)}
      </Grid>
    </Container>
  );
};

export default HomeProductsShow;
