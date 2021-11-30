import {
  Button,
  Dialog,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Box } from "@material-ui/system";
import { Add, Article, MoreVert } from "@mui/icons-material";
import React, { useState } from "react";
import ClassLayout from "../../../components/layout/ClassLayout";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import httpAuthorization from "~/utils/httpAuthorization";
import { ClassesAction } from "../../../store/class";
import { LoadingButton } from "@mui/lab";
import endpoints from "../../../constants/endpoints";
import { GlobalActions } from "../../../store/global";

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
const AssignmentItem = ({
  data,
  show,
  onShow,
  offShow,
  index,
  onEdit,
  isDragging,
}) => {
  const [hover, setHover] = useState(false);
  const { info } = useSelector((state) => state.classes);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <Paper
        elevation={hover || show == index || isDragging ? 5 : 0}
        style={{
          borderRadius: 12,
          marginTop: 16,
          border: "1px solid #e8e8e8",
        }}
      >
        <>
          <Box
            className="df jcsb"
            style={{ padding: "20px 16px" }}
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            onClick={() => {
              index == show ? offShow() : onShow();
            }}
          >
            <Box className="df aic">
              <Box
                className="df aic jcc"
                style={{
                  background: "#5f6368",
                  padding: 8,
                  borderRadius: "50%",
                }}
              >
                <Article style={{ color: "#fff", fontSize: 20 }} />
              </Box>
              <Typography style={{ marginLeft: 12 }}>{data.name}</Typography>
            </Box>
            <Box className="df aic">
              <Typography
                variant="body2"
                color="textSecondary"
              >{`Posted ${formatAMPM(new Date(data.createdAt))}`}</Typography>
              <LoadingButton loading={loading}>
                <MoreVert
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                  }}
                  style={{ color: "#000" }}
                />
              </LoadingButton>
            </Box>
          </Box>
          {show == index && (
            <Box p={2} style={{ borderTop: "1px solid #e8e8e8" }}>
              <Typography>{`Point : ${data.point}`}</Typography>
            </Box>
          )}
        </>
      </Paper>

      <Menu
        open={!!anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorEl={anchorEl}
      >
        <MenuItem
          onClick={() => {
            onEdit(data.name, data.point);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={async () => {
            try {
              setLoading(true);
              await httpAuthorization.delete(endpoints.createStructure, {
                data: {
                  courseId: info._id,
                  gradeId: data._id,
                },
              });
              setLoading(false);
              dispatch(ClassesAction.removeGradeStructure(data));
              dispatch(GlobalActions.setSnackbarSuccess("Delete Successfully"));
            } catch (error) {
              dispatch(GlobalActions.setSnackbarError(error.message));
              setLoading(false);
            }
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

const AssignmentDialog = ({ open, handleClose, type, data }) => {
  const [name, setName] = useState("");
  const [point, setPoint] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.classes);

  React.useEffect(() => {
    if (data != null) {
      setPoint(data.point);
      setName(data.name);
    }
  }, [data]);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <Box className="df fdc">
        <Box mx={2} mt={2}>
          <Typography>{`${
            type == "create" ? "Create" : "Edit"
          } grade`}</Typography>
        </Box>

        <Box className="df fdc" mx={2} mt={2}>
          <Typography variant="body2" color="GrayText">
            Name
          </Typography>
          <TextField
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography
            variant="body2"
            color="GrayText"
            style={{ marginTop: 16 }}
          >
            Point
          </Typography>
          <TextField
            margin="dense"
            type="number"
            value={point}
            onChange={(e) => setPoint(e.target.value)}
          />
          <Typography style={{ color: "red", marginTop: 16 }}>
            {error}
          </Typography>
        </Box>
        <Box className="df" p={2} style={{ justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            onClick={async () => {
              if (!name) {
                setError("Can't leave name empty");
                return;
              } else {
                try {
                  setLoading(true);
                  let response;
                  if (type == "create")
                    response = await httpAuthorization.put(
                      endpoints.createStructure,
                      {
                        courseId: info._id,
                        name,
                        point,
                      }
                    );
                  else {
                    response = await httpAuthorization.patch(
                      endpoints.createStructure,
                      {
                        courseId: info._id,
                        name,
                        point,
                        gradeId: data._id,
                      }
                    );
                  }
                  dispatch(ClassesAction.setGradeStructure(response.data));

                  handleClose();
                  dispatch(
                    GlobalActions.setSnackbarSuccess(
                      `${
                        type == "create"
                          ? "Create Structure Successfully !"
                          : "Edit Structure Successfully"
                      }`
                    )
                  );
                } catch (error) {
                  setError(error.message);
                  setLoading(false);
                }
              }
            }}
          >{`${type == "create" ? "Create" : "Edit"}`}</LoadingButton>
        </Box>
      </Box>
    </Dialog>
  );
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const ClassWorkPage = () => {
  const { gradeStructure, owner, _id } =
    useSelector((state) => state.classes.info) || [];
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = useState(null);
  const [dialogData, setDialogData] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      gradeStructure,
      result.source.index,
      result.destination.index
    );

    setLoading(true);
    const response = await httpAuthorization.post(endpoints.createStructure, {
      courseId: _id,
      gradeStructure: items.map((data) => {
        return { point: data.point, name: data.name };
      }),
    });
    setLoading(false);
    dispatch(ClassesAction.setGradeStructure(response.data));
  };
  return (
    <ClassLayout maxWidth={"md"}>
      {user?._id == owner?._id && (
        <Box
          className="df jcsb aic"
          style={{
            borderBottom: gradeStructure?.length ? "none" : "1px solid #e0e0e0",
          }}
        >
          <Button
            startIcon={<Add />}
            style={{
              textTransform: "none",
              color: "#fff",
              background: "#222",
              padding: "8px 20px",
              borderRadius: 50,
              fontSize: 16,
              marginBottom: 8,
            }}
            onClick={() => {
              setDialogData({ type: "create" });
            }}
          >
            Create
          </Button>
          {loading && (
            <Typography className="sb" color="Highlight">
              Processing request...
            </Typography>
          )}
        </Box>
      )}
      <Box className="df fdc">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {gradeStructure.map((item, index) => (
                  <Draggable
                    key={String(item._id)}
                    draggableId={String(item._id)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <AssignmentItem
                          isDragging={snapshot.isDragging}
                          data={item}
                          show={show}
                          index={index}
                          onShow={() => setShow(index)}
                          offShow={() => setShow(null)}
                          onEdit={(name, point) => {
                            setDialogData({
                              type: "edit",
                              data: {
                                name,
                                point,
                                _id: item._id,
                              },
                            });
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {!gradeStructure?.length && (
          <Typography style={{ marginTop: 16 }}>
            There is nothing here
          </Typography>
        )}
      </Box>
      {!!dialogData && (
        <AssignmentDialog
          open={!!dialogData}
          handleClose={() => setDialogData(null)}
          type={dialogData?.type}
          data={dialogData?.data}
        />
      )}
    </ClassLayout>
  );
};

export default ClassWorkPage;
