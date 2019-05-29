import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
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
import PropTypes from "prop-types";
import React, { Component } from "react";
import SwipeableViews from "react-swipeable-views";
import Dashboard from "./dashboard";
import Cookies from "js-cookie";

const dotenv = require("../../src/env");
let messageforTable = "";
const config = {
  headers: { Pragma: "no-cache" }
};

const css = `
input {
  color: #B7BDBA;
  caret-color: transparent !important;
}


span.amount{
  font-size: 50px;
  font-weight : bold;
  font-style : Roboto;
}
p.field-name{
  font-size: 20px;
  color : #A2A2AE;
}

.inr-symbol{
  color:#A0AAA0;
  font-size: 50px;
}

.right-border{
  border-right:1px solid rgba(112,112,112,0.5);
}

.balance-color{
  color:#FF533D;
}

.account-limit-color{
  color: #54A4F3
}

.transaction-limit-color{
  color:#43425D
}
.top-margin{
  margin-top:2%;
}
`;

function TabContainer({ children, dir }) {
  return (
    <Typography
      component="div"
      dir={dir}
      style={{
        width: "100%",
        marginTop: "5%",
        overflow: "hidden"
      }}
    >
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});

class MerchantAccountEnquiry extends Component {
  // state = { value: 0 };
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: window.sessionStorage.getItem("mobile"),
      payerName: "",
      balance: "",
      accountLimit: "",
      transactionLimit: "",
      statements: "",
      settlements: "",
      value: 0,
      paginationforStatements: [],
      paginationforSettlements: []
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

    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    axios
      .get(
        dotenv.API_ROOT +
          "/accounts/77" +
          window.sessionStorage.getItem("mobile"),
        config
      )
      .then(async response => {
        if (response.status == 200) {
          this.setState({ payerName: response.data.name });
          this.setState({ balance: response.data.balance });
          this.setState({ accountLimit: response.data.Account.accountLimit });
          this.setState({
            transactionLimit: response.data.Account.transactionLimit
          });

          var statementList = [];
          await axios
            .get(
              dotenv.API_ROOT +
                "/Transactions/getStatementsForMerchant?mobileNumber=" +
                window.sessionStorage.getItem("mobile"),
              config
            )
            .then(async response => {
              if (response.status == 200) {
                var data = response.data.response.statementData;
                for (var i = 0; i < data.length; ++i) {
                  var obj = data[i];
                  var newDate = this.getCustomDate(obj.date);
                  var statement = {
                    Payer: obj.Payer,
                    Amount: obj.Amount,
                    date: newDate,
                    Time: obj.Time
                  };
                  await statementList.push(statement);
                }
              } else {
                alert("Somthing went wrong!!");
              }
            })
            .catch(error => {
              if (error.response) {
                this.setState({ error: error.response.data.error.message });
              } else {
                this.setState({ error: "Unable to reach Server" });
              }
            });

          var settlementList = [];
          await axios
            .post(
              dotenv.API_ROOT + "/settlements/getSettlements",
              {
                mobileNumber: window.sessionStorage.getItem("mobile")
              },
              config
            )
            .then(async response => {
              if (response.status == 200) {
                var data = response.data.response;
                for (var i = 0; i < data.length - 1; ++i) {
                  var obj = data[i];
                  var status;
                  if (obj.isSettled) {
                    status = "Settled";
                  } else if (!obj.isSettled) {
                    status = "Open";
                  }
                  var settlement = {
                    date: obj.date,
                    Amount: obj.totalSettlement,
                    Status: status
                  };
                  await settlementList.push(settlement);
                }
              } else {
                alert("Somthing went wrong!!");
              }
            })
            .catch(error => {
              if (error.response) {
                this.setState({ error: error.response.data.error.message });
              } else {
                this.setState({ error: "Unable to reach Server" });
              }
            });

          if (statementList.length == 0) {
            messageforTable = "No records found";
            this.setState({ paginationforStatements: [] });
          } else {
            messageforTable = "";
            this.setState({ paginationforStatements: ["Previous", "Next"] });
          }
          if (settlementList.length == 0) {
            this.setState({ paginationforSettlements: [] });
          } else {
            this.setState({ paginationforSettlements: ["Previous", "Next"] });
          }

          this.setState({ statements: statementList });
          this.setState({ settlements: settlementList });
        }
      })
      .catch(error => {
        if (error.response) {
          alert("Account Not Found or Something Went Wrong");
          this.setState({ error: error.response.data.error.message });
        } else {
          this.setState({ error: "Unable to reach Server" });
        }
      });
  }
  getCustomDate(date) {
    var rawDate = new Date(date);
    var year = rawDate.getFullYear();
    var month = "" + (rawDate.getMonth() + 1);
    var day = "" + rawDate.getDate();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    var columns1 = [
      {
        label: "Payer",
        field: "Payer",
        sort: "asc"
      },
      {
        label:
          "Amount" + "(" + window.sessionStorage.getItem("currencyImage") + ")",
        field: "Amount",
        sort: "asc"
      },
      {
        label: "Date",
        field: "date",
        sort: "asc"
      },
      {
        label: "Time",
        field: "Time",
        sort: "asc"
      }
    ];

    var columns2 = [
      {
        label: "Date",
        field: "date",
        sort: "asc"
      },
      {
        label:
          "Amount" + "(" + window.sessionStorage.getItem("currencyImage") + ")",
        field: "amount",
        sort: "asc"
      },
      {
        label: "Status",
        field: "status",
        sort: "asc"
      }
    ];

    const a = [3];
    const { classes, theme } = this.props;
    return (
      <div className="col-md-12" x-ms-format-detection="none">
        <style>{css}</style>
        <Dashboard />
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
                Merchant Enquiry
              </MDBCardTitle>
              <MuiThemeProvider>
                <div className="container">
                  <div className="col-md-4 text-center right-border">
                    <span className="inr-symbol">
                      {window.sessionStorage.getItem("currencyImage")}
                    </span>
                    <span className="amount balance-color">
                      {this.state.balance}
                    </span>
                    <p className="field-name">Balance</p>
                  </div>
                  <div className="col-md-4 text-center right-border">
                    <span className="inr-symbol">
                      {window.sessionStorage.getItem("currencyImage")}
                    </span>
                    <span className="amount account-limit-color">
                      {this.state.accountLimit}
                    </span>
                    <p className="field-name">Account Limit</p>
                  </div>
                  <div className="col-md-4 text-center">
                    <span className="inr-symbol">
                      {window.sessionStorage.getItem("currencyImage")}
                    </span>
                    <span className="amount transaction-limit-color">
                      {this.state.transactionLimit}
                    </span>
                    <p className="field-name">Transaction Limit</p>
                  </div>
                </div>
              </MuiThemeProvider>
              <MuiThemeProvider>
                <div className="container top-margin">
                  <div className="col-md-4">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Enter Number"
                      floatingLabelText="Merchant Number"
                      required={true}
                      name="number"
                      autoComplete="off"
                      readonly
                      disabled
                      value={this.state.mobileNumber}
                    />
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Enter Number"
                      floatingLabelText="Merchant Name"
                      required={true}
                      name="number"
                      autoComplete="off"
                      readonly
                      disabled
                      value={this.state.payerName}
                    />
                  </div>
                  <div className={(classes.root, "col-md-8")}>
                    <AppBar position="static" color="default">
                      <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                      >
                        <Tab label="Transaction History" />
                        <Tab label="Settlement Data" />
                      </Tabs>
                    </AppBar>
                    <SwipeableViews
                      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                      index={this.state.value}
                      onChangeIndex={this.handleChangeIndex}
                    >
                      <TabContainer dir={theme.direction}>
                        <MDBDataTable
                          striped
                          bordered
                          sortable={false}
                          hover
                          data={{
                            columns: columns1,
                            rows: this.state.statements
                          }}
                          entries="3"
                          paginationLabel={this.state.paginationforStatements}
                          entriesOptions={a}
                        />
                      </TabContainer>
                      <TabContainer dir={theme.direction}>
                        <MDBDataTable
                          striped
                          bordered
                          sortable={false}
                          hover
                          data={{
                            columns: columns2,
                            rows: this.state.settlements
                          }}
                          entries="3"
                          paginationLabel={this.state.paginationforSettlements}
                          entriesOptions={a}
                        />
                      </TabContainer>
                    </SwipeableViews>
                  </div>
                </div>
              </MuiThemeProvider>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    );
  }
}

MerchantAccountEnquiry.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MerchantAccountEnquiry);
