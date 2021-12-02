import { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Link } from "react-router-dom";

function NavBar() {
  const [title, setTitle] = useState<string>("");
  const [usMenuAnchor, setUsMenuAnchor] = useState<null | HTMLElement>(null);
  const [globalMenuAnchor, setGlobalMenuAnchor] =
    useState<null | HTMLElement>();
  const openUSMenu = Boolean(usMenuAnchor);
  const openGlobalMenu = Boolean(globalMenuAnchor);

  const handleUSClose = () => {
    setUsMenuAnchor(null);
  };
  const handleGlobalClose = () => {
    setGlobalMenuAnchor(null);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Link to="/">
            <Button variant="text" sx={{ marginRight: "50px" }} onClick={() => setTitle("")}>
              <Typography variant="h5">COVID-19 Dashboard</Typography>
            </Button>
          </Link>
          <Typography variant="h5">{title}</Typography>
          <div>
            <Button
              variant="contained"
              sx={{ marginRight: "10px" }}
              onClick={(e) => setUsMenuAnchor(e.currentTarget)}
              endIcon={<KeyboardArrowDown />}
            >
              US Data
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={usMenuAnchor}
              open={openUSMenu}
              onClose={handleUSClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link to="/map/us">
                <MenuItem
                  onClick={() => {
                    setTitle("US Map");
                    handleUSClose();
                  }}
                  sx={{ color: "white" }}
                >
                  US Map
                </MenuItem>
              </Link>
              <Divider />
              <Link to="/statistics">
                <MenuItem
                  onClick={() => {
                    setTitle("US Statistics");
                    handleUSClose();
                  }}
                  sx={{ color: "white" }}
                >
                  US Statistics
                </MenuItem>
              </Link>
            </Menu>

            <Button
              variant="contained"
              sx={{ marginRight: "10px" }}
              onClick={(e) => setGlobalMenuAnchor(e.currentTarget)}
              endIcon={<KeyboardArrowDown />}
            >
              Global Data
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={globalMenuAnchor}
              open={openGlobalMenu}
              onClose={handleGlobalClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link to="/">
                <MenuItem
                  onClick={() => {
                    setTitle("Global Map");
                    handleGlobalClose();
                  }}
                  sx={{ color: "white" }}
                >
                  Global Map
                </MenuItem>
              </Link>
              <Divider />
              <Link to="/statistics/global">
                <MenuItem
                  onClick={() => {
                    setTitle("Global Statistics");
                    handleGlobalClose();
                  }}
                  sx={{ color: "white" }}
                >
                  Global Statistics
                </MenuItem>
              </Link>
            </Menu>

            <Link to="/vaccinations">
              <Button variant="contained">Vaccine Data</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
