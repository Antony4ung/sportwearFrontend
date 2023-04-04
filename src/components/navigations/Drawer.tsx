import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Image from "next/image";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

type Props = {
  isOpen: boolean;
  closeDrawer: () => void;
};

const AppDrawer = ({ isOpen, closeDrawer }: Props) => {
  const { data: session, status } = useSession();

  const [drawerData] = React.useState([
    {
      text: "Home",
      navigation: "/",
      icon: <HomeOutlinedIcon />,
    },
    {
      text: "Order History",
      navigation: "/history",
      icon: <QuestionAnswerIcon />,
    },
    {
      text: "Profile",
      navigation: "/profile",
      icon: (
        <Image
          style={{ borderRadius: "50%" }}
          src={session?.user?.image as string || "/userNull.png"}
          alt="logo"
          width={30}
          height={30}
        />
      ),
      
    },
    {
      text: "Logout",
      navigation: "/api/auth/signout",
      icon: <LogoutIcon />,
    },
  ]);

  const router = useRouter();

  return (
    <Drawer
      sx={{
        width: { xs: "100vw", md: "350px" },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: { xs: "100vw", md: "350px" },
          boxSizing: "border-box",
        },
        border: 0,
      }}
      //   variant="permanent"
      onClose={closeDrawer}
      open={isOpen}
      anchor="left"
    >
      <Toolbar />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 4 }}
          onClick={closeDrawer}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* <Divider /> */}
      <ListItem>
        <>
          <ListItemIcon>
            <Image src={"/football.png"} alt="logo" width={30} height={30} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="h5" fontWeight={"bold"}>
                Aung Sport Wears
              </Typography>
            }
          />
        </>
      </ListItem>
      <List>
        {drawerData.map((item, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton
              onClick={() => {
                router.push(item.navigation);
                closeDrawer()
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AppDrawer;
