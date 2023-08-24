import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FormControl } from "react-bootstrap";
import { addFile, reset, setSelectedFile } from "../../../redux/states/files";
import { startLoading, stopLoading } from "../../../redux/states/spinner";
import { setError, clearError } from "../../../redux/states/errors";

import { useDispatch } from "react-redux";
import { getByName } from "../../../services/fileService";
const FileSearch = () => {
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      dispatch(startLoading());
      const response = await getByName(e.target?.fileName?.value);
      const data = await response.json();
      if (response.ok) {
        dispatch(clearError());
        if (data.length) {
          dispatch(reset());
          dispatch(addFile(data));
        } else {
          dispatch(setSelectedFile(data));
        }
      } else {
        dispatch(reset());
        dispatch(setError(data.message));
      }
    } catch (error) {
      dispatch(reset());
      dispatch(setError("Error obteniendo información " + error.message));
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={(e) => handleSearch(e)}>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="sm:mr-2 sm:w-full">
              <InputGroup>
                <InputGroup.Text id="fileName">#</InputGroup.Text>
                <FormControl
                  className="w-full"
                  placeholder="File name"
                  aria-label="filename"
                  aria-describedby="fileName"
                  name="fileName"
                />
              </InputGroup>
            </div>
            <Button className="xs:mt-5" variant="danger" type="submit">
              SEARCH
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FileSearch;
