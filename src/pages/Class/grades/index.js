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
          <Box
            className="df"
            p={2}
            style={{
              border: "1px solid #1967d2",
              borderRadius: 8,
            }}
          >
            <FileDownload style={{ color: "#1967d2" }} />
            <Box width={24} />
            <Typography style={{ fontWeight: 600, color: "#1967d2" }}>
              Download
            </Typography>
          </Box>
        </Box>
      )}
    </ClassLayout>
  );
};

export default GradePage;
