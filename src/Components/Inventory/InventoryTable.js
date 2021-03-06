import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteItemButton from "../Inventory/DeleteItemButton";
import EditItemField from "../Inventory/EditItemField";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "quantity", label: "Quantity", minWidth: 100 },

  {
    id: "type",
    label: "Type",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];

export default function InventoryTable({
  props,
  items,
  stateChanger,
  getItems,
}) {
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(100);

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 800 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return row.type === props.filter ? (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "quantity" ? (
                              <EditItemField
                                value={value}
                                item={row}
                                id={row.id}
                                DetectChanges={props.DetectChanges}
                                CountChildren={props.CountChildren}
                              />
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                      <DeleteItemButton
                        id={row.id}
                        item={row.name}
                        stateChanger={stateChanger}
                        getItems={getItems}
                      />
                    </TableRow>
                  ) : (
                    <div />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
