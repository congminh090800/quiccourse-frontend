import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import ClassLayout from "../../../components/layout/ClassLayout";
import { imageUrlFormatter } from "~/utils/stringUtils";
import { FileDownload } from "@mui/icons-material";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { ExportExcel } from "../../../components/common/ExportExcel";

const GradePage = () => {
  const { info } = useSelector((state) => state.classes);
  const { user } = useSelector((state) => state.auth);
  console.log([
    (info.gradeStructure || []).map((item) => `${item.name} : ${item.point}`),
    ...(info.participants || []).map((student) =>
      (info.gradeStructure || []).map((item) => 2)
    ),
  ]);
  return (
    <ClassLayout maxWidth={"md"}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student name</TableCell>
              {(info.gradeStructure || []).map((item) => {
                return (
                  <TableCell>{`${item.name} : ${item.point} points`}</TableCell>
                );
              })}
              <TableCell>{`Total Grade: ${info.gradeStructure
                .map((item) => item.point)
                .reduce((a, b) => a + b, 0)}`}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(info.participants || []).map((student) => {
              return (
                <TableRow>
                  <TableCell>
                    <Box className="df aic">
                      <Avatar
                        src={
                          student.avatar
                            ? imageUrlFormatter(student.avatar)
                            : "not-exist"
                        }
                      ></Avatar>
                      <Box width={12} />
                      <Typography className="sb">{student.name}</Typography>
                    </Box>
                  </TableCell>
                  {(info.gradeStructure || []).map((item) => {
                    return <TableCell>2</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {user._id == info?.owner._id && (
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
      )}
    </ClassLayout>
  );
};

export default GradePage;
