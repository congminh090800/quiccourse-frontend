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
import { useSelector, useDispatch } from "react-redux";
import ClassLayout from "../../../components/layout/ClassLayout";
import { imageUrlFormatter } from "~/utils/stringUtils";
import { ExportExcel } from "../../../components/common/ExportExcel";
import { useState } from "react";
import { ClassesAction } from "../../../store/class";
import http from "../../../utils/httpAuthorization";
import { FileUpload, MoreVert } from "@mui/icons-material";
import FileSaver from "file-saver";
import endpoints from "../../../constants/endpoints";
import { GlobalActions } from "../../../store/global";

const TableItem = ({ student }) => {
  const { info } = useSelector((state) => state.classes);
  const { user } = useSelector((state) => state.auth);
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const [value, setValue] = useState(0);

  const columnToShow =
    user._id == info.owner._id
      ? info.gradeStructure || []
      : (info.gradeStructure || []).filter(
          (structure) => structure.isFinalized
        );

  React.useEffect(() => {
    if (open != null) {
      setValue(
        student.grades.find((grade) => grade.gradeComponentId == open._id)
          ?.point || 0
      );
    }
  }, [open]);

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
        {columnToShow.map((item) => {
          return (
            <TableCell
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (user._id == info.owner._id) setOpen(item);
              }}
            >
              {student?.grades?.find(
                (grade) => grade.gradeComponentId == item?._id
              )?.point || "-"}
            </TableCell>
          );
        })}
        <TableCell>
          {student?.grades
            ?.map((item) => item.point)
            .reduce((a, b) => a + b, 0)}
        </TableCell>
      </TableRow>
      {!!open && (
        <Dialog
          maxWidth="md"
          open={!!open}
          onClose={() => {
            setOpen(null);
          }}
        >
          <Box className="df fdc" p={3}>
            <Typography className="sb">{`Edit  ${student.fullName}'s ${open.name} point`}</Typography>
            <TextField
              style={{ marginTop: 16 }}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
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
              <Button
                color="primary"
                variant="contained"
                onClick={(e) => {
                  dispatch(
                    ClassesAction.changeStudentPoint({
                      ...student,
                      point: value,
                      gradeComponentId: open?._id,
                    })
                  );
                  dispatch(
                    GlobalActions.setSnackbarSuccess("Set point success!")
                  );
                  setOpen(null);
                }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
    </>
  );
};

const HeadItem = ({ item, setLoading }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { info } = useSelector((state) => state.classes);
  const { user } = useSelector((state) => state.auth);
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();
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
    const newCourseDetail = await http.get(endpoints.getClassInfo(info.code));

    dispatch(ClassesAction.setClassInfo(newCourseDetail.data));
  };

  return (
    <>
      <TableCell style={{ minWidth: 175 }}>
        <Box className="df jcsb aic">
          <Box className="df fdc">
            <Typography className="sb">{`${item.name} ${
              item.isFinalized ? "(*)" : ""
            }`}</Typography>

            <Typography>{`${item.point} points`}</Typography>
          </Box>
          {user._id == info.owner._id && (
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
              <MoreVert />
            </IconButton>
          )}
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
          onClose={() => {
            handleClose();
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={async () => {
              setLoading(true);

              try {
                const template = await http.get(
                  `/api/grade/grade-template?courseId=${info?._id}&gradeComponentId=${item._id}`
                );
                var blob = new Blob([template], {
                  type: "text/csv;charset=utf-8",
                });
                FileSaver.saveAs(blob, item.name + ".csv");
                handleClose();
              } catch (error) {
                dispatch(GlobalActions.setSnackbarError(error.message));
              }
              setLoading(false);
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
          <MenuItem
            onClick={async () => {
              setLoading(true);

              try {
                if (!item.isFinalized) {
                  const result = await http.patch(
                    `/api/grade/finalize-column`,
                    {
                      courseId: info._id,
                      gradeComponentId: item._id,
                    }
                  );
                  dispatch(ClassesAction.setClassInfo(result.data));
                  dispatch(
                    GlobalActions.setSnackbarSuccess("Finalize Success")
                  );
                } else {
                  const result = await http.patch(
                    `/api/grade/unfinalize-column`,
                    {
                      courseId: info._id,
                      gradeComponentId: item._id,
                    }
                  );
                  dispatch(ClassesAction.setClassInfo(result.data));
                  dispatch(
                    GlobalActions.setSnackbarSuccess("Unfinalize Success")
                  );
                }
                handleClose();
              } catch (error) {
                dispatch(GlobalActions.setSnackbarError(error.message));
              }
              setLoading(false);
            }}
          >
            {`${item.isFinalized ? "Unfinalize" : "Finalize"}`}
          </MenuItem>
          <MenuItem
            onClick={async () => {
              setLoading(true);

              try {
                const result = await http.put(`/api/grade/finalize-grades`, {
                  courseId: info._id,
                  gradeComponentId: item._id,
                  listPoints: info.enrolledStudents
                    .filter((student) =>
                      student.grades.find(
                        (grade) => grade.gradeComponentId == item._id
                      )
                    )
                    .map((student) => {
                      return {
                        studentId: student.studentId,
                        point: student.grades.find(
                          (grade) => grade.gradeComponentId == item._id
                        ).point,
                      };
                    }),
                });
                dispatch(
                  GlobalActions.setSnackbarSuccess("Return all Success")
                );
                handleClose();
              } catch (error) {
                dispatch(GlobalActions.setSnackbarError(error.message));
              }
              setLoading(false);
            }}
          >
            Return all
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

const GradePage = () => {
  const { info } = useSelector((state) => state.classes);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  console.log("🚀 ~ file: index.js ~ line 343 ~ GradePage ~ loading", loading);

  const columnToShow =
    user._id == info.owner._id
      ? info.gradeStructure || []
      : (info.gradeStructure || []).filter(
          (structure) => structure.isFinalized
        );

  return (
    <ClassLayout maxWidth={"md"} customLoading={loading}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 200 }}>Student name</TableCell>
              {columnToShow.map((item) => {
                return (
                  <HeadItem
                    item={item}
                    key={item._id}
                    setLoading={setLoading}
                  />
                );
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
            {info?.enrolledStudents?.map((student) => {
              return <TableItem key={student?._id} student={student} />;
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
                  "Name",
                  "StudentId",
                  ...(info.gradeStructure || []).map(
                    (item) => `${item.name} : ${item.point}`
                  ),
                  `Total Grade: ${info.gradeStructure
                    .map((item) => item.point)
                    .reduce((a, b) => a + b, 0)}`,
                ],
                ...(info.enrolledStudents || []).map((student) => [
                  student.fullName,
                  student.studentId,
                  ...(info.gradeStructure || []).map(
                    (item) =>
                      student?.grades?.find(
                        (grade) => grade.gradeComponentId == item._id
                      )?.point || "-"
                  ),
                  student?.grades
                    .map((item) => item.point)
                    .reduce((a, b) => a + b, 0),
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
