import React, { useState } from "react";
import { Avatar, IconButton, TextField, Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { imageUrlFormatter } from "~/utils/stringUtils";

const FieldData = (props) => {
  const [isHover, setIsHover] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const contentStyle =
    props.field === "PHOTO"
      ? { flex: 1, textAlign: "left", color: "#606469", fontSize: 14 }
      : { flex: 1, textAlign: "left", color: "#242528", fontSize: 15 };

  const formatContent = (content) => {
    switch (props.field) {
      case "BIRTHDAY":
        const date = new Date(content);
        return date.toLocaleDateString("vn-VN");
      case "GENDER":
        return content?.charAt(0).toUpperCase() + content?.slice(1);
      case "STUDENTID":
        if (content == null) {
          return 'Set your student ID now'
        }
        return content;
      default:
        return content;
    }
  };

  const handleOnClickExpand = () => {
    setIsExpanded(!isExpanded);
  };

  let action;

  if (props.field === "PHOTO") {
    action = (
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "50%",
        }}
      >
        <Avatar
          style={{ height: 60, width: 60 }}
          alt={props.name}
          src={props.avatar ? imageUrlFormatter(props.avatar) : "not-exist"}
        />
        <div
          style={{
            backgroundColor: "rgb(35, 38, 41, 0.3)",
            position: "absolute",
            bottom: 0,
            height: "40%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={props.handler}
        >
          <CameraAltIcon style={{ color: "#000000", width: 18 }} />
        </div>
      </div>
    )
  } else if (props.field === "STUDENTID") {
    action = props.content == null && (
      <Button variant="outlined" onClick={props.handler}>
        Set
      </Button>
    );
  }
  else {
    action = (
      <IconButton onClick={handleOnClickExpand}>
        {props.field &&
          props.field !== "EMAIL" &&
          (isExpanded ? (
            <KeyboardArrowDownIcon />
          ) : (
            <ArrowForwardIosIcon />
          ))}
      </IconButton>
    )
  }


  return (
    <div>
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          backgroundColor: isHover ? "#FAFAFA" : "#FFFFFF",
        }}
      >
        <p
          style={{
            width: props.field ? "20%" : "0",
            color: "#606469",
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {props.field}
        </p>
        <p style={contentStyle}>{formatContent(props.content)}</p>
        {action}
      </div>
      {isExpanded && (
        <div style={{ display: "flex" }}>
          <div style={{ width: "20%" }}></div>
          {props.field === "GENDER" ? (
            <Select
              id={props.fieldName}
              name={props.fieldName}
              value={props.formik.values[props.fieldName]}
              label="Gender"
              onChange={props.formik.handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          ) : (
            <TextField
              width="150px"
              id={props.fieldName}
              name={props.fieldName}
              value={props.formik.values[props.fieldName]}
              onChange={props.formik.handleChange}
              type={props.field === "BIRTHDATE" ? "date" : "text"}
              error={
                props.formik.touched[props.fieldName] &&
                Boolean(props.formik.errors[props.fieldName])
              }
              helperText={
                props.formik.touched[props.fieldName] &&
                props.formik.errors[props.fieldName]
              }
              onBlur={props.formik.handleBlur}
              variant="outlined"
              default={props.content}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FieldData;
