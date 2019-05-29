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
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from "mdbreact";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { browserHistory } from "react-router";
import Select from "react-select";
import { FadeLoader } from "react-spinners";
import { Button } from "reactstrap";
import DashBoard from "./dashboard";
import Cookies from "js-cookie";
const dotenv = require("../../src/env");
const config = {
  headers: { Pragma: "no-cache" }
};

let merchantDetails = [];
let mailMessage;
let enableField = false;
let templateErrorTextMessage = "";

const selectStyles = {
  menu: base => ({
    ...base,
    zIndex: 100
  })
};
const statusValues = [
  { label: "Active", value: "Active" },
  { label: "Reject", value: "Rejected" },
  { label: "Inactive", value: "Inactive" }
];

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class MerchantActivation extends Component {
  constructor(props) {
    super(props);

    // this.handleClick = this.handleClick.bind(this);

    this.state = {
      number: "",
      errorTextNumber: "",
      errorTextMoney: "",
      errorTextName: "",
      errorTextOtp: "",
      loading: false,
      statusValue: window.sessionStorage.getItem("isActive"),
      frequency: "",
      merchantName: window.sessionStorage.getItem("firstName"),
      mailID: window.sessionStorage.getItem("mail"),
      templateAccount: "",
      accountLimit: "",
      transactionLimit: "",
      frequency: "",
      responseText: "",
      statusLabel: window.sessionStorage.getItem("isActive"),
      submitDisable: false,
      money: "",
      enable: false,
      open: false,
      name: "",
      otp: "",
      enableInitiate: false,
      mailMessage: false,
      confirmMessage: false,
      errorMessage: false,
      otperrorMessage: false,
      amountLimitReachedMessage: false,
      firstName: "",
      isActive: window.sessionStorage.getItem("isActive"),
      location: window.sessionStorage.getItem("location"),
      mobile: window.sessionStorage.getItem("mobile")
    };

    if (window.sessionStorage.getItem("isActive") === "Active") {
      this.setState({ submitDisable: false });
      enableField = true;

      if (this.state.templateAccount.length == 0) {
        this.templateErrorTextMessage = "This field is required";
      }
    } else {
      this.setState({ submitDisable: true });
      enableField = false;
      this.templateErrorTextMessage = "";
    }
  }

  submitData() {
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    if (this.state.statusValue == "Active") {
      axios
        .post(
          dotenv.API_ROOT + "/merchants/activateMerchant",
          {
            name: this.state.merchantName,
            mobileNumber: this.state.mobile,
            status: this.state.statusValue,
            templateNumber: parseInt(this.state.templateAccount),
            accountLimit: parseInt(this.state.accountLimit),
            transactionLimit: parseInt(this.state.transactionLimit),
            emailId: this.state.mailID,
            frequency: "Daily",
            location: this.state.location
          },
          config
        )
        .then(response => {
          this.setState({ open: true });
          this.setState({ responseText: response.data.response.message });
          window.sessionStorage.setItem("isActive", this.state.statusValue);
        })
        .catch(error => {
          if (error.response) {
            // this.setState({ error: error.response.data.error.message });
          } else {
            this.setState({ error: "Unable to reach Server" });
          }
        });
    } else {
      axios
        .post(
          dotenv.API_ROOT + "/merchants/activateMerchant",
          {
            name: this.state.merchantName,
            mobileNumber: this.state.mobile,
            status: this.state.statusValue,
            emailId: this.state.mailID,
            location: this.state.location
          },
          config
        )
        .then(response => {
          this.setState({ open: true });
          this.setState({ responseText: response.data.response.message });
          window.sessionStorage.setItem("isActive", this.state.statusValue);
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

  handleClose = () => {
    this.setState({ open: false });
    const path = "/merchant";
    browserHistory.push({
      pathname: path
    });
  };
  sendData(target) {
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    axios
      .get(
        dotenv.API_ROOT + "/configs/merchantTemplate?templateNumber=" + target,
        config
      )
      .then(response => {
        if (response.data.response.responseCode == 800) {
          this.setState({
            accountLimit: ""
          });
          this.setState({
            transactionLimit: ""
          });
          this.setState({
            frequency: ""
          });
        } else {
          this.setState({
            accountLimit: response.data.response.message[0].accountLimit
          });
          this.setState({
            transactionLimit: response.data.response.message[0].transactionLimit
          });
          this.setState({
            frequency: response.data.response.message[0].statementFrequency
          });
        }
      })
      .catch(error => {
        if (error.response) {
          // this.setState({ error: error.response.data.error.message });
        } else {
          this.setState({ error: "Unable to reach Server" });
        }
      });
  }

  componentDidMount() {}

  requiredValidation(state) {
    switch (state.target.name) {
      case "number":
        if (state.target.value == "" && state.target.value.length == 0) {
          this.setState({ errorTextNumber: "This field is required" });
          break;
        } else {
          this.setState({ errorTextNumber: "" });
        }
        return;

      case "name":
        if (state.target.value == "" && state.target.value.length == 0) {
          this.setState({ errorTextName: "This field is required" });
        } else {
          this.setState({ errorTextName: "" });
        }
        return;

      case "money":
        if (state.target.value == "" && state.target.value.length == 0) {
          this.setState({ errorTextMoney: "This field is required" });
        } else {
          this.setState({ errorTextMoney: "" });
        }
        return;

      case "otp":
        if (state.target.value == "" && state.target.value.length == 0) {
          this.setState({ errorTextOtp: "This field is required" });
        } else {
          this.setState({ errorTextOtp: "" });
        }
        return;
    }
  }

  dropdownValue(value) {
    this.setState({ statusValue: value.value });
    if (value.value == "Active" && this.state.templateAccount.length == 0) {
      this.setState({ submitDisable: false });
      enableField = true;
      this.templateErrorTextMessage = "This field is required";
    } else {
      this.setState({ templateAccount: "" });
      this.setState({ transactionLimit: "" });
      this.setState({ accountLimit: "" });
      this.setState({ frequency: "" });
      this.templateErrorTextMessage = "";
      enableField = false;
      this.setState({ submitDisable: true });
    }
  }

  render() {
    let enable = false;
    let validSubmit = false;

    if (
      this.state.statusValue == "Active" &&
      this.state.templateAccount.length == 0
    ) {
      this.templateErrorTextMessage = "This field is required";
      enable = true;
    } else {
      this.templateErrorTextMessage = "";

      enable = false;
    }

    if (
      this.state.statusValue == "Active" &&
      this.state.accountLimit.length == 0 &&
      this.state.transactionLimit.length == 0 &&
      this.state.frequency.length == 0 &&
      this.state.templateAccount.length > 0
    ) {
      validSubmit = true;
    } else {
      validSubmit = false;
    }
    const enablSubmit =
      this.state.number.length > 9 &&
      this.state.name.length > 0 &&
      this.state.money.length > 0;
    const { fullScreen } = this.props;
    const enabled = this.state.number.length > 0 && this.state.money.length > 0;

    return (
      <div className="col-md-12">
        {(() => {
          if (this.state.responseText) {
            return (
              <Dialog
                fullScreen={fullScreen}
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">{"Note"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {this.state.responseText}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            );
          }
        })()}
        }
        {(() => {
          if (this.state.confirmMessage === true) {
            return (
              <Dialog
                fullScreen={fullScreen}
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">{"Note"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Funds added to Payer Account
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            );
          }
        })()}
        }
        <DashBoard />
        <MDBCol>
          <MDBCard
            style={{
              width: "1000px",
              height: "530px",
              marginTop: "120px",
              marginLeft: "180px"
            }}
          >
            <MDBCardBody>
              <MDBCardTitle style={{ color: "#4D4F5C", fontSize: "20px" }}>
                Merchant Activation
              </MDBCardTitle>

              <MuiThemeProvider>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Enter Mobile"
                      floatingLabelText="Mobile  "
                      required={true}
                      disabled
                      name="number"
                      value={this.state.mobile}
                      onChange={(event, newValue) =>
                        this.setState({ mobile: newValue })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Merchant Name"
                      floatingLabelText="Merchant Name "
                      required={true}
                      name="name"
                      disabled
                      value={this.state.merchantName}
                      onBlur={event => this.requiredValidation(event)}
                      errorText={this.state.errorTextName}
                      onChange={(event, newValue) =>
                        this.setState({ merchantName: newValue })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Enter Location"
                      type="text"
                      disabled
                      floatingLabelText="Location "
                      required={true}
                      name="location"
                      value={this.state.location}
                      onBlur={event => this.requiredValidation(event)}
                      errorText={this.state.errorTextMoney}
                      onChange={(event, newValue) =>
                        this.setState({ location: newValue })
                      }
                    />
                  </div>
                  <div
                    className="col-md-6"
                    style={{ marginTop: "1%", width: "31%", marginLeft: "1%" }}
                  >
                    <p
                      style={{
                        color: "rgba(0, 0, 0, 0.3)",
                        fontSize: "13px",
                        fontWeight: "bold"
                      }}
                    >
                      Status
                    </p>
                    <Select
                      styles={selectStyles}
                      options={statusValues}
                      onChange={e => this.dropdownValue(e)}
                      // value={stateValue}
                      defaultValue={{
                        label: this.state.statusLabel,
                        value: this.state.statusLabel
                      }}
                      floatingLabelText="Status"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Enter Email Id"
                      floatingLabelText="Email Id "
                      required={true}
                      name="location"
                      disabled
                      pattern="[0-9]*"
                      value={this.state.mailID}
                      onBlur={event => this.requiredValidation(event)}
                      errorText={this.state.errorTextMoney}
                      onChange={(event, newValue) =>
                        this.setState({ mailID: newValue })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Enter  Template Account"
                      type="number"
                      floatingLabelText="Assign Template Acccount "
                      required={true}
                      disabled={!enableField}
                      name="status"
                      value={this.state.templateAccount}
                      onInput={e => this.sendData(e.target.value)}
                      errorText={this.templateErrorTextMessage}
                      onChange={(event, newValue) =>
                        this.setState({ templateAccount: newValue })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Enter Account Limit"
                      type="number"
                      floatingLabelText="Account Limit "
                      required={true}
                      disabled
                      name="location"
                      value={this.state.accountLimit}
                      pattern="[0-9]*"
                      onBlur={event => this.requiredValidation(event)}
                      errorText={this.state.errorTextMoney}
                      onChange={(event, newValue) =>
                        this.setState({ accountLimit: newValue })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Enter Transaction Limit"
                      type="number"
                      disabled
                      floatingLabelText="Transaction Limit "
                      required={true}
                      value={this.state.transactionLimit}
                      name="status"
                      onBlur={event => this.requiredValidation(event)}
                      errorText={this.state.errorTextOtp}
                      onChange={(event, newValue) =>
                        this.setState({ transactionLimit: newValue })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Enter Frequency"
                      floatingLabelText="Frequency "
                      required={true}
                      disabled
                      name="status"
                      value={this.state.frequency}
                      onBlur={event => this.requiredValidation(event)}
                      errorText={this.state.errorTextOtp}
                      onChange={(event, newValue) =>
                        this.setState({ frequency: newValue })
                      }
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="col-md-6">
                    <Button
                      color="danger"
                      onClick={this.submitData.bind(this)}
                      disabled={enable || validSubmit}
                      style={{
                        marginTop: "8%",
                        width: "27%",
                        marginLeft: "81%"
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
                <div className="col-md-12" style={{ marginLeft: "-3%" }}>
                  <FadeLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    style={{ marginLeft: "20px" }}
                    color={"#123abc"}
                    loading={this.state.loading}
                  />
                </div>
              </MuiThemeProvider>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    );
  }
}
MerchantActivation.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};
export default withMobileDialog()(MerchantActivation);
