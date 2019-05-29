import { css } from "@emotion/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from "mdbreact";
import React, { Component } from "react";
import { FadeLoader } from "react-spinners";
import { Button } from "reactstrap";
import DashBoard from "./dashboard";
import Cookies from "js-cookie";
const dotenv = require("../../src/env");

let merchantDetails = [];
let mailMessage;
const config = {
  headers: { Pragma: "no-cache" }
};
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const css1 = `

TextField{
  cursor: default !important;
}

.label-heading{
  color: rgb(0,188,212) !important;
}


`;
class PayerLoadFunds extends Component {
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
      validate1: false,
      validate2: false,
      validate3: false,
      disableFund: false
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClose1 = () => {
    this.setState({ open: false });
    window.location.reload();
  };
  route() {
    this.setState({ disableFund: false });
    this.setState({ loading: true });
    this.setState({ errorMessage: false });
    this.setState({ mailMessage: false });
    this.setState({ confirmMessage: false });
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    axios
      .post(
        dotenv.API_ROOT + "/accounts/loadFunds",
        {
          mobileNumber: this.state.number
        },
        config
      )
      .then(response => {
        if (response.data.response.responseCode == 700) {
          this.setState({ loading: false });
          this.setState({ open: true });
          this.setState({ disableFund: true });
          this.setState({ mailMessage: true });
          this.setState({ enable: true });
        } else if (response.data.response.responseCode == 800) {
          this.setState({ loading: false });
          this.setState({ open: true });
          this.setState({ errorMessage: true });
          this.setState({ enable: false });
        }
      })
      .catch(error => {
        this.setState({ enable: false });
        if (error.response) {
          this.setState({ error: error.response.data.error.message });
        } else {
          this.setState({ error: "Unable to reach Server" });
        }
      });

    this.setState({ enableInitiate: true });
  }

  componentDidMount() {
    window.sessionStorage.getItem("currency");

    if (window.sessionStorage.getItem("currency") == "AUD") {
      window.sessionStorage.setItem("currencyImage", "A$");
    } else if (window.sessionStorage.getItem("currency") == "INR") {
      window.sessionStorage.setItem("currencyImage", "₹");
    } else if (window.sessionStorage.getItem("currency") == "USD") {
      window.sessionStorage.setItem("currencyImage", "$");
    } else if (window.sessionStorage.getItem("currency") == "AED") {
      window.sessionStorage.setItem("currencyImage", "د.إ");
    } else if (window.sessionStorage.getItem("currency") == "EUR") {
      window.sessionStorage.setItem("currencyImage", "€");
    } else if (window.sessionStorage.getItem("currency") == "GBP") {
      window.sessionStorage.setItem("currencyImage", "£");
    } else if (window.sessionStorage.getItem("currency") == "THB") {
      window.sessionStorage.setItem("currencyImage", "฿");
    } else if (window.sessionStorage.getItem("currency") == "SGD") {
      window.sessionStorage.setItem("currencyImage", "S$");
    }
    // this.handleClick()
  }
  submitLoadfunds() {
    this.setState({ confirmMessage: false });
    this.setState({ otperrorMessage: false });
    this.setState({ errorMessage: false });
    this.setState({ mailMessage: false });
    this.setState({ amountLimitReachedMessage: false });
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");

    axios
      .post(
        dotenv.API_ROOT + "/accounts/confirmOTP",
        {
          mobileNumber: this.state.number,
          amount: parseInt(this.state.money),
          otp: parseInt(this.state.otp),
          agentId: window.sessionStorage.getItem("loginId")
        },
        config
      )
      .then(response => {
        if (response.data.response.message == "Amount Added to Payer Account") {
          this.setState({ open: true });
          this.setState({ confirmMessage: true });
        } else if (response.data.response.message == "Invalid OTP") {
          this.setState({ open: true });
          this.setState({ errorMessage: false });
          this.setState({ mailMessage: false });
          this.setState({ confirmMessage: false });
          this.setState({ otperrorMessage: true });
          this.setState({ amountLimitReachedMessage: false });
        } else if (
          response.data.response.message == "Payer Account Limit Reached"
        ) {
          this.setState({ open: true });
          this.setState({ errorMessage: false });
          this.setState({ mailMessage: false });
          this.setState({ confirmMessage: false });
          this.setState({ amountLimitReachedMessage: true });
        }
      })
      .catch(error => {
        if (error.response) {
          this.setState({ error: error.response.data.error.message });
        } else {
          this.setState({ error: "Unable to reach Server" });
        }
      });

    this.setState({ enable: true });
    this.setState({ enableInitiate: true });
  }

  checkMobile() {}

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  requiredValidation(state) {
    switch (state.target.name) {
      case "number":
        if (state.target.value == "" && state.target.value.length == 0) {
          this.setState({ errorTextNumber: "This field is required" });
          break;
        } else if (!state.target.validity.valid) {
          this.setState({ errorTextNumber: "Must be Numeric" });
          this.setState({ validate2: true });
        } else {
          this.setState({ errorTextNumber: "" });
          this.setState({ validate2: false });
        }
        return;

      // case "name":
      //   if (state.target.value == "" && state.target.value.length == 0) {
      //     this.setState({ errorTextName: "This field is required" });
      //   } else {
      //     this.setState({ errorTextName: "" });
      //   }
      //   return;

      case "money":
        if (state.target.value == "" && state.target.value.length == 0) {
          this.setState({ errorTextMoney: "This field is required" });
        } else if (!state.target.validity.valid) {
          this.setState({
            errorTextMoney:
              "Minimum amount should be" +
              window.sessionStorage.getItem("currencyImage") +
              "1"
          });
          this.setState({ validate1: true });
        } else {
          this.setState({ errorTextMoney: "" });
          this.setState({ validate1: false });
        }
        return;

      case "otp":
        if (state.target.value == "" && state.target.value.length == 0) {
          this.setState({ errorTextOtp: "This field is required" });
        } else if (!state.target.validity.valid) {
          this.setState({ errorTextOtp: "Must be Numeric" });
          this.setState({ validate3: true });
        } else {
          this.setState({ errorTextOtp: "" });
          this.setState({ validate3: false });
        }
        return;
    }
  }

  validateNumber(event) {
    switch (event.target.name) {
      case "number":
        if (event.target.validity.valid) {
          this.setState({ errorTextNumber: "" });
          this.setState({ validate2: false });
        } else {
          this.setState({ errorTextNumber: "Must be Numeric" });
          this.setState({ validate2: true });
        }
        break;

      case "money":
        if (event.target.validity.valid) {
          this.setState({ errorTextMoney: "" });
          this.setState({ validate1: false });
        } else {
          this.setState({
            errorTextMoney:
              "Minimum amount should be " +
              window.sessionStorage.getItem("currencyImage") +
              "1"
          });
          this.setState({ validate1: true });
        }
        break;
      case "otp":
        if (event.target.validity.valid) {
          this.setState({ errorTextOtp: "" });
          this.setState({ validate3: false });
        } else {
          this.setState({ errorTextOtp: "Must be Numeric" });
          this.setState({ validate3: true });
        }
        break;
    }
  }
  fetchPayerName(event) {
    switch (event.target.name) {
      case "number":
        if (event.target.validity.valid) {
          this.setState({ errorTextNumber: "" });
          this.setState({ validate2: false });
        } else {
          this.setState({ errorTextNumber: "Must be Numeric" });
          this.setState({ validate2: true });
        }
        break;

      case "money":
        if (event.target.validity.valid) {
          this.setState({ errorTextMoney: "" });
          this.setState({ validate1: false });
        } else {
          this.setState({
            errorTextMoney:
              "Minimum amount should be" +
              window.sessionStorage.getItem("currencyImage") +
              "1"
          });
          this.setState({ validate1: true });
        }
        break;
    }
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    axios
      .get(
        dotenv.API_ROOT +
          "/accounts/getPayerName?mobileNumber=" +
          event.target.value,
        config
      )
      .then(response => {
        if (response.data.response.responseCode == 700) {
          this.setState({ name: response.data.response.message });
        } else {
          this.setState({ name: "" });
          this.setState({ error: response.data.response.message });
        }
      })
      .catch(error => {
        if (error.response) {
          this.setState({ error: error.response.data.error.message });
        } else {
          this.setState({ error: "Unable to Fetch Payer Name" });
        }
      });
  }
  render() {
    const validate = this.state.otp.length > 0;
    const enablSubmit =
      this.state.number.length > 9 &&
      this.state.name.length > 0 &&
      this.state.money.length > 0;
    const { fullScreen } = this.props;
    const enabled = this.state.number.length > 0 && this.state.money.length > 0;

    return (
      <div className="col-md-12">
        {(() => {
          if (this.state.mailMessage === true) {
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
                    OTP sent to Payer registered email ID
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

          if (this.state.amountLimitReachedMessage === true) {
            return (
              <Dialog
                fullScreen={fullScreen}
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Error"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Payer Account Limit Reached
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
          if (this.state.errorMessage === true) {
            return (
              <Dialog
                fullScreen={fullScreen}
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Error"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>Account not found</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            );
          }
          if (this.state.otperrorMessage === true) {
            return (
              <Dialog
                fullScreen={fullScreen}
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Error"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>Enterd OTP is invalid</DialogContentText>
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
                  <Button onClick={this.handleClose1} color="primary" autoFocus>
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
              height: "450px",
              marginTop: "120px",
              marginLeft: "180px"
            }}
          >
            <MDBCardBody>
              <MDBCardTitle style={{ color: "#4D4F5C", fontSize: "20px" }}>
                Payer Load Funds
              </MDBCardTitle>

              <MuiThemeProvider>
                <div className="col-md-12">
                  <style>{css1}</style>
                  <div className="col-md-6">
                    <img
                      className="col-md-6"
                      style={{ width: "11%", height: "4%", marginTop: "9%" }}
                      src={require("../assets/mobile_number.jpg")}
                    />

                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Enter Number"
                      floatingLabelText="Payer Number *"
                      required={true}
                      name="number"
                      autoComplete="off"
                      maxlength="10"
                      autoComplete="off"
                      pattern="[0-9]*"
                      // onInput={e => this.validateNumber(e)}
                      onInput={event => this.fetchPayerName(event)}
                      onBlur={event => this.requiredValidation(event)}
                      errorText={this.state.errorTextNumber}
                      onChange={(event, newValue) =>
                        this.setState({ number: newValue })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <img
                      className="col-md-6"
                      style={{ width: "11%", height: "4%", marginTop: "9%" }}
                      src={require("../assets/template_name.png")}
                    />

                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Enter Amount"
                      floatingLabelText="Payer Name"
                      required={true}
                      autoComplete="off"
                      disabled
                      value={this.state.name}
                      name="name"
                      onBlur={event => this.requiredValidation(event)}
                      errorText={this.state.errorTextName}
                      onChange={(event, newValue) =>
                        this.setState({ name: newValue })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <span
                      className="col-md-6 inr-symbol"
                      style={{
                        width: "11%",
                        height: "4%",
                        marginTop: "9%",
                        fontSize: "15px"
                      }}
                    >
                      {window.sessionStorage.getItem("currencyImage")}
                    </span>

                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Load Funds"
                      type="text"
                      floatingLabelText="Load Funds *"
                      required={true}
                      name="money"
                      autoComplete="off"
                      disabled={this.state.disableFund}
                      maxlength="5"
                      pattern="^((?!(0))[0-9]{0,5})$"
                      onInput={e => this.validateNumber(e)}
                      onBlur={event => this.requiredValidation(event)}
                      errorText={this.state.errorTextMoney}
                      onChange={(event, newValue) =>
                        this.setState({ money: newValue })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <img
                      className="col-md-6"
                      style={{ width: "11%", height: "4%", marginTop: "9%" }}
                      src={require("../assets/otp.png")}
                    />

                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Enter OTP"
                      floatingLabelText="OTP *"
                      required={true}
                      name="otp"
                      maxlength="4"
                      autoComplete="off"
                      disabled={!this.state.enable}
                      pattern="[0-9]*"
                      onInput={e => this.validateNumber(e)}
                      onBlur={event => this.requiredValidation(event)}
                      errorText={this.state.errorTextOtp}
                      onChange={(event, newValue) =>
                        this.setState({ otp: newValue })
                      }
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="col-md-6">
                    <Button
                      title="Initiate Load"
                      disabled={
                        !enablSubmit ||
                        this.state.validate1 ||
                        this.state.validate2
                      }
                      color="danger"
                      style={{
                        marginTop: "8%",
                        marginLeft: "60%",
                        width: "27%"
                      }}
                      onClick={this.route.bind(this)}
                    >
                      Generate OTP
                    </Button>
                  </div>
                  <div className="col-md-6">
                    <Button
                      color="danger"
                      onClick={this.submitLoadfunds.bind(this)}
                      disabled={
                        !this.state.enable || !validate || this.state.validate3
                      }
                      style={{
                        marginTop: "8%",
                        width: "27%"
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

export default PayerLoadFunds;
