import AppLayout from "@/layouts/AppLayout";
import { Container, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import RenderLoader from "@/components/loader/RenderLoader";
import ProfileMetaCard from "@/components/cards/ProfileMetaCard";
import FavTable from "@/components/table/FavTable";
import { useAppSelector } from "@/redux/hooks";

type Props = {};

const Profile = (props: Props) => {
  const { status } = useSession();

  if (status === "loading") {
    return <RenderLoader height="92vh" width="100vw" />;
  }

  const {
    data: { favProducts },
  } = useAppSelector((state) => state.user);

  return (
    <Container maxWidth="md">
      <ProfileMetaCard />
      {favProducts &&
        favProducts.length >= 1 && (
            <>
              <Typography
                sx={{ mb: 2 }}
                color={"text.secondary"}
                variant="body1"
              >
                Favourite items
              </Typography>
              <FavTable />
            </>
          )}
    </Container>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout>{page}</AppLayout>;
};
