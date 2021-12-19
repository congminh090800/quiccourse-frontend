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
import { ExportExcel } from "../../../components/common/ExportExcel";
import { useState } from "react";
import http from "../../../utils/httpAuthorization";
import { FileUpload } from "@mui/icons-material";

const TableItem = ({ student }) => {
  const { info } = useSelector((state) => state.classes);
  const [hover, setHover] = useState(false);

  return (
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
            <Typography className="sb">{student.name}</Typography>
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
        return <TableCell>2</TableCell>;
      })}
    </TableRow>
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
            mr={3}
          >
            <ExportExcel
              fileName="TemplateGrade"
              title="Template"
              preLoad={async () => {
                return await http.get("/api/grade/grade-template", null, {
                  params: {
                    courseId: info._id,
                    gradeComponentId,
                  },
                });
              }}
            />
          </Box>
          <Box
            className="df"
            style={{ justifyContent: "end", cursor: "pointer" }}
            mt={2}
            mr={3}
          >
            <Box
              className="df"
              p={2}
              style={{
                border: "1px solid #1967d2",
                borderRadius: 8,
              }}
              onClick={async () => {}}
            >
              <FileUpload style={{ color: "#1967d2" }} />
              <Box width={24} />
              <Typography style={{ fontWeight: 600, color: "#1967d2" }}>
                Upload
              </Typography>
            </Box>
          </Box>

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
