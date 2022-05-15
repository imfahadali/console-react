import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

//put it in .env file

const initialQueriesState = {
  location: "",
  "search-term": "",
  radius: "",
  "excluded-companies": "",
  cpa: "",
};

export default function QueryForm({ submitHandler }) {
  const [queries, setQueries] = useState(initialQueriesState);
  console.log("Query Form");
  const handleChange = (e) => {
    setQueries((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    console.log(queries);
  };

  const handleResetQueries = () => {
    setQueries(initialQueriesState);
  };

  const handleSendQueries = () => {
    submitHandler(queries);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <div>
        <TextField
          fullWidth
          id="search-term"
          label="Search Term"
          placeholder="ex. Barista"
          variant="outlined"
          value={queries["search-term"]}
          size="small"
          margin="normal"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="location"
          label="Location"
          placeholder="ex. New, NY"
          variant="outlined"
          size="small"
          margin="normal"
          value={queries["location"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="radius"
          label="Radius"
          placeholder="ex. 20.00"
          variant="outlined"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          size="small"
          margin="normal"
          value={queries["radius"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="excluded-companies"
          label="Excluded Companies"
          variant="outlined"
          size="small"
          margin="normal"
          value={queries["excluded-companies"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="cpa"
          label="CPA less than"
          placeholder="ex. 10.00"
          variant="outlined"
          size="small"
          margin="normal"
          value={queries["cpa"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <Button
          fullWidth
          variant="contained"
          size="small"
          sx={{ mb: 1, p: 1 }}
          style={{ fontSize: "12px" }}
          startIcon={<SendIcon style={{ fontSize: "12px" }} />}
          onClick={handleSendQueries}
        >
          Run Query
        </Button>
      </div>
      <div>
        <Button
          fullWidth
          variant="contained"
          size="small"
          sx={{ mb: 1, p: 1 }}
          style={{ fontSize: "12px" }}
          onClick={handleResetQueries}
        >
          Reset
        </Button>
      </div>
    </Box>
  );
}
