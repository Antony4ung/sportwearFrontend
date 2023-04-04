import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { IconButton, useTheme } from "@mui/material";
import Image from "next/dist/client/image";
import Chip from "@mui/material/Chip";
import { productType } from "@/types/general";
import { useRouter } from "next/router";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axios from "axios";
import { useSession } from "next-auth/react";
import { userSuccess } from "@/redux/slices/userSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function ProductCard({ data }: { data: productType }) {
  const router = useRouter();
  const [isFav, setIsFav] = React.useState(false);

  const { data: session } = useSession();

  const { palette } = useTheme();

  const { data: userData } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleFavAction = async () => {
    const { data: retData } = await axios.post(
      `${process.env.BACKEND_API_URL}/users/${session?.user.id}/fav/${data._id}`
    );

    dispatch(userSuccess({ data : retData }));

    setIsFav(
      retData.favProducts.findIndex(
        (i : productType) => i._id === `${data._id.toString()}`
      ) >= 0
    );
  };

  React.useEffect(() => {
    if (userData?.favProducts) {
      // setIsFav();
      setIsFav(
        userData?.favProducts.findIndex(
          (i) => i._id === `${data._id.toString()}`
        ) >= 0
      );
    }
  }, [userData, data]);

  return (
    <Grid item xs={12} md={3} sx={{}}>
      <Card sx={{ width: "100%" }} variant="outlined">
        <React.Fragment>
          <CardActions sx={{ justifyContent: "space-between" }}>
            <Chip
              sx={{ mb: 1 }}
              label={data.category.name}
              variant="outlined"
            />
            {session?.user && (
              <IconButton onClick={handleFavAction}>
                {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            )}
          </CardActions>
          <CardContent
            className="productCard"
            onClick={() => router.push(`/products/${data._id}`)}
          >
            {/* category */}

            <Typography
              variant="body1"
              fontWeight={600}
              sx={{ flexWrap: "wrap", my: 1 }}
              component="div"
            >
              {data.name}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
              <Image
                className="productCardImage"
                src={data.photoUrl}
                alt="product"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "70%", height: "auto" }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{}} color="text.secondary">
                {data.price} Ks
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body1"
                  sx={{ mb: 0 }}
                  color={
                    data.rating >= 3
                      ? palette.success.light
                      : palette.error.light
                  }
                >
                  {data.rating}
                </Typography>

                <StarIcon
                  color={data.rating >= 3 ? "success" : "error"}
                  fontSize="small"
                />
              </Box>
            </Box>
          </CardContent>
          {/* {
            session?.user && <CardActions>
            <Button
              sx={{}}
              onClick={() => router.push(`/products/${data._id}`)}
              size="small"
            >
              <AddShoppingCartIcon />
            </Button>
            <Button size="small">
              <FavoriteBorderIcon />
            </Button>
          </CardActions>
          } */}
        </React.Fragment>
      </Card>
    </Grid>
  );
}
