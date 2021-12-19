import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Dialog,
  TextField,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import ClassLayout from "../../../components/layout/ClassLayout";
import { imageUrlFormatter } from "~/utils/stringUtils";
import { ExportExcel } from "../../../components/common/ExportExcel";
import { useState } from "react";
import http from "../../../utils/httpAuthorization";
import { FileUpload, MoreVert } from "@mui/icons-material";
import FileSaver from "file-saver";

const TableItem = ({ student }) => {
  const { info } = useSelector((state) => state.classes);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(null);
  const [newPoint, setNewPoint] = useState("");

  return (
    <>
      <TableRow
        style={{
          background: hover ? "#e3f2fd" : "transparent",
          transition: "background 0.5s ease",
        }}
        onMouseEnter={() => {
          if (student.studentId) setHover(true);
        }}
        onMouseLeave={() => {
          if (student.studentId) setHover(false);
        }}
      >
        <TableCell style={{}}>
          <Box
            className="df aic"
            style={{
              minHeight: 52,
            }}
          >
            <Avatar
              src={
                student.avatar ? imageUrlFormatter(student.avatar) : "not-exist"
              }
            ></Avatar>
            <Box width={12} />
            <Box className="df fdc">
              <Typography className="sb">{student.fullName}</Typography>
              {hover && (
                <Typography
                  variant="body2 one-line-text"
                  style={{ maxWidth: 145 }}
                >
                  {student.studentId}
                </Typography>
              )}
            </Box>
          </Box>
        </TableCell>
        {(info.gradeStructure || []).map((item) => {
          return (
            <TableCell
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpen(true);
              }}
            >
              2
            </TableCell>
          );
        })}
        <TableCell></TableCell>
      </TableRow>
      {!!open && (
        <Dialog
          maxWidth="md"
          open={!!open}
          handleClose={() => {
            setOpen(null);
          }}
        >
          <Box className="df fdc" p={3}>
            <Typography className="sb">{`Edit ${student.fullName}'s point`}</Typography>
            <TextField
              style={{ marginTop: 16 }}
              value={newPoint}
              onChange={(e) => {
                setNewPoint(e.target.value);
              }}
              type="number"
              variant="outlined"
            />
            <Box className="df " mt={3} style={{ justifyContent: "end" }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setOpen(null);
                }}
              >
                Cancel
              </Button>
              <Box width={16} />
              <Button color="primary" variant="contained">
                Confirm
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
    </>
  );
};

const HeadItem = ({ item }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { info } = useSelector((state) => state.classes);
  const inputRef = React.useRef(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const upload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("csvFile", file);
    formData.append("courseId", info._id);
    formData.append("gradeComponentId", item._id);
    const result = await http.put("/api/grade/upload-grades", formData);
  };

  return (
    <>
      <TableCell style={{ minWidth: 175 }}>
        <Box className="df jcsb aic">
          <Box className="df fdc">
            <Typography className="sb">{`${item.name}`}</Typography>

            <Typography>{`${item.point} points`}</Typography>
          </Box>
          <IconButton>
            <MoreVert onClick={(event) => setAnchorEl(event.currentTarget)} />
          </IconButton>
        </Box>
      </TableCell>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        onChange={upload}
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      {open && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={async () => {
              const template = await http.get(
                `/api/grade/grade-template?courseId=${info._id}&gradeComponentId=${item._id}`
              );
              var blob = new Blob([template], {
                type: "text/csv;charset=utf-8",
              });
              FileSaver.saveAs(blob, item.name + ".csv");
              handleClose();
            }}
          >
            Download Template
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              inputRef.current?.click();

              handleClose();
            }}
          >
            Upload
          </MenuItem>
          <MenuItem onClick={handleClose}>Finalize</MenuItem>
        </Menu>
      )}
    </>
  );
};

const GradePage = () => {
  const { info } = useSelector((state) => state.classes);
  const { user } = useSelector((state) => state.auth);

  return (
    <ClassLayout maxWidth={"md"}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student name</TableCell>
              {(info.gradeStructure || []).map((item) => {
                return <HeadItem item={item} key={item._id} />;
              })}
              <TableCell style={{ minWidth: 175 }}>
                <Box className="df fdc">
                  <Typography className="sb">Total Grade</Typography>
                  <Typography>{`${info.gradeStructure
                    .map((item) => item.point)
                    .reduce((a, b) => a + b, 0)} points`}</Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(info.enrolledStudents || []).map((student) => {
              return <TableItem key={student._id} student={student} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {user._id == info?.owner._id && (
        <Box className="df " style={{ justifyContent: "end" }}>
          <Box
            className="df"
            style={{ justifyContent: "end", cursor: "pointer" }}
            mt={2}
          >
            <ExportExcel
              fileName="GradeTable"
              data={[
                [
                  ...(info.gradeStructure || []).map(
                    (item) => `${item.name} : ${item.point}`
                  ),
                  `Total Grade: ${info.gradeStructure
                    .map((item) => item.point)
                    .reduce((a, b) => a + b, 0)}`,
                ],
                ...(info.participants || []).map((student) => [
                  ...(info.gradeStructure || []).map((item) => 2),
                  4,
                ]),
              ]}
            />
          </Box>
        </Box>
      )}
    </ClassLayout>
  );
};

export default GradePage;
