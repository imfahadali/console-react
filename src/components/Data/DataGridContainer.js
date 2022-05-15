import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { stringify } from "query-string";

import DataGrid from "./DataGrid";
import { fetchingData } from "../../lib/helperFunction";

let BASE_API_URL = "https://find.jobget.com/api/jobs/search";

const DataGridContainer = ({ queries }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const isEmpty = Object.values(queries).every((x) => x === "");

  const loadData = (page = 1) => {
    const start = page * 10;
    if (!isEmpty) {
      let api = BASE_API_URL + "?";
      api += stringify(queries);
      api += "&from=" + start;
      return fetchingData(api).then((r) => setRows(r));
    } else {
      let api = BASE_API_URL + "?from=" + start;
      return fetchingData(api).then((r) => setRows(r));
    }
  };

  useEffect(() => {
    loadData();
  }, [isEmpty, queries]);

  const onPageChange = (e, page) => {
    setRows([]);
    setLoading(true);
    loadData(page).then(() => setLoading(false));
  };

  //pass the data to the grid component
  return (
    <Box sx={{ width: "70%", m: 5, height: "70vh" }}>
      <Typography variant="h6" align="center">
        QUERY RESULT
      </Typography>
      <DataGrid rows={rows} onPageChange={onPageChange} loading={loading} />
    </Box>
  );
};

export default DataGridContainer;
