import React from 'react'
import {FormControl,InputLabel,Select,MenuItem} from '@mui/material'
import { Stock } from '@/types/general'
type Props = {
    size:string
    setSize:React.Dispatch<React.SetStateAction<string>>;
    instockSizes:Stock[]
}

const SizeFilter = ({size,setSize,instockSizes}: Props) => {
  return (
    <FormControl sx={{ minWidth: "100px", my: 2 }}>
          <InputLabel id="choose-size">Size</InputLabel>
          <Select
            size="small"
            labelId="choose-size"
            id="demo-simple-select"
            value={size}
            label="Categories"
            onChange={(e) => setSize(e.target.value)}
          >
            {instockSizes.map((item) => (
              <MenuItem key={item._id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  )
}

export default SizeFilter