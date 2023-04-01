import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import MaterialReactTable, {
  type MaterialReactTableProps,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { Delete } from "@mui/icons-material";

type Images = {
  name: string;
  image: string;
  size: string;
  createdAt: string;
};
export default function VIew() {
  const [tableData, setTableData] = useState();
  const columns = useMemo<MRT_ColumnDef<Images>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "image",
        header: "Image Location",
      },
      {
        accessorKey: "size", //normal accessorKey
        header: "Image Size",
      },
      {
        accessorKey: "createdAt",
        header: "Date",
      },
    ],
    []
  );
  const handleDeleteRow = useCallback(
    (row: MRT_Row<Images>) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue("firstName")}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData && tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  useEffect(() => {
    fetch("http://localhost:11000/viewImages")
      .then((res) => res.json())
      .then((data) => {
        setTableData(data);
      });
  });
  return (
    <div className="min-h-screen">
      {tableData && (
        <MaterialReactTable
          columns={columns}
          data={tableData}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
      )}
    </div>
  );
}
