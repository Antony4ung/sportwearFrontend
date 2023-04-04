import React from "react";
import { Box, Pagination } from "@mui/material";

type Props = {
  totalPages: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
};

const HomePangination = ({ totalPages,setPageNumber,pageNumber }: Props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", my:5 }}>
      <Pagination
        count={totalPages}
        page={pageNumber}
        onChange={(event, value) => setPageNumber(value)}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};

export default HomePangination;
