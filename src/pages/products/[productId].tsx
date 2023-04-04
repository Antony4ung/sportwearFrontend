import RenderLoader from "@/components/loader/RenderLoader";
import AppLayout from "@/layouts/AppLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  ProductDetailsFail,
  ProductDetailsReq,
  ProductDetailsSuccess,
} from "@/redux/slices/productDetailSlice";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "react-toastify";
import SizeFilter from "@/components/productFilters/SizeFilter";
import {useSession} from "next-auth/react"

type Props = {};

const ProductDetails = (props: Props) => {
  const router = useRouter();

  const {data:session} = useSession()

  const { productId } = router.query;

  const dispatch = useAppDispatch();

  const { product, loading } = useAppSelector((state) => state.ProductDetail);
  const [selSize, setSelSize] = useState("");

  const { palette } = useTheme();

  const getProductDetails = async (productId: string) => {
    try {
      dispatch(ProductDetailsReq());

      const { data } = await axios.get(
        `${process.env.BACKEND_API_URL}/products/${productId}`
      );

      dispatch(ProductDetailsSuccess({ data }));
    } catch (error) {
      dispatch(ProductDetailsFail({ error }));
    }
  };

  const addToCartClick = () => {
    if (selSize.trim().length <= 0) {
      toast("Please select size", {
        autoClose: 1000,
        type: toast.TYPE.ERROR,
      });
    } else {
      dispatch(
        addToCart({
          data: {
            id: product?._id,
            name: product?.name,
            photoUrl: product?.photoUrl,
            category: product?.category,
            count: 1,
            price: product?.price,
            size: selSize,
          },
        })
      );
      toast("Added to cart", {
        autoClose: 1000,
        type: toast.TYPE.SUCCESS,
      });
    }
  }

  useEffect(() => {
    if (typeof productId === "string") {
      getProductDetails(productId);
    }
  }, [productId]);

  if (loading) {
    <RenderLoader width="100vw" height="92vh" />;
  }

  return (
    <>
      {product && (
        <Container
          sx={{ mt: { xs: 3, md: 5 }, pt: { xs: 2, md: 5 } }}
          maxWidth="lg"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{ flexWrap: "wrap", my: 1 }}
                component="div"
              >
                {product.name}
              </Typography>
              <Typography
                variant="body1"
                color={"text.secondary"}
                sx={{ flexWrap: "wrap", my: 1 }}
                component="div"
              >
                {product.description}
              </Typography>

              <Card variant="outlined" sx={{ maxWidth: "100%", mt: 5, px: 5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 2,
                  }}
                >
                  <Typography color={"text.secondary"} variant={"subtitle1"}>
                    Price
                  </Typography>
                  <Typography variant={"body1"}>{product.price} Ks</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 2,
                  }}
                >
                  <Typography color={"text.secondary"} variant={"subtitle1"}>
                    Rating
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 0 }}
                    color={
                      product.rating > 3
                        ? palette.success.light
                        : palette.error.light
                    }
                  >
                    {product.rating}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 2,
                  }}
                >
                  <Typography color={"text.secondary"} variant={"subtitle1"}>
                    Size
                  </Typography>
                  <SizeFilter
                    instockSizes={product.inStock}
                    size={selSize}
                    setSize={setSelSize}
                  />
                </Box>
              </Card>

              {session?.user ? <Button
                size="large"
                onClick={addToCartClick}
                sx={{ mt: 5 }}
                variant="contained"
                fullWidth
                disabled={!session?.user.id}
              >
                {" "}
                Add to cart <AddShoppingCartIcon sx={{ ml: 3 }} />
              </Button> : <Button onClick={()=>router.push("/api/auth/signin")} variant='outlined' sx={{mt:3}} size='small'>
            Login to buy
        </Button>}
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: { xs: 5, md: 0 },
              }}
              item
              xs={12}
              md={6}
            >
              <Image
                src={product.photoUrl}
                alt="product"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "70%", height: "auto" }}
              />
            </Grid>
            
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ProductDetails;

ProductDetails.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout>{page} </AppLayout>;
};
