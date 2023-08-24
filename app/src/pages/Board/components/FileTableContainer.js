import React from "react";
import { useSelector } from "react-redux";
import FileTable from "./FileTable";

const FileTableContainer = () => {
  const files = useSelector((store) => store.files?.files);
  const selectedFile = useSelector((store) => store.files?.selectedFile);

  if (selectedFile) {
    return <FileTable data={[selectedFile]} />;
  }

  return <FileTable data={files} />;
};

export default FileTableContainer;
