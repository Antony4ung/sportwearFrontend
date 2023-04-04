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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Image from "next/image";
import { removeFromCart } from "@/redux/slices/cartSlice";

const columns = [
  // "ID",
  "Name",
  "Photo",
  "Category",
  "Count",
  "Size",
  "Price",
  "",
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column} align={column === "ID" ?  "left" : "center"}>
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
                          {/* <TableCell align="left" component="th" scope="row">
                            {item.id}
                          </TableCell> */}
                          <TableCell align="center">{item.name.length > 30
                              ? item.name.slice(0, 30) + "..."
                              : item.name}</TableCell>
                          <TableCell align="center">
                            <Image
                              src={item.photoUrl}
                              width={50}
                              height={50}
                              alt={item.name}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {item.category.name}
                          </TableCell>
                          <TableCell align="center">{item.count}</TableCell>
                          <TableCell align="center">{item.size}</TableCell>
                          <TableCell align="center">{item.price}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              onClick={() => removeClick(item.id, item.size)}
                            >
                              <DeleteOutlineIcon />
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
            rowsPerPageOptions={[10, 15, 20]}
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
