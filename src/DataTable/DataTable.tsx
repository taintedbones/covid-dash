import { useState } from "react";
import {
  Box,
  Link,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

export function TableFooter(props: { sourceName; sourceUrl }) {
  return (
    <Box
      sx={{
        height: "50px",
        padding: "5px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography variant="caption">
        Source:{" "}
        <Link href={props.sourceUrl} underline="hover">
          {props.sourceName}
        </Link>
      </Typography>
    </Box>
  );
}

export function TableHeader({ setShowPop, disabled }) {
  const [view, setView] = useState<any>("total");
  return (
    <Box
      sx={{ 
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "50px",
        paddingBottom: "20px",
      }}
    >
      <Typography sx={{ paddingRight: " 10px" }}>Data View: </Typography>
      <ToggleButtonGroup
        value={view}
        exclusive
        sx={{ height: "50px" }}
        disabled={disabled}
      >
        <ToggleButton
          value="total"
          onClick={() => {
            setShowPop(false);
            setView("total");
          }}
        >
          Total
        </ToggleButton>
        <ToggleButton
          value="population"
          onClick={(e) => {
            setShowPop(true);
            setView("population");
          }}
        >
          Per population
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
