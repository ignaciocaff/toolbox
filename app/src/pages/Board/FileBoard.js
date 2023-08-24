import React from "react";
import FileSearch from "./components/FileSearch";
import { addFile } from "../../redux/states/files";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { startLoading, stopLoading } from "../../redux/states/spinner";
import { useSelector } from "react-redux";
import FloatingAlert from "../../components/Alert/FloatingAlert";
import { getAll } from "../../services/fileService";
import FileTableContainer from "./components/FileTableContainer";

const FileBoard = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.spinner.loading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoading());
        const response = await getAll();
        const data = await response.json();
        dispatch(addFile(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(stopLoading());
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-8 my-8">
      <FileSearch />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="grow" variant="primary" />
        </div>
      ) : (
        <FileTableContainer />
      )}
      <FloatingAlert />
    </div>
  );
};

export default FileBoard;
