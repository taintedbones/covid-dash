import { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Grid,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { MdOutlineCoronavirus } from "react-icons/md";
import { Link } from "react-router-dom";

function NavBar() {
  const [title, setTitle] = useState<string>("");
  const [usMenuAnchor, setUsMenuAnchor] = useState<null | HTMLElement>(null);
  const [globalMenuAnchor, setGlobalMenuAnchor] =
    useState<null | HTMLElement>();
  const [vaxMenuAnchor, setVaxMenuAnchor] = useState<null | HTMLElement>(null);
  const openUSMenu = Boolean(usMenuAnchor);
  const openGlobalMenu = Boolean(globalMenuAnchor);
  const openVaxMenu = Boolean(vaxMenuAnchor);

  const styles = {
    link: {
      textDecoration: "none",
    },
  }

  const handleUSClose = () => {
    setUsMenuAnchor(null);
  };
  const handleGlobalClose = () => { 
    setGlobalMenuAnchor(null);
  };
  const handleVaxClose = () => {
    setVaxMenuAnchor(null);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar style={{ justifyContent: "space-between", alignItems: "center" }} variant="dense">
          <Link to="/" style={styles.link}>
            <Button
              variant="text"
              sx={{ marginRight: "50px", paddingTop: "10px" }}
              onClick={() => setTitle("")}
            >
              <Grid container>
                <Grid item>
                  <Typography variant="h4"><MdOutlineCoronavirus /></Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5"> COVID-19 Dashboard</Typography>
                </Grid>
              </Grid>
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
              <Link to="/map/us" style={styles.link}>
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
              <Link to="/statistics/us" style={styles.link}>
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
              <Link to="/map" style={styles.link}>
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
              <Link to="/statistics" style={styles.link}>
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
            <Button
              variant="contained"
              sx={{ marginRight: "10px" }}
              onClick={(e) => setVaxMenuAnchor(e.currentTarget)}
              endIcon={<KeyboardArrowDown />}
            >
              Vaccine Data
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={vaxMenuAnchor}
              open={openVaxMenu}
              onClose={handleVaxClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link to="/vaccines/us" style={styles.link}>
                <MenuItem
                  onClick={() => {
                    setTitle("US Vaccines");
                    handleVaxClose();
                  }}
                  sx={{ color: "white" }}
                >
                  US Vaccine Data
                </MenuItem>
              </Link>
              <Divider />
              <Link to="/vaccines" style={styles.link}>
                <MenuItem
                  onClick={() => {
                    setTitle("Global Vaccines");
                    handleVaxClose();
                  }}
                  sx={{ color: "white" }}
                >
                  Global Vaccine Data
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
