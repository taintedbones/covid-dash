import React, { useState } from "react";
import {
  Button,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

const styles = {
  link: {
    textDecoration: "none",
    color: "white",
  },
  button: {
  },
  drawer: {
  },
};

function NavDrawer() {
  const [open, setOpen] = useState<boolean>(false);
  const links = [
    { text: "US Map", url: "/map/us" },
    { text: "US Statistics", url: "/statistics/us" },
    { text: "Global Map", url: "/map" },
    { text: "Global Statistics", url: "/statistics" },
    { text: "US Vaccines", url: "/vaccines/us" },
    { text: "Global Vaccines", url: "/vaccines" },
  ];

  const toggleDrawer = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer} sx={styles.button}>
        <Menu />
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        sx={styles.drawer}
      >
        <List>
          {links.map((item) => (
            <Link to={item.url} style={styles.link}>
              <ListItem>
                <ListItemText primary={item.text} />
              </ListItem>
              <Divider />
            </Link>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
}

export default NavDrawer;
