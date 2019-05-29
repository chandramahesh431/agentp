import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import Avatar from "react-avatar";
import { browserHistory } from "react-router";
import { HashRouter } from "react-router-dom";
import Cookies from "js-cookie";

const css = `
.pointer:hover {
  cursor: pointer;
}
`;

const drawerWidth = 200;
let path2;
const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      backgroundColor: "#43425D",
      color: "#43425D"
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      backgroundColor: "#43425D"
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "#43425D",
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      backgroundColor: "#43425D"
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 2 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 6 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class Dashboard extends React.Component {
  state = {
    open: false,
    anchorEl: null
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  route(key, text) {
    switch (text) {
      case "Dashboard":
        const path = "/homepage";
        browserHistory.push(path);
        break;

      case "Profile":
        const path1 = "/profile";
        browserHistory.push(path1);
        break;

      case "Settings":
        this.setState({ anchorEl: key.currentTarget });

        break;

      case "Cash Register":
        const path2 = "/cashRegister";
        browserHistory.push(path2);
        break;

      case "Help":
        const path3 = "/helpPage";
        browserHistory.push(path3);
        break;

      default:
        break;
    }
  }

  routetoTemplate() {
    const path = "/template";
    browserHistory.push(path);
  }
  routeToSystemParameters() {
    const path = "/systemParameters";
    browserHistory.push(path);
  }

  logout() {
    Cookies.remove("x-auth-token");
    const path = "/";
    browserHistory.push(path);
  }

  render() {
    const { anchorEl } = this.state;

    const { classes, theme } = this.props;

    return (
      <HashRouter>
        <div className={classes.root}>
          <style>{css}</style>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open
            })}
          >
            <Toolbar
              style={{ backgroundColor: "white" }}
              disableGutters={!this.state.open}
            >
              {/* <Avatar facebookId="100008343750912"  /> */}
              <div className="col-md-12">
                <div className="col-md-10">
                  <IconButton
                    style={{ color: "#43425D", marginLeft: "-2%" }}
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(classes.menuButton, {
                      [classes.hide]: this.state.open
                    })}
                  >
                    <MenuIcon />
                  </IconButton>
                </div>

                {/* <div className="col-md-1">
                  {" "}
                  <img
                    style={{
                      width: "30%",
                      height: "4%",
                      color: "#BCBCCB",
                      marginTop: "12%",
                      marginLeft: "75%"
                    }}
                    src={require("../assets/notification.png")}
                  />
                </div> */}
                <div className="col-md-1">
                  <Avatar
                    // twitterHandle="sitebase"
                    src={require("../assets/user.png")}
                    value="86%"
                    size="40"
                    style={{ marginLeft: "40px" }}
                    round="20px"
                  />
                </div>
                <div className="col-md-1">
                  {/* <button> */}
                  <img
                    className="pointer"
                    style={{
                      color: "#BCBCCB",
                      marginTop: "3%"
                    }}
                    src={require("../assets/logout.png")}
                    title="Logout"
                    onClick={this.logout}
                  />
                  {/* </button> */}
                </div>
              </div>

              {/* <Typography variant="h6" color="inherit" noWrap>
            </Typography> */}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open
              })
            }}
            open={this.state.open}
          >
            <div
              style={{ backgroundColor: "#43425D", height: "15%" }}
              className={classes.toolbar}
            >
              <div>
                <img
                  style={{
                    width: "100%",
                    marginRight: "-66px",
                    marginTop: "10%"
                  }}
                  src={require("../assets/Logo.svg")}
                />
                <p
                  style={{
                    color: "white",
                    marginTop: "1%",
                    textAlign: "center"
                  }}
                >
                  agent
                </p>
              </div>

              <IconButton
                onClick={this.handleDrawerClose}
                style={{ color: "white" }}
              >
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List style={{ backgroundColor: "#43425D", height: "100%" }}>
              {[
                "Dashboard",
                "Settings",
                "Profile",
                "Cash Register",
                "Help",
                ""
              ].map((text, index) => (
                <ListItem
                  button
                  key={text}
                  onClick={key => this.route(key, text)}
                  style={{ color: "white" }}
                >
                  <ListItemIcon>
                    {(() => {
                      if (index === 0) {
                        return (
                          <img
                            style={{ color: "#A5A4BF" }}
                            src={require("../assets/dashboard1.png")}
                            title="Dashboard"
                          />
                        );
                      }

                      if (index === 1) {
                        return (
                          <img
                            style={{ color: "#A5A4BF" }}
                            src={require("../assets/settings.png")}
                            title="Settings"
                          />
                        );
                      }
                      if (index === 2) {
                        return (
                          <img
                            style={{ color: "#A5A4BF" }}
                            src={require("../assets/user1.png")}
                            title="Profile"
                          />
                        );
                      }
                      if (index === 3) {
                        return (
                          <img
                            style={{ color: "#A5A4BF" }}
                            src={require("../assets/cash.png")}
                            title="Cash Register"
                          />
                        );
                      }
                      if (index === 4) {
                        return (
                          <img
                            style={{ color: "#A5A4BF" }}
                            src={require("../assets/help.png")}
                            title="Help"
                          />
                        );
                      }
                    })()}
                    <li style={{ color: "white", marginLeft: "17px" }}>
                      {text}
                    </li>{" "}
                  </ListItemIcon>

                  <Menu
                    style={{ marginTop: "4%", marginLeft: "2%" }}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    display="right"
                  >
                    <MenuItem onClick={this.routeToSystemParameters}>
                      System Parameters
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>Frequency</MenuItem>
                    <MenuItem onClick={this.handleClose}>Timeout</MenuItem>
                    <MenuItem onClick={this.handleClose}>Loyality</MenuItem>
                    <MenuItem onClick={this.handleClose}>Admin</MenuItem>
                    <MenuItem onClick={this.handleClose}>
                      Statements & Settlements
                    </MenuItem>
                    <MenuItem onClick={this.routetoTemplate}>
                      Account Templates
                    </MenuItem>
                  </Menu>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Drawer>

          {/* <div className="content">

            <Route path="/Dashboard" component={HomePage} />

            <Route path="/Profile" component={profile} />

            <Route path="/Settings"  />

            <Route path="/Help"  />

          </div> */}
        </div>
      </HashRouter>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Dashboard);
