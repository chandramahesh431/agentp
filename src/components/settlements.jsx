import { css } from "@emotion/core";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBDataTable
} from "mdbreact";
import React, { Component } from "react";
import { FadeLoader } from "react-spinners";
import { Button } from "reactstrap";
import DashBoard from "./dashboard";
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

let item = window.sessionStorage.getItem("mobile");
let defaultNumberValid;
let accountLimitValid;
let transactionLimitValid;
let errorTextNumber;
let errorTextaccountLimit;
let errorTextTransactionLimit;
let errorTextTemplateName;
let fieldDecider = false;
var a = [3];
let merchantDetails = [];
class Settlements extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      transactionLimit: "",
      defaultNumber: "",
      templateName: "",
      accountLimit: "",
      option: false,
      merchantSettlements: "",
      checkChange: false,
      enableOtp: true,
      loading: false,
      open: false,
      otpNumber: "",
      AmmountSettled: false,
      invaliOtpError: false,
      otpSent: false
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };
  handleClose1 = () => {
    this.setState({ open: false });
    window.location.reload();
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
    this.handleClick();
  }
  handleClick() {
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    let merchantDetails1 = [];
    axios
      .post(
        dotenv.API_ROOT + "/settlements/getSettlements",
        {
          mobileNumber: window.sessionStorage.getItem("mobile")
        },
        config
      )
      .then(response => {
        this.setState({
          merchantNames:
            response.data.response[response.data.response.length - 1]
              .merchantName
        });

        if (response.data.response.responseCode == 800) {
          alert("Data not found");
        } else {
          for (let i = 0; i < response.data.response.length - 1; i++) {
            if (response.data.response[i].isSettled == true) {
              response.data.response[i].isSettled = "Yes";
            } else {
              response.data.response[i].isSettled = "No";
            }
            merchantDetails1.push(response.data.response[i]);
          }
          this.setState({ merchantSettlements: merchantDetails1 });
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
  changeState() {
    this.setState({ checkChange: true });
  }

  getotpField(key, t, a, i, state, rows, otpNumber) {
    this.setState({ rowData: rows[i] });
    this.setState({ loading: true });
    // alert(this.state.otpNumber);
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    axios
      .post(
        dotenv.API_ROOT + "/settlements/sendOTP",
        {
          mobileNumber: window.sessionStorage.getItem("mobile")
        },
        config
      )
      .then(response => {
        if (response.data.response.responseCode == 700) {
          this.setState({ loading: false });
          this.setState({ open: true });
          this.setState({ otpSent: true });
        }
      })
      .catch(error => {
        if (error.response) {
          this.setState({ error: error.response.data.error.message });
        } else {
          this.setState({ error: "Unable to reach Server" });
        }
      });

    this.fieldDecider = true;

    for (let j = 0; j < rows.length; j++) {
      rows[j]["otp"] = <input disabled />;
      rows[j]["checkbox"] = (
        <Checkbox style={{ marginTop: "-15%" }} key={i} disabled />
      );
    }
    rows[i]["otp"] = (
      <input onChange={e => this.handleChangeSinglePost(e.target.value)} />
    );
    rows[i]["submit"] = (
      <Button onClick={(e, t, e1) => this.submit(rows[i])} color="danger">
        Submit
      </Button>
    );

    this.setState({ enableOtp: false });
  }

  handleChangeSinglePost(value) {
    this.setState({ otpNumber: value });
  }

  submit(data) {
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    axios
      .post(
        dotenv.API_ROOT + "/settlements/confirmOTP",
        {
          mobileNumber: window.sessionStorage.getItem("mobile"),
          otp: this.state.otpNumber,
          date: data.date.replace(/-0+/g, "-"),
          settledAmount: data.totalSettlement
        },
        config
      )
      .then(response => {
        if (response.data.response.message == "Invalid OTP") {
          this.setState({ invaliOtpError: true });
          this.setState({ AmmountSettled: false });
          this.setState({ open: true });
        } else {
          this.setState({ invaliOtpError: false });
          this.setState({ AmmountSettled: true });
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
    const data = {
      columns: [
        {
          label: "Date",
          field: "",
          sort: "asc",
          width: 150
        },
        {
          label:
            "Total Settlement" +
            "(" +
            window.sessionStorage.getItem("currencyImage") +
            ")",
          sort: "asc",
          field: "",
          width: 270
        },
        {
          label:
            "Credits" +
            "(" +
            window.sessionStorage.getItem("currencyImage") +
            ")",
          sort: "asc",
          field: "",
          width: 200
        },
        {
          label:
            "Debits  " +
            "(" +
            window.sessionStorage.getItem("currencyImage") +
            ")",
          sort: "asc",
          field: "",
          width: 100
        },
        {
          label: "Transaction Count",
          sort: "asc",
          field: "",
          width: 150
        },
        {
          label: "OTP Verified",
          sort: "asc",
          width: 100,
          field: ""
        },

        {
          label: "Verify",
          sort: "asc",
          width: 100,
          field: ""
        },

        {
          label: "OTP",
          sort: "asc",
          width: 100,
          field: ""
        },
        {
          label: "Submit",
          sort: "asc",
          width: 100,
          field: ""
        }
      ],
      rows: this.state.merchantSettlements
    };
    for (let i = 0; i < data.rows.length; i++) {
      if (data.rows[i].isSettled == "No") {
        if (!this.fieldDecider) {
          data.rows[i]["checkbox"] = (
            <Checkbox
              style={{ marginTop: "-15%" }}
              key={i}
              defaultChecked={this.state.checkChange}
              onChange={(e, t, e1) =>
                this.getotpField(e, t, e1, i, this.state, data.rows)
              }
            />
          );
        }
        if (!this.fieldDecider) {
          data.rows[i]["otp"] = (
            <input
              onChange={(event, newValue) =>
                this.setState({ otpNumber: newValue })
              }
              disabled
            />
          );
          data.rows[i]["submit"] = (
            <Button
              disabled
              onClick={(e, t, e1) => this.submit(data.rows[i])}
              color="danger"
            >
              Submit
            </Button>
          );
        }
      } else {
        //this.changeState();
        // this.setState({ checkChange: true });
        data.rows[i]["checkbox"] = (
          <Checkbox
            style={{ marginTop: "-15%" }}
            defaultChecked={true}
            disabled={true}
            key={i}
            onChange={(e, t, e1) => this.getotpField(e, t, e1, i)}
          />
        );

        data.rows[i]["otp"] = <input disabled />;
        data.rows[i]["submit"] = (
          <Button color="danger" disabled>
            Submit
          </Button>
        );
      }
    }

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
        {(() => {
          if (this.state.AmmountSettled === true) {
            return (
              <Dialog
                fullScreen={fullScreen}
                open={this.state.open}
                onClose={this.handleClose1}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">{"Note"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>Amount Settled</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose1} color="primary" autoFocus>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            );
          }

          if (this.state.invaliOtpError === true) {
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
                  <DialogContentText>Entered OTP is invalid</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            );
          }
          if (this.state.otpSent === true) {
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
                    OTP sent to registered email ID
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
              height: "550px",
              marginTop: "120px",
              marginLeft: "180px"
            }}
          >
            <MDBCardBody>
              <MDBCardTitle style={{ color: "#4D4F5C", fontSize: "20px" }}>
                Merchant Settlement
              </MDBCardTitle>

              <MuiThemeProvider>
                <div className="container">
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
                        hintText="Merchant Mobile "
                        floatingLabelText="Merchant Mobile "
                        pattern="[0-9]*"
                        autoComplete="off"
                        value={window.sessionStorage.getItem("mobile")}
                        errorText={errorTextNumber}
                        name="merchantNumber"
                        disabled
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
                        autoComplete="off"
                        hintText="Merchant Name "
                        floatingLabelText="Merchant Name"
                        value={this.state.merchantNames}
                        disabled
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

                {/* <div className = 'col-md-12'>
                                <Button color="danger" onClick={this.handleClick} style={{marginTop:'8%',marginLeft:'41%',width: '12%',textAlign:'center'}} onClick = {this.route}  >Submit</Button>
                                </div>
                            */}
              </MuiThemeProvider>
              <div style={{ marginTop: "2%" }}>
                <span
                  style={{
                    color: "red",
                    fontSize: "12px",
                    fontWeight: "bold",
                    fontFamily: "Arial",
                    marginTop: "500px"
                  }}
                >
                  *Click "Verify" to initiate Settlement for the specific date
                </span>
              </div>

              <MDBDataTable
                style={{ fontSize: "100px" }}
                striped
                bordered
                sortable={false}
                small
                data={data}
                entriesOptions={a}
                entries="3"
              />

              <div
                className="sweet-loading"
                style={{ marginLeft: "-5%", marginTop: "-8%" }}
              >
                <FadeLoader
                  css={override}
                  sizeUnit={"px"}
                  size={150}
                  color={"#123abc"}
                  loading={this.state.loading}
                />
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    );
  }
}

export default Settlements;
