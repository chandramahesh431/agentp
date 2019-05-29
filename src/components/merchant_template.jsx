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
import { Button } from "reactstrap";
import DashBoard from "./dashboard";
import Cookies from "js-cookie";
const dotenv = require("../../src/env");
const config = {
  headers: { Pragma: "no-cache" }
};

let merchantDetails = [];
let defaultNumberValid;
let accountLimitValid;
let transactionLimitValid;
let errorTextNumber;
let errorTextaccountLimit;
let errorTextTransactionLimit;
let errorTextTemplateName;

const css = `
.inr-symbol{
  font-size: 20px;
  color:#000;
}
`;

class MerchantTemplate extends Component {
  constructor(props) {
    super(props);

    this.handleClick1 = this.handleClick1.bind(this);
    // this.route = this.route.bind(this)

    this.state = {
      transactionLimit: "",
      defaultNumber: window.sessionStorage.getItem("templateNumber"),
      accountLimit: "",
      statementFrequency: "",
      settlementFrequency: "",
      templateName: "Merchant Template",
      errorTextaccountLimit: "",
      errorTextTransactionLimit: "",

      open: false
    };
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
    this.handleClick1();
  }
  handleClick1() {
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    axios
      .get(
        dotenv.API_ROOT +
          "/configs/merchantTemplate?templateNumber=" +
          this.state.defaultNumber,
        config
      )
      .then(response => {
        if (response.data.response.responseCode == 700) {
          this.setState({
            accountLimit: response.data.response.message[0].accountLimit
          });
          this.setState({
            transactionLimit: response.data.response.message[0].transactionLimit
          });
          this.setState({
            templateNumber: response.data.response.message[0].templateNumber
          });
          this.setState({
            statementFrequency:
              response.data.response.message[0].statementFrequency
          });
          this.setState({
            settlementFrequency:
              response.data.response.message[0].settlementFrequency
          });
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

  validateNumber(event) {
    switch (event.target.name) {
      case "defaultNumber": {
        if (event.target.validity.valid) {
          defaultNumberValid = true;
          errorTextNumber = "";
        } else if (event.target.value.length == 0) {
          errorTextNumber = "This field is required";
        } else {
          defaultNumberValid = false;
          errorTextNumber = "Must be Numeric";
        }
        break;
      }

      case "accountLimit": {
        if (event.target.value.length == 0) {
          this.setState({ errorTextaccountLimit: "This field is required" });
        } else if (isNaN(event.target.value)) {
          this.setState({ errorTextaccountLimit: "Must be Numeric " });
        } else if (
          this.state.transactionLimit.toString().length > 0 &&
          !isNaN(this.state.transactionLimit) &&
          parseInt(this.state.transactionLimit) >= parseInt(event.target.value)
        ) {
          this.setState({
            errorTextaccountLimit:
              "Account limit should be greater than Transaction limit"
          });
        } else if (
          event.target.validity.valid &&
          this.state.transactionLimit != "" &&
          !isNaN(this.state.transactionLimit) &&
          parseInt(event.target.value) > parseInt(this.state.transactionLimit)
        ) {
          this.setState({ errorTextaccountLimit: "" });
          this.setState({ errorTextTransactionLimit: "" });
        } else if (event.target.validity.valid) {
          this.setState({ errorTextaccountLimit: "" });
        }
        break;
      }

      case "transactionLimit": {
        if (event.target.value.length == 0) {
          this.setState({});
          this.setState({
            errorTextTransactionLimit: "This field is required"
          });
        } else if (isNaN(event.target.value)) {
          this.setState({ errorTextTransactionLimit: "Must be Numeric " });
        } else if (
          this.state.accountLimit.toString().length > 0 &&
          !isNaN(this.state.accountLimit) &&
          parseInt(this.state.accountLimit) <= parseInt(event.target.value)
        ) {
          this.setState({
            errorTextTransactionLimit:
              " Transaction limit should be less than Account limit"
          });
        } else if (
          event.target.validity.valid &&
          this.state.accountLimit != "" &&
          !isNaN(this.state.accountLimit) &&
          parseInt(event.target.value) < parseInt(this.state.accountLimit)
        ) {
          this.setState({ errorTextaccountLimit: "" });
          this.setState({ errorTextTransactionLimit: "" });
        } else if (event.target.validity.valid) {
          this.setState({ errorTextTransactionLimit: "" });
        }
        break;
      }

      case "templateName": {
        if (event.target.value.length == 0) {
          errorTextTemplateName = "This field is required";
        } else {
          errorTextTemplateName = "";
        }
        break;
      }

      default:
        break;
    }
  }

  route() {
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    axios
      .post(
        dotenv.API_ROOT + "/configs/updateMerchantTemplate",
        {
          templateNumber: this.state.defaultNumber,
          accountLimit: parseInt(this.state.accountLimit),
          transactionLimit: parseInt(this.state.transactionLimit),
          statmentFrequency: this.state.statementFrequency,
          settlementFrequency: this.state.settlementFrequency
        },
        config
      )
      .then(response => {
        if (response.data.reponse.responseCode == 700) {
          this.setState({ open: true });
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
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    let enabled;

    if (
      JSON.stringify(this.state.transactionLimit).length == 0 &&
      JSON.stringify(this.state.accountLimit).length == 0
    ) {
      enabled = true;
    } else {
      enabled = false;
    }

    return (
      <div className="col-md-12">
        <style>{css}</style>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Note"}</DialogTitle>
          <DialogContent>
            <DialogContentText>Template Updated Successfully</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <DashBoard />
        <MDBCol>
          <MDBCard
            style={{
              width: "1000px",
              height: "500px",
              marginTop: "120px",
              marginLeft: "180px"
            }}
          >
            <MDBCardBody>
              <MDBCardTitle style={{ color: "#4D4F5C", fontSize: "20px" }}>
                Merchant Template Account
              </MDBCardTitle>

              <MuiThemeProvider>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="col-md-1" style={{ marginTop: "10%" }}>
                      <img
                        style={{ width: "19px" }}
                        src={require("../assets/template_number.png")}
                      />
                    </div>
                    <div className="col-md-8">
                      <TextField
                        style={{ marginTop: "15%" }}
                        style={{ marginLeft: "10px" }}
                        type="text"
                        hintText="Default Account Number "
                        floatingLabelText="Default Account Number"
                        required={true}
                        pattern="[0-9]*"
                        autoComplete="off"
                        value={this.state.defaultNumber}
                        errorText={errorTextNumber}
                        name="defaultNumber"
                        disabled
                        onInput={e => this.validateNumber(e)}
                        onChange={(event, newValue) =>
                          this.setState({ defaultNumber: newValue })
                        }

                        // onInput={(e) => this.validateNumber(e)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="col-md-1" style={{ marginTop: "10%" }}>
                      <img
                        style={{ width: "19px" }}
                        src={require("../assets/template_name.png")}
                      />
                    </div>
                    <div className="col-md-8">
                      <TextField
                        style={{ marginTop: "15%" }}
                        style={{ marginLeft: "10px" }}
                        type="text"
                        hintText="Merchant Template Name "
                        floatingLabelText="Merchant Template Name *"
                        required={true}
                        autoComplete="off"
                        disabled
                        value="Merchant Template"
                        errorText={errorTextTemplateName}
                        // onInput = {(e)=>this.validateNumber(e)}
                        name="templateName"
                        onChange={(event, newValue) =>
                          this.setState({ templateName: newValue })
                        }

                        // onInput={(e) => this.validateNumber(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="col-md-2" style={{ marginTop: "9%" }}>
                      <span className="inr-symbol">
                        {window.sessionStorage.getItem("currencyImage")}
                      </span>
                    </div>
                    <div className="col-md-10">
                      <TextField
                        style={{ marginTop: "15%" }}
                        style={{ marginLeft: "-8%" }}
                        type="text"
                        hintText="Account Limit "
                        floatingLabelText="Account Limit *"
                        required={true}
                        autoComplete="off"
                        errorText={this.state.errorTextaccountLimit}
                        value={this.state.accountLimit}
                        name="accountLimit"
                        pattern="[0-9]*"
                        onInput={e => this.validateNumber(e)}
                        onChange={(event, newValue) =>
                          this.setState({ accountLimit: newValue })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-2" style={{ marginTop: "9%" }}>
                      {/* <img
                        style={{ width: "19px" }}
                        src={require("../assets/money.png")}
                      /> */}
                      <span className="inr-symbol">
                        {window.sessionStorage.getItem("currencyImage")}
                      </span>
                    </div>
                    <div className="col-md-8" style={{ marginLeft: "-8%" }}>
                      <TextField
                        style={{ marginTop: "15%" }}
                        style={{ marginLeft: "10px" }}
                        type="text"
                        hintText="Transaction Limit "
                        floatingLabelText="Transaction Limit *"
                        required={true}
                        autoComplete="off"
                        pattern="[0-9]*"
                        value={this.state.transactionLimit}
                        errorText={this.state.errorTextTransactionLimit}
                        onInput={e => this.validateNumber(e)}
                        name="transactionLimit"
                        onChange={(event, newValue) =>
                          this.setState({ transactionLimit: newValue })
                        }

                        // onInput={(e) => this.validateNumber(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-1" />
                  <div className="col-md-9" style={{ marginLeft: "-3%" }}>
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      type="text"
                      hintText="Statements & Settlements"
                      autoComplete="off"
                      floatingLabelText="Statements & Settlements"
                      disabled
                      value={this.state.settlementFrequency}
                      name="settlementFrequency"
                    />
                  </div>
                </div>
                {
                  <div className="col-md-12">
                    <Button
                      color="danger"
                      style={{
                        marginTop: "8%",
                        marginLeft: "41%",
                        width: "12%",
                        textAlign: "center"
                      }}
                      onClick={this.route.bind(this)}
                      disabled={enabled && transactionLimitValid}
                    >
                      Submit
                    </Button>
                  </div>
                }
              </MuiThemeProvider>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    );
  }
}

MerchantTemplate.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};
export default withMobileDialog()(MerchantTemplate);
