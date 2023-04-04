import React, { useState, useEffect } from "react";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  CategoryFail,
  CategoryReq,
  CategorySuccess,
} from "@/redux/slices/categorySlice";
import axios from "axios";

type Props = {
  filterVal: string;
  setFilterVal: React.Dispatch<React.SetStateAction<string>>;
};

const FilterBox = ({ setFilterVal, filterVal }: Props) => {
  const dispatch = useAppDispatch();

  const getCategories = async () => {
    try {
      dispatch(CategoryReq());

      const { data } = await axios.get(`http://localhost:8000/categories`);
      dispatch(
        CategorySuccess({
          categories: data,
        })
      );
    } catch (error) {
      dispatch(CategoryFail({ error }));
    }
  };

  const { categories } = useAppSelector((state) => state.CategoryRed);

  useEffect(() => {
    getCategories();
  }, [dispatch]);

  return (
    <>
      {categories && (
        <FormControl sx={{ minWidth: { md: "300px", xs: "350px" }, my: 2 }}>
          <InputLabel id="demo-simple-select-label">Categories</InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterVal}
            label="Categories"
            onChange={(e) => setFilterVal(e.target.value)}
          >
            <MenuItem value={"all"}>
                {"all"}
              </MenuItem>
            {categories.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default FilterBox;
