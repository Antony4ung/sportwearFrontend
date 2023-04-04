import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import IconButton from "@mui/material/IconButton";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

import Image from "next/image";
import { removeFromCart } from "@/redux/slices/cartSlice";
import axios from "axios";
import { userSuccess } from "@/redux/slices/userSlice";

const columns = ["Name", "Photo", "Price", ""];

export default function FavTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const {
    data: { favProducts, _id },
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const removeClick = async (id: string) => {
    const { data: retData } = await axios.delete(
      `${process.env.BACKEND_API_URL}/users/${_id}/fav/${id}`
    );

    dispatch(userSuccess({ data: retData }));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {favProducts && (
        <Paper variant="outlined" sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column}
                      align={column === "Name" ? "left" : "right"}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {favProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={item._id}
                      >
                        <TableCell align="left">
                          {/* {item.name.length > 30
                            ? item.name.slice(0, 30) + "..."
                            : item.name} */}
                            {
                              item._id
                            }
                        </TableCell>
                        <TableCell align="right">
                          <Image
                            src={item.photoUrl}
                            width={50}
                            height={50}
                            alt={item.name}
                          />
                        </TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => removeClick(item._id)}>
                            <DoDisturbOnIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 5, 7]}
            component="div"
            count={favProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}
