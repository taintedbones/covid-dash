import React, { useState } from "react";
import { Grid, Button, Menu, MenuItem, Divider } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Link } from "react-router-dom";

function NavMenu({label, options}) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchor);

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <React.Fragment> 
      <Grid item>
        <Button
          variant="contained"
          onClick={(e) => setAnchor(e.currentTarget)}
          endIcon={<KeyboardArrowDown />}
        >
          {label}
        </Button>
      </Grid>
      <Menu
        id="basic-menu"
        anchorEl={anchor}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options.map((item) => (
          <Link to={item.url}>
            <MenuItem
              onClick={() => {
                //  setTitle("US Map");
                handleClose();
              }}
              sx={{ color: "white" }}
            >
              {item.text}
            </MenuItem>
            <Divider />
          </Link>
        ))}
      </Menu>
    </React.Fragment>
  );
}

export default NavMenu;
