import AppLayout from "@/layouts/AppLayout";
import React, { ReactNode } from "react";

type Props = {};

const messages = (props: Props) => {
  return <div>messages</div>;
};

export default messages;

messages.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout>{page}</AppLayout>;
};
