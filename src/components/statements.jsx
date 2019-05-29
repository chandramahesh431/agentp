import axios from "axios";
import { subDays } from "date-fns";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "reactstrap";
import Dashboard from "./dashboard";
import Cookies from "js-cookie";
const dotenv = require("../../src/env");
const config = {
  headers: { Pragma: "no-cache" }
};

const css = `

TextField{
  cursor: default !important;
}

.label-heading{
  color: rgb(0,188,212) !important;
}

.date-selection-field{
  margin-top:3%;
  color: #3D3636 !important;
  font-size:13px;
  font-weight:bold;
}

.sum-style{
  font-size:20px;
  font-weight:bold;
}
.sum-text{
color:#43425D;
}
.total-text{
  color:#54A4F3;
}
`;

let merchantDetails = [];
var totalSum = 0;
let disabled = false;
class Statements extends Component {
  state = { value: 0, startDate: new Date() };
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: window.sessionStorage.getItem("mobile"),
      merchantDetails1: "",
      merchantName: "",
      date: "",
      startDate: "",
      searchedData: "",
      sum: "",
      allData: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    window.sessionStorage.getItem("currency");

    if(window.sessionStorage.getItem("currency") == "AUD")
    {
      window.sessionStorage.setItem("currencyImage","A$")
    }
    else if(window.sessionStorage.getItem("currency") == "INR")
    {
      window.sessionStorage.setItem("currencyImage","₹")

    }
    else if(window.sessionStorage.getItem("currency") == "USD")
    {
      window.sessionStorage.setItem("currencyImage","$")

    }
    else if(window.sessionStorage.getItem("currency") == "AED")
    {
      window.sessionStorage.setItem("currencyImage","د.إ")

    }
    
    else if(window.sessionStorage.getItem("currency") == "EUR")
    {
      window.sessionStorage.setItem("currencyImage","€")

    }
    
    else if(window.sessionStorage.getItem("currency") == "GBP")
    {
      window.sessionStorage.setItem("currencyImage","£")

    }
    
    else if(window.sessionStorage.getItem("currency") == "THB")
    {
      window.sessionStorage.setItem("currencyImage","฿")

    }
    
    else if(window.sessionStorage.getItem("currency") == "SGD")
    {
      window.sessionStorage.setItem("currencyImage","S$")

    }
    disabled = false;
    merchantDetails = [];
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    axios
      .get(
        dotenv.API_ROOT +
          "/Transactions/getStatementsForMerchant?mobileNumber=" +
          window.sessionStorage.getItem("mobile"),
        config
      )
      .then(response => {
        var data = response.data.response.statementData;
        if (response.status == 200) {
          var data = response.data.response.statementData;
          for (let i = 0; i < data.length; i++) {
            merchantDetails.push(data[i]);
          }
          this.setState({ merchantDetails1: merchantDetails });

          var searchDataList = [];
          for (var i = 0; i < merchantDetails.length; ++i) {
            var obj = merchantDetails[i];
            var searchData = {
              Payer: obj.Payer,
              Time: obj.Time,
              TransactionId: obj.TransactionId,
              Type: obj.Type,
              Status: obj.Status,
              Amount: obj.Amount
            };
            searchDataList.push(searchData);
          }
          this.setState({ searchedData: searchDataList });
          this.setState({
            merchantName: response.data.response.merchantName
          });
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
  }

  handleChange(date) {
    if (date != undefined) {
      disabled = false;
      if (date > subDays(new Date(), 7) && date < new Date()) {
        this.setState({
          startDate: date
        });
        this.setState({ allData: false });
      }
    } else {
      this.setState({ allData: true });
      this.setState({
        startDate: ""
      });
    }
  }
  handleClick() {
    var searchDataList = [];
    totalSum = 0;
    if (this.state.allData == true) {
      var searchDataList = [];
      for (var i = 0; i < this.state.merchantDetails1.length; ++i) {
        var obj = this.state.merchantDetails1[i];
        var searchData = {
          Payer: obj.Payer,
          Time: obj.Time,
          TransactionId: obj.TransactionId,
          Type: obj.Type,
          Status: obj.Status,
          Amount: obj.Amount
        };
        searchDataList.push(searchData);
      }
      this.setState({ searchedData: searchDataList });
      this.setState({ sum: 0 });
    } else {
      for (var i = 0; i < this.state.merchantDetails1.length; ++i) {
        var date = this.state.merchantDetails1[i].date;
        var sel = this.state.startDate.toString();
        var obj = this.state.merchantDetails1[i];
        if (sel.substring(4, 15) == date.substring(4)) {
          totalSum += obj.Amount;
          var searchData = {
            Payer: obj.Payer,
            Time: obj.Time,
            TransactionId: obj.TransactionId,
            Type: obj.Type,
            Status: obj.Status,
            Amount: obj.Amount
          };
          searchDataList.push(searchData);
          // alert("hitting");
        }
      }

      this.setState({ searchedData: searchDataList });
      this.setState({ sum: totalSum });
    }
  }

  render() {
    var columns = [
      {
        label: "Payer",
        field: "payerName",
        sort: "asc",
        width: 150
      },
      {
        label: "Time",
        sort: "asc",
        width: 270
      },
      {
        label: "Transaction ID",
        sort: "asc",
        width: 200
      },
      {
        label: "Type",
        sort: "asc",
        width: 100
      },
      {
        label: "Status",
        sort: "asc",
        width: 100
      },
      {
        label: "Amount"+ "(" + window.sessionStorage.getItem("currencyImage")+ ")",
        sort: "asc",
        width: 100
      }
    ];
    const { classes, theme } = this.props;
    const a = [0];
    return (
      <div className="col-md-12" x-ms-format-detection="none">
        <style>{css}</style>
        <Dashboard />
        <MDBCol>
          <MDBCard
            style={{
              width: "1000px",
              height: "549px",
              marginTop: "120px",
              marginLeft: "180px"
            }}
          >
            <MDBCardBody>
              <MDBCardTitle style={{ color: "#4D4F5C", fontSize: "20px" }}>
                Merchant Statement
              </MDBCardTitle>
              <MuiThemeProvider>
                <div className="container">
                  <div className="col-md-4">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{
                        marginLeft: "10px"
                      }}
                      hintText="Enter Number"
                      floatingLabelText="Merchant Number"
                      required={true}
                      name="number"
                      autoComplete="off"
                      readonly
                      disabled
                      value={this.state.mobileNumber}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Enter Number"
                      floatingLabelText="Merchant Name"
                      required={true}
                      autoComplete="off"
                      name="number"
                      readonly
                      disabled
                      value={this.state.merchantName}
                    />
                  </div>
                  <div className="col-md-4">
                    <p className="date-selection-field">
                      Please select Date for search:
                    </p>
                    <DatePicker
                      selected={this.state.startDate}
                      // onChange={this.handleChange}
                      placeholderText="Select Date"
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="MMM dd yyyy"
                      timeCaption="time"
                      onkeydown="return false;"
                      maxDate={new Date()}
                      minDate={subDays(new Date(), 6)}
                      onChange={event => this.handleChange(event)}
                    />
                    <Button
                      color="danger"
                      disabled={disabled}
                      onClick={this.handleClick.bind(this)}
                    >
                      Search
                    </Button>
                    {/* <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      hintText="Enter Number"
                      className="label-heading"
                      floatingLabelText="Merchant Name"
                      required={true}
                      name="number"
                    /> */}
                  </div>
                </div>
              </MuiThemeProvider>
              <MDBDataTable
                style={{ fontSize: "100px" }}
                striped
                bordered
                small
                sortable={false}
                data={{ columns, rows: this.state.searchedData }}
                entries="5"
                entriesLabel
                entriesOptions={a}
              />
              {(() => {
                if (this.state.sum != 0) {
                  return (
                    <div className="text-right sum-style">
                      <span className="sum-text">Total Sum : </span>
                      <span className="total-text">{window.sessionStorage.getItem("currencyImage")}  {this.state.sum}</span>
                    </div>
                  );
                }
              })()}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    );
  }
}

export default Statements;
