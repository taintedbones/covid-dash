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
    button: {
      // width: "100%",
    },
  };

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
        <Toolbar variant="dense">
          <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item container xs={4}>
              <Link to="/" style={styles.link}>
                <Button
                  variant="text"
                  style={styles.button}
                  onClick={() => setTitle("")}
                >
                  <Grid item container xs={12} alignItems="center">
                    <Grid item>
                      <Typography variant="h4" style={{position: "relative", top: "5px"}}>
                        <MdOutlineCoronavirus />
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5"> COVID-19 Dashboard</Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5">{title}</Typography>
            </Grid>
            <Grid item container xs={4} spacing={1} justifyContent="flex-end">
              <Grid item>
                <Button
                  variant="contained"
                  style={styles.button}
                  onClick={(e) => setUsMenuAnchor(e.currentTarget)}
                  endIcon={<KeyboardArrowDown />}
                >
                  US Data
                </Button>
              </Grid>
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
              <Grid item>
                <Button
                  variant="contained"
                  style={styles.button}
                  onClick={(e) => setGlobalMenuAnchor(e.currentTarget)}
                  endIcon={<KeyboardArrowDown />}
                >
                  Global Data
                </Button>
              </Grid>
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
              <Grid item xs>
                <Button
                  variant="contained"
                  style={styles.button}
                  onClick={(e) => setVaxMenuAnchor(e.currentTarget)}
                  endIcon={<KeyboardArrowDown />}
                >
                  Vaccine Data
                </Button>
              </Grid>
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
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
