import { LinearProgress } from "@material-ui/core";
import { Box } from "@material-ui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClassNavbar from "../classes/ClassNavbar";
import httpAuthorization from "~/utils/httpAuthorization";
import { useHistory, useParams } from "react-router";
import { ClassesAction } from "../../store/class";
import endpoints from "../../constants/endpoints";

const ClassLayout = ({ children, maxWidth, style }) => {
  const [loading, setLoading] = useState(false);
  const { info } = useSelector((state) => state.classes);
  const { code } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetchClassData = async () => {
      setLoading(true);
      try {
        const result = await httpAuthorization.get(
          endpoints.getClassInfo(code)
        );

        dispatch(ClassesAction.setClassInfo(result.data));
        setLoading(false);
      } catch (error) {
        history.push("/");
      }
    };
    if (code !== info?.code || !info) fetchClassData();
  }, [code]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ClassNavbar loading={loading} />
      {!info || loading ? (
        <LinearProgress sx={{ width: "100%", margin: "64px auto 0" }} />
      ) : (
        <Box
          maxWidth={maxWidth ? maxWidth : "lg"}
          className="df fdc"
          style={{
            margin: "64px auto 0",
            flex: 1,
            paddingTop: 24,
            width: 1000,
            ...style,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

export default ClassLayout;
