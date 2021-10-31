import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import endpoints from "~/constants/endpoints";
import httpAuthorization from "~/utils/httpAuthorization";
import { useHistory } from "react-router-dom";

const Input = styled("input")({
  display: "none",
});

export default function UploadButtons(props) {
  const { id } = useParams();
  let [error, setError] = useState(null);
  let history = useHistory();
  const handleUpload = async (evt) => {
    try {
      const formData = new FormData();
      formData.append("courseId", id);
      formData.append("imgFile", evt.target.files[0]);
      const result = await httpAuthorization({
        url: endpoints.uploadCover,
        method: "patch",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (result.data) {
        history.push("/classes");
      } else {
        throw new Error("Unexpected error occurred!");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <React.Fragment>
      {error && <div style={{ color: "red" }}>{error.message}</div>}
      <label htmlFor="contained-button-file">
        <Input
          onChange={(evt) => handleUpload(evt)}
          accept="image/png, image/gif, image/jpeg, image/gif"
          id="contained-button-file"
          type="file"
        />
        <Button variant="contained" component="span">
          {props.title}
        </Button>
      </label>
    </React.Fragment>
  );
}
