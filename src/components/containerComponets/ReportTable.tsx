import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderIcon from "@mui/icons-material/Folder";
import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import store from "../../store";
import { observer } from "mobx-react";

interface subData {
  name: string;
  published_on: string;
  status: string;
}

interface RowData {
  id: number;
  report: string;
  published_on: string;
  status: string;
  sub: subData[];
}

function ReportTable() {
  const [open, setOpen] = useState<Number[]>([]);

  const handleClick = (clickIndex: Number) => {
    if (open.includes(clickIndex)) {
      const openCopy = open.filter((element) => {
        return element !== clickIndex;
      });
      setOpen(openCopy);
    } else {
      const openCopy = [...open];
      openCopy.push(clickIndex);
      setOpen(openCopy);
    }
  };

  useEffect(() => {
    store.fetchData();
    console.log(store.data);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#EEEDEB" }}>
            <TableCell></TableCell>
            <TableCell>Report</TableCell>
            <TableCell></TableCell>
            <TableCell>Pubhilshed On</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {store.data.map((row: RowData, index) => (
            <React.Fragment>
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <IconButton onClick={() => handleClick(index)}>
                    {open.includes(index) ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowRightIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                </TableCell>
                <TableCell>
                  {row.report}

                </TableCell>
                <TableCell>{row.published_on}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
              {/* <TableRow> */}
                {/* <TableCell
                  colSpan={8}
                  sx={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
                > */}
                  <Collapse in={open.includes(index)} timeout="auto">
                     {/* <Box>                      */}
                        {row.sub.map((data) => {
                          return (
                            <TableRow
                            //   sx={{
                            //     "&:last-child td, &:last-child th": {
                            //       border: 0,
                            //     },
                            //   }}
                            >
                              <TableCell ></TableCell>
                              <TableCell>
                                <ListItemIcon>
                                  <MoreVertIcon />
                                </ListItemIcon>
                                </TableCell>
                              <TableCell>{data.name}</TableCell>
                              <TableCell>{data.published_on}</TableCell>
                              <TableCell>{data.status}</TableCell>
                            </TableRow>
                          );
                        })}
                    {/* </Box> */}
                  </Collapse>
                {/* </TableCell>
              </TableRow> */}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default observer(ReportTable);
