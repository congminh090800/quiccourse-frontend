import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Box, Typography } from "@mui/material";
import { FileDownload } from "@mui/icons-material";

export const ExportExcel = ({ data, fileName, title, onClick, preLoad }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".csv";

  const exportToCSV = async (csvData, fileName) => {
    let header = [];
    if (preLoad) {
      header = await preLoad();
      var blob = new Blob([header], { type: "text/csv;charset=utf-8" });
      FileSaver.saveAs(blob, fileName + fileExtension);
    }
    const ws = XLSX.utils.json_to_sheet(csvData, { skipHeader: true });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    XLSX.utils.book_append_sheet(wb, ws, "No Header");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Box
      className="df"
      p={2}
      style={{
        border: "1px solid #1967d2",
        borderRadius: 8,
      }}
      onClick={async () => {
        if (!onClick) exportToCSV(data, fileName);
        else {
          onClick();
        }
      }}
    >
      <FileDownload style={{ color: "#1967d2" }} />
      <Box width={24} />
      <Typography style={{ fontWeight: 600, color: "#1967d2" }}>
        {title || "Download"}
      </Typography>
    </Box>
  );
};
