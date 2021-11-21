import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";

const ParticipatingCoursePage = () => {
  React.useEffect(() => {}, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }} className="df aic fdc jcc">
      <CircularProgress />
      <Typography style={{ marginTop: 16 }}>Đang xử lý yêu cầu...</Typography>
    </div>
  );
};

export default ParticipatingCoursePage;
