import { Typography, IconButton, Paper } from "@material-ui/core";
import { Box } from "@material-ui/system";
import ContentCopy from "@mui/icons-material/ContentCopy";
import { ErrorOutline } from "@mui/icons-material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { loadCover } from "~/constants/defaultCovers";
import ClassLayout from "../../components/layout/ClassLayout";
import env from "~/constants/env";

const ClassInfo = () => {
  const { info } = useSelector((state) => state.classes);
  const [showDetail, setShowDetail] = useState(false);
  return (
    <Box className="df fdc" style={{ width: "100%" }} className="pr">
      <img
        alt="class-logo"
        src={
          String(info?.backgroundImg).length > 2
            ? `${env.apiUrl}api/images/${info?.backgroundImg}`
            : loadCover(Number(info?.backgroundImg))
        }
        style={{
          height: 240,
          objectFit: "cover",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: showDetail ? 0 : 8,
          borderBottomRightRadius: showDetail ? 0 : 8,
          width: "100%",
          boxShadow: showDetail
            ? "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
            : "none",
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
          <Typography variant="h3">{info?.name}</Typography>
          <Typography variant="h6">{info?.subject || "-"}</Typography>
        </Box>
        <IconButton
          style={{
            color: "#fff",
            height: 36,
          }}
          onClick={() => setShowDetail((prev) => !prev)}
        >
          <ErrorOutline />
        </IconButton>
      </Box>
      {showDetail && (
        <Paper
          className="df fdc"
          style={{
            position: "absolute",
            padding: 16,
            width: "calc(100% - 32px)",
            marginTop: -4,
          }}
          elevation={4}
        >
          <Typography className="sb">
            Class code : <Typography component="span">{info?.code}</Typography>
          </Typography>
          <Typography className="sb">
            Subject : <Typography component="span">{info?.subject}</Typography>
          </Typography>
          <Typography className="sb">
            Room : <Typography component="span">{info?.room}</Typography>
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

const ClassPage = () => {
  const { info } = useSelector((state) => state.classes);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(info?.code);
    } catch (err) {
      console.log("copy failed", err);
    }
  };
  return (
    <ClassLayout>
      <ClassInfo />
      {/* <Card>
      <Box className="df" p={2}>
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabtQiNnz9PBR67bOWmnltOSG0o1pGTtRnXw&usqp=CAU" />
      </Box>
    </Card> */}
      <Box
        sx={{ display: "flex", marginTop: "8px", bgcolor: "background.paper" }}
      >
        <Box className="df fdc" sx={{ width: "30%", marginRight: 4 }}>
          <Paper
            elevation={4}
            className="df fdc"
            sx={{
              marginBottom: "24px",
              padding: "16px",
            }}
          >
            <Typography
              sx={{ fontSize: "16px", fontWeight: "500", color: "#3c4043" }}
            >
              Class code
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "400",
                color: "#1967d2",
                marginTop: "8px",
              }}
            >
              {info?.code}
              <IconButton onClick={copyToClipboard} sx={{ marginLeft: "8px" }}>
                <ContentCopy
                  sx={{
                    alignSelf: "center",
                    color: "#1967d2",
                  }}
                ></ContentCopy>
              </IconButton>
            </Typography>
          </Paper>
          <Paper elevation={4}>
            <Box style={{ padding: 16 }} className="df fdc">
              <Typography className="sb" style={{ marginBottom: 8 }}>
                Grade Structure
              </Typography>
              {info?.gradeStructure?.length ? (
                info?.gradeStructure?.map((data) => {
                  return (
                    <Typography>{`${data.name} : ${data.point}`}</Typography>
                  );
                })
              ) : (
                <Typography>Empty Structure</Typography>
              )}
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
          }}
        ></Box>
      </Box>
    </ClassLayout>
  );
};

export default ClassPage;
