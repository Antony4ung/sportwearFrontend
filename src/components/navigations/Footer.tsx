import React from "react";
import { Container, Grid, Typography,Box ,useTheme,Divider} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const footerData = [
  {
    image: "/call.png",
    header: "Call us",
    data: "+959343423422",
    link: "tel:+959343423422",
  },
  {
    image: "/location.png",
    header: "Location",
    data: "Myawaddy, Kayin State, Myanmar",
    link: "",
  },
  {
    image: "/gmail.png",
    header: "Send a mail",
    data: "thua0524@gmail.com",
    link: "mailto:thua0524@gmail.com",
  },
  {
    image: "/facebook.png",
    header: "Contact us",
    data: "aungsportwear",
    link: "www.facebook.com/aungsportwear",
  },
];

const Footer = (props: Props) => {
  const {palette} = useTheme();

  return (
    <Box sx={{display:"flex",justifyContent:"center"}}>
      <Container maxWidth="xl" sx={{}}>
      <Grid
        spacing={4}
        container
        sx={{ minHeight: "25vh", display: "flex", alignItems: "center", my: 2 }}
      >
        {footerData.map((item, index) => (
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
            }}
            key={index}
            item
            xs={12}
            md={3}
          >
            <Image width={40} height={40} src={item.image} alt={item.data} />

            <Typography sx={{ mt: 2 }} fontWeight={600} variant="h6">
              {item.header}
            </Typography>

            <Link href={item.link}>
              <Typography sx={{ mt: 1 }} variant="body2">
                {item.data}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Box sx={{}}>
        <Divider/>
        <Typography textAlign={'center'} sx={{py:4}} color="gray" variant="body2">© 2023 Aung Sport Wears. All rights reserved.</Typography>
      </Box>
    </Container>
    </Box>
  );
};

export default Footer;
