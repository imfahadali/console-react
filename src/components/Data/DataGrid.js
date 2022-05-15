import * as React from "react";
import {
  DataGrid as DataGridMui,
  gridColumnLookupSelector,
  GridToolbar,
} from "@mui/x-data-grid";
import Footer from "../Footer";
import CustomIcons from "../CustomIcon";
import { relativeDays } from "../../lib/helperFunction";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
        setShowFullCell(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: "center",
        lineHeight: "24px",
        width: 1,
        height: 1,
        position: "relative",
        display: "flex",
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: 1,
          width,
          display: "block",
          position: "absolute",
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
  return (
    <GridCellExpand
      value={params.value || ""}
      width={params.colDef.computedWidth}
    />
  );
}

renderCellExpand.propTypes = {
  colDef: PropTypes.object.isRequired,

  value: PropTypes.string,
};
let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const columns = [
  {
    field: "title",
    headerName: "Title",
    width: 300,
    renderCell: renderCellExpand,

    valueFormatter: (params) => {
      if (params.value == null) {
        return "-";
      }
    },
  },
  {
    field: "source",
    headerName: "Source",
    width: 110,
    editable: true,
    renderCell: renderCellExpand,

    valueFormatter: (params) => {
      if (params.value == null) {
        return "-";
      }
    },
  },
  {
    field: "location",
    headerName: "Location",
    width: 110,
    editable: true,
    renderCell: renderCellExpand,
    valueFormatter: (params) => {
      if (params.value == null) {
        return "-";
      }
    },
  },

  {
    field: "company",
    headerName: "Company",
    width: 110,
    editable: true,
    renderCell: renderCellExpand,
    valueFormatter: (params) => {
      if (params.value == null) {
        return "-";
      }
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 110,
    editable: true,
    renderCell: renderCellExpand,
    valueFormatter: (params) => {
      if (params.value == null) {
        return "-";
      }
    },
  },
  {
    field: "posted_time",
    headerName: "Posted Date",
    width: 150,
    editable: true,
    valueFormatter: (params) => {
      if (params.value == null) {
        return "-";
      }
      return relativeDays(new Date(params.value).getTime());
    },
  },
  {
    field: "_modifiedTS",
    headerName: "Updated Date",
    width: 210,
    editable: true,
    valueFormatter: (params) => {
      if (params.value == null) {
        return "-";
      }
      const formattedDate = new Date(params.value).toLocaleString("en");
      return formattedDate;
    },
  },
  {
    field: "cpa",
    headerName: "CPA",
    type: "number",
    width: 70,
    editable: true,
    valueFormatter: (params) => {
      if (params.value == null) {
        return "-";
      }
    },
  },
  {
    field: "cpc",
    headerName: "CPC",
    type: "number",
    width: 70,
    editable: true,
    valueFormatter: (params) => {
      if (params.value == null) {
        return "-";
      }
    },
  },
];

// const initialRows = [
//   { id: 1, lastName: "Snow", title: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", title: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", title: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", title: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", title: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", title: "wow", age: 150 },
//   { id: 7, lastName: "Clifford", title: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", title: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", title: "Harvey", age: 65 },
//   { id: 10, lastName: "Roxie", title: "Harvey", age: 65 },
//   { id: 11, lastName: "Roxie", title: "Harvey", age: 65 },
// ];

export default function DataGrid({ rows, onPageChange, loading }) {
  console.log("in Grid component");

  // if (rows === undefined) {
  //   rows = null;
  // }

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGridMui
          loading={loading}
          pagination
          pageSize={10}
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          sx={{ mt: 2 }}
          components={{
            Pagination: CustomIcons,
            Toolbar: GridToolbar,
          }}
          componentsProps={{
            pagination: { onChange: onPageChange, count: 6 },
          }}
        />
      </div>
    </div>
  );
}
