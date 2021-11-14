import React from "react";
import {
  LinearProgress,
  Typography,
  IconButton,
  Card,
  Box,
  Avatar,
} from "@material-ui/core";
import ClassLayout from "../../../components/layout/ClassLayout";
import * as stringUtils from "~/utils/stringUtils";
import { useSelector } from "react-redux";

const MemberItem = ({ user }) => {
  return (
    <Box className="df aic " p={2}>
      <Avatar
        sx={{
          bgcolor: stringUtils.stringToColor(user.name),
          width: 32,
          height: 32,
          fontSize: 16,
          marginRight: 2,
        }}
        src={user.avatar ? user.avatar : "not-exist"}
        alt={user.name}
      />
      <Typography>{user.name}</Typography>
    </Box>
  );
};

const ClassMemberPage = () => {
  const { info } = useSelector((state) => state.classes);

  return (
    <ClassLayout maxWidth={"md"} style={{ width: 808 }}>
      <Box px={2} pt={2} pb={1} style={{ borderBottom: "1px solid #1967d2" }}>
        <Typography style={{ color: "#1967d2", fontSize: "2rem" }}>
          Teachers
        </Typography>
      </Box>
      {[info.owner, ...info.teachers].map((user) => {
        return <MemberItem key={user.id} user={user} />;
      })}
      <Box
        className="df jcsb aic"
        px={2}
        pt={2}
        pb={1}
        style={{ borderBottom: "1px solid #1967d2" }}
      >
        <Typography style={{ color: "#1967d2", fontSize: "2rem" }}>
          Classmates
        </Typography>
        <Typography style={{ color: "#1967d2", fontSize: "1rem" }}>
          {info.participants.length} students
        </Typography>
      </Box>
    </ClassLayout>
  );
};

export default ClassMemberPage;
