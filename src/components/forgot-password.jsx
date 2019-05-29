import { css } from "@emotion/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { browserHistory } from "react-router";
import { FadeLoader } from "react-spinners";
import { Button } from "reactstrap";
import Cookies from "js-cookie";
const dotenv = require("../../src/env");
const config = {
  headers: { Pragma: "no-cache" }
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const alert = {
  marginRight: "150px",

  marginLeft: "180px",

  marginTop: "20px",

  textAlign: "center",

  padding: "15px",

  fontStyle: "italic",

  color: "red",

  fontWeight: "bold",
  fontSize: "15px",

  textAlign: "center",

  width: "50%"
};

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: "",
      errorTextMessage: "",
      loading: false,
      error: "",
      open: false
    };
  }
  result() {
    const path = "/";
    browserHistory.push(path);
  }
  handleClose = () => {
    this.setState({ open: false });
    const path = "/restPassword";
    browserHistory.push(path);
  };
  handleClick() {
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    this.setState({ error: "" });

    this.setState({ loading: true });
    axios
      .post(
        dotenv.API_ROOT + "/agents/forgotpassword",
        {
          userId: this.state.email
        },
        config
      )
      .then(response => {
        if (response.data.response.responsecode == 700) {
          window.sessionStorage.setItem("userId", this.state.email);
          this.setState({ loading: false });
          this.setState({ open: true });
        } else if (response.data.response.responseCode == 800) {
          this.setState({ loading: false });
          this.setState({ error: response.data.response.message });
        } else {
          this.setState({ error: response.data.response.message });
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        if (error.response) {
          this.setState({ error: error.response.data.error.message });
        } else {
          this.setState({ error: "Unable to reach Server" });
        }
      });
  }

  requiredValidation(state) {
    if (state.target.value == "" && state.target.value.length == 0) {
      this.setState({ errorTextMessage: "This field is required" });
    } else {
      this.setState({ errorTextMessage: "" });
    }
  }

  render() {
    const { fullScreen } = this.props;

    const { error } = this.state;

    const enabled = this.state.email.length > 0;
    return (
      <div className="col-md-12">
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Note"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Default Password sent to registered email ID
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <div className="col-md-6 bckgImage">
          {/* <img className="image-style" src={require("../assets/login.jpg")} /> */}
          <img className="logo" src={require("../assets/Logo.svg")} />
          <div className="logo-svg">agent</div>
        </div>
        <div className="col-md-6">
          <MuiThemeProvider>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginTop: "30%",
                marginLeft: "39%",
                color: "#808080"
              }}
            >
              FORGOT PASSWORD
            </div>

            <div style={{ marginLeft: "25%" }}>
              <div style={{ marginTop: "1%" }}>
                <img
                  className="col-md-6"
                  style={{
                    width: "11%",
                    height: "2%",
                    marginTop: "8%",
                    color: "#808080"
                  }}
                  src={require("../assets/user_id.png")}
                />
                <TextField
                  style={{ marginLeft: "10px" }}
                  hintText="Enter your User Id"
                  floatingLabelText="User Id *"
                  required={true}
                  autoComplete="off"
                  onBlur={event => this.requiredValidation(event)}
                  errorText={this.state.errorTextMessage}
                  onChange={(event, newValue) =>
                    this.setState({ email: newValue })
                  }
                />
              </div>

              <Button
                color="danger"
                style={{
                  marginTop: "10%",
                  marginLeft: "25%",
                  width: "27%",
                  fontSize: "12px"
                }}
                disabled={!enabled}
                className="submit"
                onClick={this.handleClick}
              >
                Submit
              </Button>
              <a onClick={this.result}>
                <div
                  style={{
                    marginLeft: "28%",
                    marginTop: "4%"
                  }}
                >
                  <img
                    style={{ width: "4%", marginRight: "3%" }}
                    src={require("../assets/left-arrow.svg")}
                  />
                  <span style={{ color: "#808080", fontWeight: "bold" }}>
                    Back to Login
                  </span>
                </div>
              </a>
              <div className="sweet-loading" style={{ marginLeft: "-20%" }}>
                <FadeLoader
                  css={override}
                  sizeUnit={"px"}
                  size={150}
                  color={"#123abc"}
                  loading={this.state.loading}
                />
              </div>
            </div>
          </MuiThemeProvider>
          {error && <div style={alert}>{error}</div>}
        </div>
      </div>
    );
  }
}
ForgotPassword.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};
export default withMobileDialog()(ForgotPassword);
