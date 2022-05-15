import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";

import { Button } from "@mui/material";

function BackComponent() {
  return (
    <div>
      <Button variant="text">Back</Button>
    </div>
  );
}
function NextComponent() {
  return (
    <div>
      <Button variant="text">Next</Button>
    </div>
  );
}

export default function CustomPaginationButtons({ onChange, count }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        color="primary"
        renderItem={(item) => {
          return (
            <PaginationItem
              components={{ previous: BackComponent, next: NextComponent }}
              {...item}
            />
          );
        }}
        onChange={onChange}
      />
    </Stack>
  );
}
