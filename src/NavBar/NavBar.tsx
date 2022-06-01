import { AppBar, Box, Button, Toolbar, Typography, Grid } from "@mui/material";
import { MdOutlineCoronavirus } from "react-icons/md";
import { Link } from "react-router-dom";
import NavDrawer from "./NavDrawer";
import NavMenu from "./NavMenu";

function NavBar() {
  const options = {
    us: [
      { text: "US Map", url: "/map/us" },
      { text: "US Statistics", url: "/statistics/us" },
    ],
    global: [
      { text: "Global Map", url: "/map" },
      { text: "Global Statistics", url: "/statistics" },
    ],
    vaccine: [
      { text: "US Vaccine Data", url: "/vaccines/us" },
      { text: "Global Vaccine Data", url: "/vaccines" },
    ],
  };

  const styles = {
    link: {
      textDecoration: "none",
    },
    menuBox: {
      flexGrow: 1,
      display: { xs: "none", md: "flex" },
      gap: "10px",
      justifyContent: "flex-end",
    },
    button: {
      // width: "100%",
    },
    drawerBox: {
      flexGrow: 1,
      display: { xs: "flex", md: "none" },
      justifyContent: "flex-end",
    },
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Link to="/" style={styles.link}>
            <Button variant="text" style={styles.button}>
              <Typography
                variant="h4"
                style={{ position: "relative", top: "5px" }}
              >
                <MdOutlineCoronavirus />
              </Typography>
              <Typography variant="h5"> COVID-19 Dashboard</Typography>
            </Button>
          </Link>
          <Box sx={styles.menuBox}>
            <NavMenu label="US Data" options={options.us} />
            <NavMenu label="Global Data" options={options.global} />
            <NavMenu label="Vaccine Data" options={options.vaccine} />
          </Box>
          <Box sx={styles.drawerBox}>
            <NavDrawer />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
