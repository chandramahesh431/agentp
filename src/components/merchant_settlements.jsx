import Checkbox from "@material-ui/core/Checkbox";
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
import DashBoard from "./dashboard";
const config = {
  headers: { Pragma: "no-cache" }
};
class MerchantSettlement extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      transactionLimit: "",
      defaultNumber: "",
      templateName: "",
      accountLimit: "",
      option: false
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
          errorTextNumber = "Must be numeric";
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
          errorTextaccountLimit = "Must be numeric";
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
          errorTextTransactionLimit = "Must be numeric";
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

  getotpField(key, t) {
    if (key) {
      if (this.state.option === false) {
        this.setState({ option: true });
      } else {
        this.setState({ option: false });
      }
    }
  }

  render() {
    const data = {
      columns: [
        {
          label: "Date",
          field: "",
          sort: "asc",
          width: 150
        },
        {
          label: "Total Settlement",
          sort: "asc",
          field: "",
          width: 270
        },
        {
          label: "Credits",
          sort: "asc",
          field: "",
          width: 200
        },
        {
          label: "Debits",
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
          label: "Status",
          sort: "asc",
          width: 100,
          field: ""
        },

        {
          label: "OTP",
          sort: "asc",
          width: 100,
          field: ""
        }
      ],
      rows: [
        {
          name: "Tiger Nixon",
          position: "System Architect",
          office: "Edinburgh",
          age: "61",
          date: "2011/04/25"
        },
        {
          name: "Tiger Nixon",
          position: "System Architect",
          office: "Edinburgh",
          age: "61",
          date: "2011/04/25"
        }
      ]
    };
    for (let i = 0; i < data.rows.length; i++) {
      data.rows[i]["checkbox"] = (
        <Checkbox
          style={{ marginTop: "-15%" }}
          key={i}
          onChange={(e, t, e1) => this.getotpField(e, t, e1)}
        />
      );

      data.rows[i]["otp"] = <input />;

      data.rows[i]["otp"] = <input disabled />;
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
                        hintText="Merchant Name "
                        autoComplete="off"
                        floatingLabelText="Merchant Name"
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

              <MDBDataTable
                style={{ fontSize: "100px" }}
                striped
                bordered
                sortable={false}
                small
                data={data}
                entries="5"
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    );
  }
}

export default MerchantSettlement;
