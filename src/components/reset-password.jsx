import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import React, { Component } from "react";
import { browserHistory } from "react-router";
import { Button } from "reactstrap";
import Cookies from "js-cookie";
const dotenv = require("../../src/env");

const config = {
  headers: { Pragma: "no-cache" }
};

const alert = {
  marginRight: "150px",

  marginLeft: "175px",

  marginTop: "20px",

  padding: "15px",

  fontStyle: "italic",

  color: "red",

  fontWeight: "bold",
  fontSize: "15px",

  textAlign: "center",

  width: "50%"
};

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: "",
      password: "",
      error: "",
      defaultPassword: "",
      newPassword: "",
      confirmPassword: "",
      errorTextMail: null,
      errorpassword1: null,
      errorpassword2: null,
      errorpassword3: null,
      validateforNewPassword: false,
      validateforConfirmPassword: false,
      open: false
    };
  }

  handleClose = () => {
    this.setState({ open: false });
    const path = "/";
    browserHistory.push(path);
  };

  handleClick() {
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({
        error: "New Password and Confirm Password does not match"
      });
    } else {
      axios
        .post(
          dotenv.API_ROOT + "/agents/changePassword",
          {
            userId: window.sessionStorage.getItem("userId"),
            default: this.state.defaultPassword,
            newPassword: this.state.newPassword
          },
          config
        )
        .then(response => {
          if (response.data.response.responsecode == 700) {
            this.setState({ open: true });
          } else if (
            response.data.response.message === "error in changing the password"
          ) {
            this.setState({ error: "Default Password  is invalid" });
          } else {
            this.setState({ error: response.data.response.message });
          }
        })
        .catch(error => {
          if (error.response) {
            this.setState({ error: error.response.data.error.message });
          } else {
            this.setState({ error: "Unable to reach Server" });
          }
        });
    }
  }

  requiredValidation(state) {
    switch (state.target.name) {
      case "userId":
        if (state.target.value == "" && state.target.value.length == 0) {
          this.setState({ errorTextMail: "This field is required" });
          break;
        } else {
          this.setState({ errorTextMail: "" });
        }
        return;

      case "password1":
        if (state.target.value == "" && state.target.value.length == 0) {
          this.setState({ errorpassword1: "This field is required" });
        } else {
          this.setState({ errorpassword1: "" });
        }
        return;
      case "password2":
        if (state.target.value == "" && state.target.value.length == 0) {
          this.setState({ errorpassword2: "This field is required" });
        } else if (!state.target.validity.valid) {
          this.setState({
            errorpassword2:
              "Must contain atleast 1 small-case letter, 1 upper-case letter, 1 digit, 1 special character and the length should be between 6-8 characters"
          });
        } else {
          this.setState({ errorpassword2: "" });
        }

        return;

      case "password3":
        if (state.target.value == "" && state.target.value.length == 0) {
          this.setState({ errorpassword3: "This field is required" });
          break;
        } else if (!state.target.validity.valid) {
          this.setState({
            errorpassword3:
              "Must contain atleast 1 small-case letter, 1 upper-case letter, 1 digit, 1 special character and the length should be between 6-8 characters"
          });
        } else {
          this.setState({ errorpassword3: "" });
        }
        return;
    }
  }

  passwordValidate(event) {
    switch (event.target.name) {
      case "password2":
        if (!event.target.validity.valid) {
          this.setState({
            errorpassword2:
              "Must contain atleast 1 small-case letter, 1 upper-case letter, 1 digit, 1 special character and the length should be between 6-8 characters"
          });
          this.setState({ validateforNewPassword: true });
        } else {
          this.setState({
            errorpassword2: ""
          });
          this.setState({ validateforNewPassword: false });
        }
        break;

      case "password3":
        if (!event.target.validity.valid) {
          this.setState({
            errorpassword3:
              "Must contain atleast 1 small-case letter, 1 upper-case letter, 1 digit, 1 special character and the length should be between 6-8 characters"
          });
          this.setState({ validateforConfirmPassword: true });
        } else {
          this.setState({
            errorpassword3: ""
          });
          this.setState({ validateforConfirmPassword: false });
        }
        break;
    }
  }

  handleChage(e) {}

  render() {
    const { email, password, error } = this.state;

    const { fullScreen } = this.props;
    const enabled =
      this.state.defaultPassword.length > 0 &&
      this.state.newPassword.length > 0 &&
      this.state.confirmPassword.length > 0;

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
            <DialogContentText>Password changed Successfully</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <form>
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
                  marginTop: "20%",
                  marginLeft: "39%",
                  color: "#808080"
                }}
              >
                RESET PASSWORD
              </div>

              <div style={{ marginLeft: "25%" }}>
                <div style={{ marginTop: "1%" }}>
                  <img
                    className="col-md-6"
                    style={{ width: "11%", height: "2%", marginTop: "8%" }}
                    src={require("../assets/user_id.png")}
                  />

                  <TextField
                    style={{ marginLeft: "10px" }}
                    hintText="Enter your User Id"
                    floatingLabelText="User Id *"
                    name="userId"
                    value={window.sessionStorage.getItem("userId")}
                    autoComplete="off"
                    disabled
                  />
                  <br />
                  <img
                    className="col-md-6"
                    style={{ width: "11%", height: "2%", marginTop: "8%" }}
                    src={require("../assets/password1.jfif")}
                  />
                  <TextField
                    style={{ marginLeft: "10px" }}
                    hintText="Enter your Password"
                    type="password"
                    autoComplete="off"
                    floatingLabelText="Default Password *"
                    required={true}
                    name="password1"
                    onBlur={event => this.requiredValidation(event)}
                    errorText={this.state.errorpassword1}
                    onChange={(event, newValue) =>
                      this.setState({ defaultPassword: newValue })
                    }
                  />
                  <br />
                  <img
                    className="col-md-6"
                    style={{ width: "11%", height: "2%", marginTop: "8%" }}
                    src={require("../assets/password1.jfif")}
                  />
                  <TextField
                    style={{ marginLeft: "10px" }}
                    hintText="Enter your Password"
                    type="password"
                    floatingLabelText="New Password *"
                    required={true}
                    autoComplete="off"
                    name="password2"
                    pattern="(?=^.{6,8}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$"
                    onInput={event => this.passwordValidate(event)}
                    onBlur={event => this.requiredValidation(event)}
                    errorText={this.state.errorpassword2}
                    onChange={(event, newValue) =>
                      this.setState({ newPassword: newValue })
                    }
                  />
                  <br />
                  <img
                    className="col-md-6"
                    style={{ width: "11%", height: "2%", marginTop: "8%" }}
                    src={require("../assets/password1.jfif")}
                  />
                  <TextField
                    style={{ marginLeft: "10px" }}
                    hintText="Enter your Password"
                    type="password"
                    floatingLabelText="Confirm Password *"
                    required={true}
                    autoComplete="off"
                    pattern="(?=^.{6,8}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$"
                    name="password3"
                    onInput={event => this.passwordValidate(event)}
                    onBlur={event => this.requiredValidation(event)}
                    onChange={(event, newValue) =>
                      this.setState({ confirmPassword: newValue })
                    }
                    errorText={this.state.errorpassword3}
                  />
                </div>

                <Button
                  color="danger"
                  style={{
                    marginTop: "9%",
                    marginLeft: "23%",
                    fontSize: "12px"
                  }}
                  disabled={
                    !enabled ||
                    this.state.validateforNewPassword ||
                    this.state.validateforConfirmPassword
                  }
                  className="submit"
                  onClick={this.handleClick}
                >
                  Submit
                </Button>
              </div>
            </MuiThemeProvider>

            {error && <div style={alert}>{error}</div>}
          </div>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
