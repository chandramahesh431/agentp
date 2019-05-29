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

let merchantDetails = [];

class StatementsSettlements extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      number: "",
      merchantDetails1: "",
      selectedOption: "option1",
      errorTextNumber: "",
      open: false,
      validate: false,
      statementError: false,
      settlementError: false,
      lengthValid: false
    };
  }

  componentDidMount() {
    // this.handleClick()
  }

  handleClose = () => {
    this.setState({ open: false });
  };
  handleClick(number) {
    merchantDetails = [];
    var path;
    window.sessionStorage.setItem("mobile", number);
    if (this.state.selectedOption === "option1") {
      require("es6-promise").polyfill();
      var axios = require("axios");
      axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
      axios
        .get(
          dotenv.API_ROOT +
            "/Transactions/getStatementsForMerchant?mobileNumber=" +
            number,
          config
        )
        .then(response => {
          if (response.status == 200) {
            if (response.data.response.responseCode == 800) {
              this.setState({ open: true });
              this.setState({ settlementError: false });
              this.setState({ statementError: true });
            } else {
              this.setState({ statementError: false });
              this.setState({ open: false });
              path = "/statements";
              browserHistory.push({
                pathname: path
              });
            }
          }
        })
        .catch(error => {
          if (error.response) {
            this.setState({ error: error.response.data.error.message });
          } else {
            this.setState({ error: "Unable to reach Server" });
          }
        });
    } else if (this.state.selectedOption === "option2") {
      require("es6-promise").polyfill();
      var axios = require("axios");
      axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
      axios
        .post(
          dotenv.API_ROOT + "/settlements/getSettlements",
          {
            mobileNumber: number
          },
          config
        )
        .then(response => {
          if (response.data.response.responseCode == 800) {
            this.setState({ open: true });
            this.setState({ settlementError: true });
            this.setState({ statementError: false });
          } else {
            this.setState({ settlementError: false });
            this.setState({ open: false });
            path = "/settlements";
            browserHistory.push({
              pathname: path
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

      // this.setState({ statements: statementList });
      // this.setState({ settlements: settlementList });
    }
  }

  checkMobile() {}

  validateNumber(event) {
    if (event.target.validity.valid) {
      this.setState({ errorTextNumber: "" });
      this.setState({ validate: false });
      this.setState({ lengthValid: true });
    } else {
      this.setState({ errorTextNumber: "Must be Numeric" });
      this.setState({ validate: true });
    }
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  requiredValidation(state) {
    if (state.target.value == "" && state.target.value.length == 0) {
      this.setState({ errorTextNumber: "This field is required" });
    } else if (state.target.value.length > 0) {
      if (this.state.validate == true) {
        this.setState({ errorTextNumber: "Must be Numeric" });
      }
    } else {
      this.setState({ errorTextNumber: "" });
    }
  }

  render() {
    const { fullScreen } = this.props;
    const enabled = this.state.number.length > 0;

    // const data = {
    //   columns: [
    //     {
    //       label: "Debit Account",
    //       field: "debitAccount",
    //       sort: "asc",
    //       width: 150
    //     },
    //     {
    //       label: "Credit Account",
    //       field: "creditAccount",
    //       sort: "asc",
    //       width: 270
    //     },
    //     {
    //       label: "Amount",
    //       field: "amount",
    //       sort: "asc",
    //       width: 200
    //     },
    //     {
    //       label: "Transaction Date and Time",
    //       field: "transactionDateAndTime",
    //       sort: "asc",
    //       width: 100
    //     },
    //     {
    //       label: "Status",
    //       field: "status",
    //       sort: "asc",
    //       width: 150
    //     },
    //     {
    //       label: "ID",
    //       field: "status",
    //       sort: "asc",
    //       width: 150
    //     }
    //   ],
    //   rows: this.state.merchantDetails1
    // };

    return (
      <div className="col-md-12">
        {(() => {
          if (this.state.settlementError === true) {
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
                  <DialogContentText>Settlements not found</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            );
          }

          if (this.state.statementError === true) {
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
                  <DialogContentText>Statements not found</DialogContentText>
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
                Statements and Settlements
              </MDBCardTitle>
              <MuiThemeProvider>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="col-md-1" style={{ marginTop: "10%" }}>
                      <img
                        style={{ width: "19px" }}
                        src={require("../assets/mobile_number.jpg")}
                      />
                    </div>
                    <div className="col-md-5">
                      <TextField
                        style={{ marginTop: "15%" }}
                        style={{ marginLeft: "10px" }}
                        hintText="Merchant Account Number"
                        type="text"
                        autoComplete="off"
                        floatingLabelText="Merchant Account Number *"
                        required={true}
                        autoComplete="off"
                        name="number"
                        pattern="[0-9]*"
                        maxlength="10"
                        onInput={e => this.validateNumber(e)}
                        onBlur={event => this.requiredValidation(event)}
                        errorText={this.state.errorTextNumber}
                        onChange={(event, newValue) =>
                          this.setState({ number: newValue })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3" style={{ marginTop: "3%" }}>
                    <label
                      style={{
                        fontSize: "medium",
                        marginLeft: "10%",
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
                      Statements
                    </label>
                  </div>
                  <div className="col-md-3" style={{ marginTop: "3%" }}>
                    <label
                      style={{
                        fontSize: "medium",
                        marginLeft: "10%",
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
                      Settlements
                    </label>
                  </div>
                </div>
              </MuiThemeProvider>
              <div className="col-md-12">
                <Button
                  color="danger"
                  onClick={() => this.handleClick(this.state.number)}
                  style={{ marginTop: "8%", width: "12%", marginLeft: "43%" }}
                  disabled={!enabled || this.state.validate}
                >
                  Submit
                </Button>
              </div>

              {/* <MDBDataTable style={{ fontSize: '100px' }}
                                striped
                                bordered
                                small
                                data={data}
                                entries = '5'
                                
                                
                            /> */}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    );
  }
}

StatementsSettlements.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};
export default withMobileDialog()(StatementsSettlements);
