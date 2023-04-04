import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import { useSession } from "next-auth/react";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import Image from "next/image";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/dist/client/router";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement;
  openDrawer: () => void;
}

function ScrollTop(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

const settings = [
  { text: "Profile", navi: "/profile" },
  { text: "OrderHistory", navi: "/history" },
  { text: "Logout", navi: "/api/auth/signout" },
];

export default function BackToTop(props: Props) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const router = useRouter();

  const { data: session, status } = useSession();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { totalItems } = useAppSelector((state) => state.cart);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar color="inherit">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", md: "space-around" },
            alignItems: "center",
          }}
        >
          <Link href={"/"}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image src="/football.png" width={35} height={35} alt={""} />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  ml: 2,
                  // display: { xs: "none", md: "block" },
                  
                }}
              >
                AungSportWears
              </Typography>
            </Box>
          </Link>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {status === "loading" ? (
              <CircularProgress />
            ) : session?.user && status === "authenticated" ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                
                <IconButton
                  onClick={() => router.push("/cart")}
                  sx={{ mr: { xs: 1, md: 2 } }}
                >
                  <Badge
                    badgeContent={totalItems}
                    invisible={totalItems < 0}
                    color="primary"
                  >
                    <ShoppingCartIcon color="action" />
                  </Badge>
                </IconButton>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, display: { xs: "none", md: "block" } }}
                >
                  <Avatar
                    alt={session?.user?.name as string}
                    src={session?.user?.image as string}
                  />
                </IconButton>

                <IconButton
                  onClick={props.openDrawer}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            ) : (
              <Button
                variant="text"
                onClick={() => router.push("/api/auth/signin")}
              >
                Login
              </Button>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  sx={{
                    width: "200px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  key={setting.navi}
                  onClick={() => {
                    handleCloseUserMenu();
                    router.push(setting.navi);
                  }}
                >
                  <Typography textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />

      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
