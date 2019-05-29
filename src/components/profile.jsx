import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCol
} from "mdbreact";
import PropTypes from "prop-types";
import React from "react";
import DashBoard from "./dashboard";
import Cookies from "js-cookie";

const dotenv = require("../../src/env");
const config = {
  headers: { Pragma: "no-cache" }
};

const styles = theme => ({
  root: {
    display: "flex"
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});
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

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);

    this.editAgent = this.editAgent.bind(this);

    this.state = {
      UserId: "",

      MobileNumber: "",

      Location: "",

      EmailId: "",

      error: ""
    };
  }

  submit() {
    // alert("submitted");
  }

  componentDidMount() {
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    axios
      .get(
        dotenv.API_ROOT + "/agents/" + window.sessionStorage.getItem("userId"),
        {},
        config
      )
      .then(response => {
        if (response.status == 200) {
          this.setState({ MobileNumber: response.data.mobile });

          this.setState({ MobileNumber: response.data.mobile });

          this.setState({ UserId: response.data.username });

          this.setState({ Location: response.data.Location });

          this.setState({ EmailId: response.data.email });

          //this.setState({ error: 'Login Success' })
        }
      })
      .catch(error => {
        if (error.response) {
          this.setState({ error: error.response.data.error.message });
        } else {
          this.setState({ error: "Server Down" });
        }
      });
  }

  editAgent() {
    // alert("Profile edit");
  }

  render() {
    const { classes, theme } = this.props;

    const { EmailId, UserId, error, Location, MobileNumber } = this.state;

    return (
      <div className="col-md-12">
        <style>{css}</style>
        <main className={classes.content}>
          <DashBoard />

          <MDBCol>
            <MDBCard
              style={{
                width: "1000px",
                marginTop: "8%",
                height: "500px",
                marginLeft: "155px"
              }}
            >
              <MDBCardBody>
                <MDBCardTitle style={{ fontSize: "20px" }}>
                  Agent Profile
                  <MDBBtn
                    type="button"
                    style={{
                      marginLeft: "74%",
                      width: "12%",
                      height: "30%"
                    }}
                    disabled
                    class="btn btn-danger"
                    onClick={this.submit}
                  >
                    Edit
                  </MDBBtn>
                </MDBCardTitle>

                <MDBCardText style={{ marginTop: "4%" }}>
                  <div className="col-md-6">
                    <MuiThemeProvider>
                      <div style={{ marginLeft: "7%" }}>
                        <div>
                          <img
                            style={{ width: "5%", height: "4%" }}
                            src={require("../assets/user_id.png")}
                          />

                          <TextField
                            style={{ marginLeft: "10px" }}
                            hintText="Enter your User Id"
                            disabled
                            autoComplete="off"
                            floatingLabelText="User Id"
                            value={this.state.UserId}
                            name="userId"
                            onChange={(event, newValue) =>
                              this.setState({ UserId: newValue })
                            }
                            required={true}
                          />
                        </div>

                        <br />

                        <img
                          style={{ width: "5%", height: "4%" }}
                          src={require("../assets/mobile_number.jpg")}
                        />

                        <TextField
                          style={{ marginLeft: "10px" }}
                          hintText="Enter your Mobile Number"
                          floatingLabelText="Mobile Number"
                          disabled
                          autoComplete="off"
                          required={true}
                          value={this.state.MobileNumber}
                          name="Mobile"
                          onChange={(event, newValue) =>
                            this.setState({ MobileNumber: newValue })
                          }
                        />

                        <br />
                      </div>
                    </MuiThemeProvider>
                  </div>

                  <div className="col-md-6">
                    <MuiThemeProvider>
                      <div style={{ marginLeft: "10%" }}>
                        <div>
                          <img
                            style={{ width: "5%", height: "4%" }}
                            src={require("../assets/location.png")}
                          />

                          <TextField
                            disabled="true"
                            style={{ marginLeft: "10px" }}
                            hintText="Enter your Location"
                            floatingLabelText="Location"
                            name="Location"
                            autoComplete="off"
                            value={this.state.Location}
                            required={true}
                            onChange={(event, newValue) =>
                              this.setState({ Location: newValue })
                            }
                          />
                        </div>

                        <br />

                        <img
                          style={{ width: "5%", height: "4%" }}
                          src={require("../assets/mail.png")}
                        />

                        <TextField
                          disabled="true"
                          style={{ marginLeft: "10px" }}
                          hintText="Enter your Email ID"
                          floatingLabelText="Email ID"
                          required={true}
                          autoComplete="off"
                          value={this.state.EmailId}
                          name="EmailID"
                          onChange={(event, newValue) =>
                            this.setState({ EmailId: newValue })
                          }
                        />

                        <br />
                      </div>
                    </MuiThemeProvider>
                  </div>

                  <MDBBtn
                    type="button"
                    style={{
                      marginTop: "50px",
                      marginLeft: "42%",
                      width: "12%",
                      height: "30%"
                    }}
                    disabled
                    class="btn btn-danger"
                    onClick={this.submit}
                  >
                    SUBMIT
                  </MDBBtn>
                </MDBCardText>

                {error && <div style={errorDisp}>{error}</div>}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </main>
      </div>
    );
  }
}

const errorDisp = {
  marginRight: "150px",

  marginLeft: "230px",

  marginTop: "20px",

  textAlign: "center",

  padding: "15px",

  fontStyle: "italic",

  color: "#a94442",

  fontWeight: "bold",

  borderColor: "#ebccd1",

  backgroundColor: "#f2dede",

  textAlign: "center",

  borderRadius: "25px",

  width: "50%"
};
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(Profile);
