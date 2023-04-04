import React from "react";
import { TextField, Box,Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
type Props = {};

const SearchBox = (props: Props) => {
  return (
    <Box sx={{display:"flex",my:2,mx:5,justifyContent:"center"}}>
      <TextField sx={{minWidth:"280px"}} size="small" id="outlined-basic" label="Search products here" variant="standard" />
      <Button sx={{ml:2}} variant="contained">
            <SearchIcon/>
      </Button>
    </Box>
  );
};

export default SearchBox;
