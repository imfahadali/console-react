import React from "react";
import { Box } from "@mui/material";
import QueryForm from "./QueryForm";
import { Typography } from "@mui/material";
const QueryFormContainer = ({ handleSubmit }) => {
  const submitHandler = (queries) => {
    handleSubmit(queries);
  };

  return (
    <Box sx={{ width: "20%", m: 5 }}>
      <Typography variant="h6" align="center">
        QUERY PARAMETERS
      </Typography>
      <QueryForm submitHandler={submitHandler} />
    </Box>
  );
};

export default QueryFormContainer;
