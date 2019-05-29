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
const dotenv = require("../../src/env");
import Cookies from "js-cookie";
const config = {
  headers: { Pragma: "no-cache" }
};
const css = `label {
  color: #3D3636 !important;
}
hr{
  border-bottom: 2px solid #B7BDBA !important;
}

TextField{
  cursor: default !important;
}

.label-heading{
  color: rgb(0,188,212) !important;
}


`;

let defaultNumberValid;
let accountLimitValid;
let transactionLimitValid;
let errorTextNumber;
let errorTextaccountLimit;
let errorTextTransactionLimit;
let errorTextTemplateName;

class PayerTemplate extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.route = this.route.bind(this);

    this.state = {
      transactionLimit: window.sessionStorage.getItem("transactionLimit"),
      defaultNumber: window.sessionStorage.getItem("templateNumber"),
      accountLimit: window.sessionStorage.getItem("accountLimit"),
      templateName: "Payer Template",
      open: false
    };
  }

  componentDidMount() {}
  handleClick() {
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    if (this.state.selectedOption === "option1") {
      axios
        .post(
          dotenv.API_ROOT + "/Transactions/getStatements",
          {
            mobileNumber: this.state.number
          },
          config
        )
        .then(response => {})
        .catch(error => {
          if (error.response) {
            this.setState({ error: error.response.data.error.message });
          } else {
            this.setState({ error: "Unable to reach Server" });
          }
        });
    }
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
        if (event.target.validity.valid) {
          accountLimitValid = true;
          errorTextaccountLimit = "";
        } else if (event.target.value.length == 0) {
          errorTextaccountLimit = "This field is required";
        } else {
          accountLimitValid = false;
          errorTextaccountLimit = "Must be Numeric";
        }
        break;
      }

      case "transactionLimit": {
        if (event.target.validity.valid) {
          transactionLimitValid = true;
          errorTextTransactionLimit = "";
        } else if (event.target.value.length == 0) {
          errorTextTransactionLimit = "This field is required";
        } else {
          transactionLimitValid = false;
          errorTextTransactionLimit = "Must be Numeric";
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
          accountLimit: this.state.accountLimit,
          transactionLimit: this.state.transactionLimit
        },
        config
      )
      .then(response => {
        if (response.responseCode == 700) {
          this.state.open = true;
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

    let enabled;

    if (
      this.state.transactionLimit.length > 0 &&
      this.state.accountLimit.length > 0 &&
      this.state.defaultNumber.length > 0 &&
      this.state.templateName.length > 0
    ) {
      enabled = true;
    } else {
      enabled = false;
    }

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
                  <style>{css}</style>
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
                        floatingLabelText="Default Account Number *"
                        required={true}
                        pattern="[0-9]*"
                        autoComplete="off"
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
                        value={this.state.templateName}
                        errorText={errorTextTemplateName}
                        onInput={e => this.validateNumber(e)}
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
                    <div className="col-md-1" style={{ marginTop: "10%" }}>
                      <img
                        style={{ width: "19px" }}
                        src={require("../assets/money.png")}
                      />
                    </div>
                    <div className="col-md-8">
                      <TextField
                        style={{ marginTop: "15%" }}
                        style={{ marginLeft: "10px" }}
                        type="text"
                        hintText="Account Limit "
                        floatingLabelText="Account Limit *"
                        required={true}
                        autoComplete="off"
                        errorText={errorTextaccountLimit}
                        name="accountLimit"
                        value={this.state.accountLimit}
                        pattern="[0-9]*"
                        onInput={e => this.validateNumber(e)}
                        onChange={(event, newValue) =>
                          this.setState({ accountLimit: newValue })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-1" style={{ marginTop: "10%" }}>
                      <img
                        style={{ width: "19px" }}
                        src={require("../assets/money.png")}
                      />
                    </div>
                    <div className="col-md-8">
                      <TextField
                        style={{ marginTop: "15%" }}
                        style={{ marginLeft: "10px" }}
                        type="text"
                        hintText="Transaction Limit "
                        floatingLabelText="Transaction Limit *"
                        required={true}
                        pattern="[0-9]*"
                        autoComplete="off"
                        value={this.state.transactionLimit}
                        errorText={errorTextTransactionLimit}
                        onInput={e => this.validateNumber(e)}
                        name="transactionLimit"
                        onChange={(event, newValue) =>
                          this.setState({ transactionLimit: newValue })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <Button
                    color="danger"
                    onClick={this.handleClick}
                    style={{
                      marginTop: "8%",
                      marginLeft: "41%",
                      width: "12%",
                      textAlign: "center"
                    }}
                    onClick={this.route}
                    disabled={!enabled}
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
