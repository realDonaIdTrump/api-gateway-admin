import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import VectorIcon from "./VectorIcon";
import ViewSidebarRoundedIcon from "@mui/icons-material/ViewSidebarRounded";
import LottieAnimation from "../components/LottieAnimation";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Introduction from "./Introduction";
import Settings from "./Settings";
import Logs from "./Logs";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import vectorAnimationData from "../lotties/Vector_Logo_black_red_RGB.json"; // Path to your vector animation

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function Navigation() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const [selectedPage, setSelectedPage] = React.useState("Introduction");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlePageChange = (page) => {
    setSelectedPage(page);
    console.log(page);
    
  };

  const renderContent = () => {
    switch (selectedPage) {
      case "Introduction":
        return <Introduction onNavigateToSettings={() => handlePageChange("Settings")} />;
      case "Settings":
        return <Settings />;
      case "Logs":
        return <Logs />;
      default:
        return <Introduction onNavigateToSettings={() => handlePageChange("Settings")} />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <ViewSidebarRoundedIcon sx={{ color: "#B70032" }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, color: "#B70032" }}
          >
            Gateway Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ justifyContent: "space-between" }}>
          <LottieAnimation animationData={vectorAnimationData} sx={{ ml: 1 }} loop={true}/>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ViewSidebarRoundedIcon sx={{ color: "#B70032" }} />
            ) : (
              <ViewSidebarRoundedIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {["Introduction", "Settings", "Logs"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handlePageChange(text)}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    borderRight:
                      selectedPage === text
                        ? "2px solid #B70032"
                        : "2px solid transparent", // Tab-like bottom border
                    color: selectedPage === text ? "#B70032" : "inherit", // Text color for the selected page
                    "&:hover": {
                      backgroundColor: "transparent", // Remove background highlight on hover
                    },
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                      color: selectedPage === text ? "#B70032" : "inherit", // Icon color matches the selected state
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {text === "Introduction" && <HomeIcon />}
                  {text === "Settings" && <SettingsIcon />}
                  {text === "Logs" && <ListAltIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                    {
                      color: selectedPage === text ? "#B70032" : "inherit", // Text color matches the selected state
                    },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {renderContent()}
      </Box>
    </Box>
  );
}
