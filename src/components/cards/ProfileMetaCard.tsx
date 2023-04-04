import React from "react";
import ThemeSwitch from "@/components/theme/ThemeSwitch";
import FlexBetween from "@/components/wrappers/FlexBetween";
import FlexAround from "@/components/wrappers/FlexAround";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type Props = {};

const ProfileMetaCard = (props: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <Card sx={{ my: 5 }} variant="outlined">
      <CardContent sx={{}}>
        <FlexAround sx={{ flexDirection: { xs: "column", md: "row" } }}>
          <Image
            src={(session?.user?.image as string) || "/userNull.png"}
            alt={session?.user?.name as string}
            width={100}
            height={100}
            style={{ borderRadius: "20px" }}
          />
          <Box
            sx={{
              ml: { xs: 0, md: 5 },
              mt: { xs: 3, md: 0 },
              minWidth: "320px",
            }}
          >
            <FlexBetween sx={{ mb: 1 }}>
              <Typography variant="body2"> Name : </Typography>
              <Typography variant="body1"> {session?.user?.name}</Typography>
            </FlexBetween>
            <FlexBetween sx={{ mb: 1 }}>
              <Typography variant="body2"> Email : </Typography>
              <Typography variant="body1">
                {" "}
                {session?.user?.email || "null"}
              </Typography>
            </FlexBetween>
            <FlexBetween sx={{}}>
              <Typography variant="body2"> UserId : </Typography>
              <Typography variant="body1"> {session?.user.id}</Typography>
            </FlexBetween>
          </Box>
        </FlexAround>
        <FlexAround sx={{ mt: 5 }}>
          <ThemeSwitch />
          <Button
            onClick={() => router.push("/api/auth/signout")}
            color="error"
            variant="text"
            endIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </FlexAround>
      </CardContent>
    </Card>
  );
};

export default ProfileMetaCard;
