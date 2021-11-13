import {
  LinearProgress,
  Typography,
  IconButton,
  Card,
  Avatar,
} from "@material-ui/core";
import { Box } from "@material-ui/system";
import { ErrorOutline } from "@mui/icons-material";
import React, { useState } from "react";
import AutoHideNavBar from "~/components/common/NavBar";
import ClassNavbar from "../../components/classes/ClassNavbar";
import httpAuthorization from "~/utils/httpAuthorization";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loadCover } from "~/constants/defaultCovers";
import { ClassesAction } from "../../store/class";
import ClassLayout from "../../components/layout/ClassLayout";
import env from "~/constants/env";

const ClassInfo = () => {
  const { info } = useSelector((state) => state.classes);
  return (
    <Box style={{ width: "100%" }} className="pr">
      <img
        alt="class-logo"
        src={
          String(info.backgroundImg).length > 2
            ? `${env.apiUrl}api/images/${info.backgroundImg}`
            : loadCover(Number(info.backgroundImg))
        }
        style={{
          height: 240,
          objectFit: "cover",
          borderRadius: 8,
          width: "100%",
        }}
      />
      <Box
        className="pa df jcsb"
        style={{
          width: "calc(100% - 32px)",
          bottom: 0,
          alignItems: "end",
          color: "#fff",
          marginLeft: 16,
          marginBottom: 16,
        }}
      >
        <Box>
          <Typography variant="h3">{info.name}</Typography>
          <Typography variant="h6">{info.subject || "-"}</Typography>
        </Box>
        <IconButton
          style={{
            color: "#fff",
            height: 36,
          }}
        >
          <ErrorOutline />
        </IconButton>
      </Box>
    </Box>
  );
};

const ClassPage = () => {
  return (
    <ClassLayout>
      <ClassInfo />
      {/* <Card>
      <Box className="df" p={2}>
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabtQiNnz9PBR67bOWmnltOSG0o1pGTtRnXw&usqp=CAU" />
      </Box>
    </Card> */}
    </ClassLayout>
  );
};

export default ClassPage;
