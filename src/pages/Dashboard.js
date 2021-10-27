import AutoHideNavBar from "~/components/common/NavBar";
import React, { useEffect, useState } from "react";
import JoinClassDialog from "~/components/dashboard/JoinClassDialog";
import { Container, LinearProgress } from "@material-ui/core";
import ClassList from "~/components/dashboard/ClassList";
import httpAuthorization from "~/utils/httpAuthorization";
import endpoints from "~/constants/endpoints";

const Dashboard = () => {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [pagination, setPagination] = useState({
    total: 1,
    page: 1,
    size: 10,
  });

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const params = {
          offset: (pagination.page - 1) * pagination.size,
          limit: pagination.size,
        };
        const res = await httpAuthorization.get(endpoints.getMyCourses, {
          params,
        });
        setClasses(res.data.docs);
        setPagination({
          ...pagination,
          total: res.data.total,
        });
      } catch (err) {
        console.log("fetch classes failed:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function closeJoinDialog() {
    setIsJoinDialogOpen(false);
  }

  function openJoinDialog() {
    setIsJoinDialogOpen(true);
  }
  return (
    <React.Fragment>
      <AutoHideNavBar openJoinDialog={openJoinDialog} />
      {loading && <LinearProgress sx={{ mt: 8 }} />}
      <Container sx={{ mt: 12 }}>
        <ClassList classes={classes} />
      </Container>
      <JoinClassDialog isOpen={isJoinDialogOpen} onClose={closeJoinDialog} />
    </React.Fragment>
  );
};

export default Dashboard;
