import AutoHideNavBar from "~/components/common/NavBar";
import React, { useEffect, useState } from "react";
import JoinClassDialog from "~/components/dashboard/JoinClassDialog";
import { Container, Pagination, LinearProgress } from "@material-ui/core";
import ClassList from "~/components/dashboard/ClassList";
import httpAuthorization from "~/utils/httpAuthorization";
import endpoints from "~/constants/endpoints";
import CreateClassDialog from "~/components/dashboard/CreateClassDialog";
import "./index.scss";
import { Box } from "@material-ui/system";
const Dashboard = () => {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [pagination, setPagination] = useState({
    total: 1,
    page: 1,
    size: 8,
  });
  const [addCount, setAddCount] = useState(0);

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
  }, [pagination.page, addCount]);

  function closeJoinDialog(isSuccess = false) {
    setIsJoinDialogOpen(false);
    if (isSuccess) {
      setAddCount(addCount + 1);
    }
  }

  function openJoinDialog() {
    setIsJoinDialogOpen(true);
  }

  function closeCreateDialog(isSuccess = false) {
    setIsCreateDialogOpen(false);
    if (isSuccess) {
      setAddCount(addCount + 1);
      setPagination({
        ...pagination,
        page: 1,
      });
    }
  }

  function openCreateDialog() {
    setIsCreateDialogOpen(true);
  }

  function handlePageChange(event, pageNum) {
    setPagination({
      ...pagination,
      page: pageNum,
    });
  }
  return (
    <div id="dashboard-page">
      <AutoHideNavBar
        openJoinDialog={openJoinDialog}
        openCreateDialog={openCreateDialog}
        loading={loading}
      />
      {loading && (
        <LinearProgress
          sx={{ width: "100%", position: "sticky", top: 0, zIndex: 1 }}
        />
      )}
      <Box sx={{ my: 4 }}>
        <Container maxWidth="xl">
          <ClassList classes={classes} />
          {pagination.total > pagination.size && (
            <div className="pagination-section">
              <Pagination
                count={Math.ceil(pagination.total / pagination.size)}
                showFirstButton
                showLastButton
                onChange={(event, pageNum) => handlePageChange(event, pageNum)}
                page={pagination.page}
              />
            </div>
          )}
        </Container>
      </Box>
      <JoinClassDialog isOpen={isJoinDialogOpen} onClose={closeJoinDialog} />
      <CreateClassDialog
        isOpen={isCreateDialogOpen}
        onClose={closeCreateDialog}
      />
    </div>
  );
};

export default Dashboard;
