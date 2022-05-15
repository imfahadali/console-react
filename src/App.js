import React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import "./App.css";
import DataGridContainer from "./components/Data/DataGridContainer";
import QueryFormContainer from "./components/Query/QueryFormContainer";
function App() {
  const [queries, setQueries] = useState({});

  const submitHandler = (queries) => {
    setQueries(queries);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <QueryFormContainer handleSubmit={submitHandler} />
      <DataGridContainer queries={queries} />;
    </Box>
  );
}

export default App;
