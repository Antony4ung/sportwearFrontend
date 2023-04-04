import React from "react";
import FilterBox from "./FilterBox";
import { Box } from "@mui/material";

type Props = {
  filterVal: string;
  setFilterVal: React.Dispatch<React.SetStateAction<string>>;
};

const ProductFilters = ({ setFilterVal, filterVal }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        my: 3,
      }}
    >
      <FilterBox filterVal={filterVal} setFilterVal={setFilterVal} />
    </Box>
  );
};

export default ProductFilters;
