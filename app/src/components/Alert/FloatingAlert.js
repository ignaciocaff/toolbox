import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearError } from "../../redux/states/errors";
import { useState } from "react";
import { useEffect } from "react";

const FloatingAlert = () => {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.error);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(error);
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
        setShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  if (show) {
    return (
      <Alert className="mt-2"
        dismissible
        transition
        variant="danger"
        onClose={() => setShow(false)}
      >
        {error}
      </Alert>
    );
  }
};

export default FloatingAlert;
