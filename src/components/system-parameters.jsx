import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from "mdbreact";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Dashboard from "./dashboard";
import Select from "react-select";
import { Button } from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Cookies from "js-cookie";



const dotenv = require("../../src/env");
const config = {
  headers: { Pragma: "no-cache" }
};
var month = (new Date().getUTCMonth()+ 1).toString();

  const selectStyles = {
    menu: base => ({
      ...base,
      zIndex: 100
    })
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
  color:#54A4F3;
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
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
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
var date = new Date().getDate();
let disable = false;
class SystemParameters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyCode:[],
      selectedValue:""
    };
    if(month.length == 1)
    {
        month = "0" + month;
    }
    else{
        month = month;
    }

    
  }

  handleClose = () => {
    this.setState({ open: false });
 
  };

  componentDidMount() {
      let dropdownValues = [];
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    axios
      .get(dotenv.API_ROOT + "/configs/getCurrencyType", config)
      .then(response => {
        if (response.status == 200) {

            for(let i = 0; i< response.data.response.Currencytype.length;i++)
            {
                dropdownValues.push({label:response.data.response.Currencytype[i].currencyCode,value:response.data.response.Currencytype[i].currencyCode})
            }
          this.setState({
            currencyCode:dropdownValues
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

  setValueForDropdown(value)
  {
    this.setState({ selectedValue: value.value });

  }
  submitData()
  {
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
      if(this.state.selectedValue == "")
      {
          axios
            .post(
              dotenv.API_ROOT + "/configs/ActivateCurrency",
              {
                CurrencyCode: window.sessionStorage.getItem("currency")
              },
              config
            )
            .then(response => {
              this.setState({ open: true });
              this.setState({ responseText: response.data.response.message });
              window.sessionStorage.setItem("currency", window.sessionStorage.getItem("currency"));
            })
            .catch(error => {
              if (error.response) {
              } else {
                this.setState({ error: "Unable to reach Server" });
              }
            }); 
      }
      else{
        axios
          .post(
            dotenv.API_ROOT + "/configs/ActivateCurrency",
            {
              CurrencyCode: this.state.selectedValue,
             
            },
            config
          )
          .then(response => {
            this.setState({ open: true });
            this.setState({ responseText: response.data.response.message });
            window.sessionStorage.setItem("currency", this.state.selectedValue);
          })
          .catch(error => {
            if (error.response) {
            } else {
              this.setState({ error: "Unable to reach Server" });
            }
          });
      }
    
  }

 

 
  render() {
    

    const { classes, theme, fullScreen } = this.props;

    return (
      <div className="col-md-12">
        {(() => {
          if (this.state.responseText) {
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
                    Curreny Code Updated Successfully
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
        }
        <style>{css}</style>
        <Dashboard />
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
                System Parameters
              
              </MDBCardTitle>
            
              <MuiThemeProvider >
                <div className="col-md-12" style = {{marginTop:"5%"}}>
                <div
                    className="col-md-6" style={{width:"31%",marginLeft:"1%"}}
                  >
                    <p
                      style={{
                        color: "rgba(0, 0, 0, 0.3)",
                        fontSize: "13px",
                        fontWeight:"bold"
                        
                      }}
                    >
                      Currency Code
                    </p>
                    <Select
                      options={this.state.currencyCode}
                      styles={selectStyles}
                      onChange={e => this.setValueForDropdown(e)}

                    //   options={statusValues}
                    //   onChange={e => this.dropdownValue(e)}
                    //   // value={stateValue}
                      defaultValue={{
                        label: window.sessionStorage.getItem("currency"),
                        value: window.sessionStorage.getItem("currency")
                      }}
                      floatingLabelText="Status"
                    />
                  </div>
                  <div className="col-md-6" style={{marginLeft:"18%"}}>
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      floatingLabelText="Country Code"
                      required={true}
                      autoComplete="off"
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      disabled
                      floatingLabelText="NOD of Currency"
                      required={true}
                      autoComplete="off"
                      value={"2"}
                      name="money"
                      pattern="[0-9]*"
                    
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      autoComplete="off"
                      value={new Date().getFullYear() + '-' + month  + "-" +new Date().getDate()}
                      floatingLabelText="Date"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      autoComplete="off"
                      floatingLabelText="Mobile Number Length"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      style={{ marginTop: "15%" }}
                      style={{ marginLeft: "10px" }}
                      autoComplete="off"
                      floatingLabelText=" Date Format "
                      value={"YYYY-MM-DD "}
                      disabled
                    />
                  </div>
                </div>
              </MuiThemeProvider>
            </MDBCardBody>
            <div className="col-md-6">
                    <Button
                      color="danger"
                      onClick = {this.submitData.bind(this)}
                      style={{
                        marginTop: "15%",
                        marginLeft: "75%",
                        width: "27%"
                      }}
                    >
                      Submit
                    </Button>
                  </div>
          </MDBCard>
        </MDBCol>
    
      </div>
    );
  }
}

SystemParameters.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired

};

export default withStyles(styles, { withTheme: true })(SystemParameters);
