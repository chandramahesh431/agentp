import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from "mdbreact";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { browserHistory } from "react-router";
import { Button } from "reactstrap";
import DashBoard from "./dashboard";
import Cookies from "js-cookie";
const dotenv = require("../../src/env");
const config = {
  headers: { Pragma: "no-cache" }
};

let valid;
let accountNumberValid;
let errorTextAccountNumber;

let enabled;

class Template extends Component {
  constructor(props) {
    super(props);

    this.route = this.route.bind(this);

    this.state = {
      number: "",
      accountLimit: "",
      transactionLimit: "",
      templateNumber: "",
      merchantTemplate: false,
      payerTemplate: false,
      statementFrequency: "",
      settlementFrequency: "",
      errorTextNumber: "",
      selectedOption: "option1",
      checkNumber: false,
      open: false
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    // this.handleClick()
  }
  handleClick() {}

  checkMobile() {}

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  validateNumber(event) {
    errorTextAccountNumber = "";

    switch (event.target.name) {
      case "accountNumber": {
        if (event.target.validity.valid) {
          accountNumberValid = true;
          errorTextAccountNumber = "";
        } else if (event.target.value.length == 0) {
          errorTextAccountNumber = "This field is required";
        } else {
          accountNumberValid = false;
          errorTextAccountNumber = "Must be Numeric";
        }
        break;
      }

      default:
        break;
    }
  }

  route(number) {
    if (this.state.selectedOption === "option2") {
      require("es6-promise").polyfill();
      var axios = require("axios");
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + Cookies.get("x-auth-token");
      axios
        .get(
          dotenv.API_ROOT +
            "/configs/merchantTemplate?templateNumber=" +
            this.state.number,
          config
        )
        .then(response => {
          if (response.data.response.responseCode == 700) {
            window.sessionStorage.setItem(
              "templateNumber",
              response.data.response.message[0].templateNumber
            );
            const path = "/merchantTemplate";
            browserHistory.push({
              pathname: path
            });
          } else if (response.data.response.message === "Template Not Found") {
            this.setState({ open: true });
            this.setState({ merchantTemplate: true });
            this.setState({ payerTemplate: false });
          }
        })
        .catch(error => {
          if (error.response) {
            this.setState({ error: error.response.data.error.message });
          } else {
            this.setState({ error: "Unable to reach Server" });
          }
        });
    } else if (this.state.selectedOption === "option1") {
      require("es6-promise").polyfill();
      var axios = require("axios");
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + Cookies.get("x-auth-token");
      axios
        .get(
          dotenv.API_ROOT +
            "/configs/payerTemplate?templateNumber=" +
            this.state.number,
          config
        )
        .then(response => {
          if (response.data.response.responseCode == 700) {
            window.sessionStorage.setItem(
              "accountLimit",
              response.data.response.message[0].accountLimit
            );
            window.sessionStorage.setItem(
              "transactionLimit",
              response.data.response.message[0].transactionLimit
            );
            window.sessionStorage.setItem(
              "templateNumber",
              response.data.response.message[0].templateNumber
            );
            const path = "/payerTemplate";
            browserHistory.push({
              pathname: path,
              state: {
                accountLimit: response.data.response.message[0].accountLimit,
                transactionLimit:
                  response.data.response.message[0].transactionLimit,
                templateNumber: response.data.response.message[0].templateNumber
              }
            });
          } else if (response.data.response.message === "Template Not Found") {
            this.setState({ open: true });
            this.setState({ merchantTemplate: false });
            this.setState({ payerTemplate: true });
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

  render() {
    const { fullScreen } = this.props;

    enabled = this.state.number.length > 0;

    return (
      <div className="col-md-12">
        {(() => {
          if (this.state.payerTemplate === true) {
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
                    Payer Template not found
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

          if (this.state.merchantTemplate === true) {
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
                    Merchant Template not found
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
                Template Accounts
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
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      type="text"
                      hintText="Template Account Number"
                      floatingLabelText="Template Account Number *"
                      required={true}
                      pattern="[0-9]*"
                      autoComplete="off"
                      errorText={errorTextAccountNumber}
                      onInput={e => this.validateNumber(e)}
                      name="accountNumber"
                      pattern="[0-9]*"
                      // errorText={this.state.errorTextNumber}
                      onChange={(event, newValue) =>
                        this.setState({ number: newValue })
                      }
                    />
                  </div>

                  <div className="col-md-3">
                    <label
                      style={{
                        fontSize: "medium",
                        marginLeft: "2%",
                        marginTop: "15%",
                        color: "#43425D"
                      }}
                    >
                      <Radio
                        checked={this.state.selectedOption === "option1"}
                        onChange={this.handleOptionChange}
                        value="option1"
                        color="default"
                        name="radio-button-demo"
                        aria-label="D"
                      />
                      Payer
                    </label>
                  </div>

                  <div className="col-md-3">
                    <label
                      style={{
                        fontSize: "medium",
                        marginLeft: "2%",
                        marginTop: "15%",
                        color: "#43425D"
                      }}
                    >
                      <Radio
                        checked={this.state.selectedOption === "option2"}
                        onChange={this.handleOptionChange}
                        value="option2"
                        color="default"
                        name="radio-button-demo"
                        aria-label="D"
                      />
                      Merchant
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <Button
                    color="danger"
                    style={{
                      marginTop: "8%",
                      marginLeft: "45%",
                      width: "12%",
                      textAlign: "center"
                    }}
                    onClick={() => this.route(this.state.number)}
                    disabled={!enabled || !accountNumberValid}
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

Template.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};
export default withMobileDialog()(Template);
