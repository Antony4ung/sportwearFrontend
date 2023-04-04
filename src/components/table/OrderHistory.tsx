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
import Chip from '@mui/material/Chip'

import Image from "next/image";
import { removeFromCart } from "@/redux/slices/cartSlice";

const columns = ["OrderID", "Total Items", "Status", "Price"];

export default function OrderHistory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const removeClick = (removeID: string, sizeRm: string) => {
    dispatch(
      removeFromCart({
        id: removeID,
        size: sizeRm,
      })
    );
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
      {cartItems && (
        <Paper variant="outlined" sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column}
                      align={column === "OrderID" ? "left" : "right"}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {cartItems && (
                <TableBody>
                  {cartItems
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={item.id}
                        >
                          <TableCell align="left">
                            {item.id}
                          </TableCell>
                          <TableCell align="right">{item.count}</TableCell>
                          <TableCell align="right">{
                            <Chip color={ 0 ? "success" : "pending..." ? "warning" : "error" } label="pending" variant="outlined" />
                          }</TableCell>
                          <TableCell align="right">{item.price}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={() => removeClick(item.id, item.size)}
                            >
                              <DoDisturbOnIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 5, 7]}
            component="div"
            count={cartItems.length}
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
