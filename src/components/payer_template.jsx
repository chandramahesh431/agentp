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

let defaultNumberValid;
let accountLimitValid;
let transactionLimitValid;
let PromotionalBonusValid;

let errorTextNumber;
let errorTextaccountLimit;
let errorTextTransactionLimit;
let errorTextPromotionalBonus;
let errorTextTemplateName;

const css = `
.inr-symbol{
  font-size: 20px;
  color:#000;
}
`;

class PayerTemplate extends Component {
  constructor(props) {
    super(props);

    this.handleClick1 = this.handleClick1.bind(this);
    this.route = this.route.bind(this);

    this.state = {
      transactionLimit: 0,
      defaultNumber: window.sessionStorage.getItem("templateNumber"),
      accountLimit: 0,
      templateName: "Payer Template",
      open: false,
      promotionalBonus: 0,
      errorTextaccountLimit: "",
      errorTextTransactionLimit: "",
      errorTextPromotionalBonus: ""
    };
  }

  handleClose = () => {
    this.setState({ open: false });
    window.location.reload();
    //    const path = '/restPassword';
    //    browserHistory.push(path)
  };

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
          "/configs/payerTemplate?templateNumber=" +
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
            promotionalBonus: response.data.response.payerSignupBonus
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

  checkMobile() {}

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

      case "promotionalBonus": {
        if (event.target.validity.valid) {
          PromotionalBonusValid = true;
          this.setState({ errorTextPromotionalBonus: "" });
        } else if (event.target.value.length == 0) {
          this.setState({
            errorTextPromotionalBonus: "This field is required"
          });
        } else {
          PromotionalBonusValid = false;
          this.setState({ errorTextPromotionalBonus: "Must be Numeric" });
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
        dotenv.API_ROOT + "/configs/updatePayerTemplate",
        {
          templateNumber: this.state.defaultNumber,
          accountLimit: parseInt(this.state.accountLimit),
          transactionLimit: parseInt(this.state.transactionLimit),
          payerSignupBonus: parseInt(this.state.promotionalBonus)
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

  render() {
    const { fullScreen } = this.props;

    let enabled = false;

    if (
      this.state.transactionLimit > 0 &&
      this.state.accountLimit > 0 &&
      this.state.promotionalBonus > 0 &&
      this.state.defaultNumber.length > 0 &&
      this.state.templateName.length > 0 &&
      this.state.errorTextaccountLimit == "" &&
      this.state.errorTextTransactionLimit == ""
    ) {
      enabled = false;
    } else {
      enabled = true;
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
                Payer Template Account
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
                        autoComplete="off"
                        pattern="[0-9]*"
                        disabled
                        errorText={errorTextNumber}
                        name="defaultNumber"
                        value={this.state.defaultNumber}
                        onInput={e => this.validateNumber(e)}
                        onChange={(event, newValue) =>
                          this.setState({ defaultNumber: newValue })
                        }
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
                        hintText="Payer Template Name "
                        floatingLabelText="Payer Template Name *"
                        required={true}
                        autoComplete="off"
                        disabled
                        value={this.state.templateName}
                        errorText={errorTextTemplateName}
                        onInput={e => this.validateNumber(e)}
                        value="Payer Template"
                        name="templateName"
                        onChange={(event, newValue) =>
                          this.setState({ templateName: newValue })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
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
                    <div className="col-md-8">
                      <TextField
                        style={{ marginTop: "15%" }}
                        style={{ marginLeft: "-9%" }}
                        type="text"
                        hintText="Account Limit "
                        floatingLabelText="Account Limit *"
                        required={true}
                        autoComplete="off"
                        errorText={this.state.errorTextaccountLimit}
                        name="accountLimit"
                        value={this.state.accountLimit}
                        pattern="[0-9]*"
                        onInput={e => this.validateNumber(e)}
                        //  onBlur={event => this.requiredValidation(event)}
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
                        //onBlur={event => this.requiredValidation(event)}
                        name="transactionLimit"
                        onChange={(event, newValue) =>
                          this.setState({ transactionLimit: newValue })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    {" "}
                    <div className="col-md-2" style={{ marginTop: "9%" }}>
                      {/* <img
                        style={{ width: "19px" }}
                        src={require("../assets/money.png")}
                      /> */}
                      <span className="inr-symbol">
                        {window.sessionStorage.getItem("currencyImage")}
                      </span>
                    </div>
                    <div className="col-md-8">
                      <TextField
                        style={{ marginTop: "15%" }}
                        style={{ marginLeft: "-9%" }}
                        type="text"
                        hintText="Promotional Bonus "
                        floatingLabelText="Promotional Bonus *"
                        required={true}
                        autoComplete="off"
                        pattern="[0-9]*"
                        value={this.state.promotionalBonus}
                        errorText={this.state.errorTextPromotionalBonus}
                        onInput={e => this.validateNumber(e)}
                        name="promotionalBonus"
                        onChange={(event, newValue) =>
                          this.setState({ promotionalBonus: newValue })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <Button
                    color="danger"
                    onClick={this.route.bind(this)}
                    style={{
                      marginTop: "8%",
                      marginLeft: "41%",
                      width: "12%",
                      textAlign: "center"
                    }}
                    disabled={enabled}
                  >
                    Submit
                  </Button>
                </div>
              </MuiThemeProvider>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    );
  }
}

PayerTemplate.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};
export default withMobileDialog()(PayerTemplate);
