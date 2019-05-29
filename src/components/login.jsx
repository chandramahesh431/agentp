import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import React, { Component } from "react";
import { browserHistory } from "react-router";
import { Button } from "reactstrap";
import http from "../components/services/httpService";
import Cookies from "js-cookie";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});
const dotenv = require("../../src/env");
const config = {
  headers: { Pragma: "no-cache" }
};

class Login extends Component {
  login = async () => {
    // Cookies.remove("token");
    // const { data } = await http.get("http://localhost:3000/login");
    // console.log(data);
    window.location =
      "https://login.microsoftonline.com/81e3903c-8ab2-45a0-ae23-ca3a93fc7fcd/oauth2/v2.0/authorize?response_type=token&client_id=ab98568c-8be5-4612-9f0d-e3559b2d65bf&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fuser.read";
    // console.log("window", cookie.load("buid"));
    // this.setState({ token: Cookies.get("token") });
    //console.log("token", Cookies.get("token"));
    console.log("adas", this.props);
    this.setState({});
    // setTimeout(function() {
    //   browserHistory.push("/dashboard");
    // }, 3000);
  };
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: "",

      password: "",

      error: "",

      errorTextMail: "",

      errorpassword: ""
    };
  }

  requiredValidation(state) {
    switch (state.target.name) {
      case "userId":
        if (state.target.value == "" && state.target.value.length == 0) {
          this.setState({ errorTextMail: "This field is required" });

          break;
        } else {
          this.setState({ errorTextMail: "" });
        }

      case "password":
        if (state.target.value == "" && state.target.value.length == 0) {
          this.setState({ errorpassword: "This field is required" });

          break;
        } else {
          this.setState({ errorpassword: "" });
        }
    }
  }
  handleClick() {
    require("es6-promise").polyfill();
    var axios = require("axios");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("x-auth-token");
    axios
      .post(
        dotenv.API_ROOT + "/agents/login",
        {
          username: this.state.email,

          password: this.state.password
        },
        config
      )
      .then(response => {
        if (response.status == 200) {
          window.sessionStorage.setItem("userId", response.data.userId);
          window.sessionStorage.setItem("loginId", this.state.email);
          axios
            .get(dotenv.API_ROOT + "/configs/getActiveCurrency", config)
            .then(response => {
              if (response.status == 200) {
                window.sessionStorage.setItem(
                  "currency",
                  response.data.response.Currencytype
                );
                const path = "/homepage";
                window.localStorage.removeItem("isAdmin");
                window.localStorage.setItem("isAdmin", true);
                browserHistory.push(path);
                this.state.error = "Login Success";
                this.setState({ error: "Login Success" });
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
      })
      .catch(error => {
        if (error.response) {
          this.setState({ error: error.response.data.error.message });
        } else {
          this.setState({ error: "Unable to reach Server" });
        }
      });
  }

  result() {
    const path = "/forgotPassword";
    browserHistory.push(path);
  }
  getToken = () => {
    const token = this.props.location.hash;
    const tokenArray = token.split("&")[0].split("=");
    return tokenArray[1];
  };

  render() {
    if (this.getToken()) {
      http.setJwt(this.getToken());
      Cookies.set("x-auth-token", this.getToken());
      browserHistory.push("/dashboard");
    }

    const { email, password, error } = this.state;

    const enabled =
      this.state.email.length > 0 && this.state.password.length > 0;
    return (
      <div className="col-md-12">
        <div className="col-md-6 bckgImage">
          {/* <img className="image-style" src={require("../assets/login.jpg")} /> */}

          <img className="logo" src={require("../assets/Logo.svg")} />

          <div className="logo-svg">agent</div>
        </div>

        <div className="col-md-6">
          <MuiThemeProvider>
            {/* <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginTop: "25%",
                textAlign: "center",
                color: "#808080"
              }}
            >
              LOGIN
            </div> */}

            <div style={{ marginLeft: "35%", marginTop: "40%" }}>
              <div>
                {/* <img
                  className="col-md-6"
                  style={{ width: "11%", height: "2%", marginTop: "8%" }}
                  src={require("../assets/user_id.png")}
                />

                <TextField
                  style={{ marginLeft: "10px" }}
                  hintText="Enter your User Id"
                  floatingLabelText="User Id *"
                  name="userId"
                  autoComplete="off"
                  required={true}
                  errorText={this.state.errorTextMail}
                  onBlur={event => this.requiredValidation(event)}
                  onChange={(event, newValue) =>
                    this.setState({ email: newValue })
                  }
                /> */}
              </div>
              <br />
              {/* <img
                className="col-md-6"
                style={{ width: "11%", height: "2%", marginTop: "8%" }}
                src={require("../assets/password1.jfif")}
              />

              <TextField
                style={{ marginLeft: "10px" }}
                hintText="Enter your Password"
                type="password"
                floatingLabelText="Password *"
                required={true}
                autoComplete="off"
                name="password"
                errorText={this.state.errorpassword}
                onBlur={event => this.requiredValidation(event)}
                onChange={(event, newValue) =>
                  this.setState({ password: newValue })
                }
              /> */}
              <br />
              {/* <div
                style={{
                  fontSize: "14px",
                  marginLeft: "43%",
                  fontStyle: "italic",
                  marginTop: "3%"
                }}
                onClick={this.toggleModal}
              >
                <a style={{ color: "blue" }} onClick={this.result}>
                  Forgot password?
                </a>
              </div> */}
              {/* <Button
                color="danger"
                disabled={!enabled}
                style={style}
                onClick={this.handleClick}
              >
                Login
              </Button>
              <br /> */}
              <Button
                onClick={this.login}
                color="danger"
                // className={classes.button}
              >
                <h4>Sign in using Office 365</h4>
              </Button>
              {this.state.token}

              {/* <Button
                variant="contained"
                color="danger"
                // className={classes.button}
              >
                <h4> Sign in using Google</h4>
              </Button>
              <a
                href="https://login.microsoftonline.com/81e3903c-8ab2-45a0-ae23-ca3a93fc7fcd/oauth2/v2.0/authorize?
client_id=0c8c5edf-454c-40cb-aaed-750c4e558340&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fuser.read"
              >
                Login with github
              </a> */}
            </div>
          </MuiThemeProvider>

          {error && <div style={alert}>{error}</div>}
        </div>
      </div>
    );
  }
}

const alert = {
  marginRight: "150px",

  marginLeft: "160px",

  marginTop: "20px",

  textAlign: "center",

  padding: "15px",

  fontStyle: "italic",

  color: "red",
  fontSize: "15px",

  fontWeight: "bold",

  textAlign: "center",

  width: "50%"
};

const style = {
  marginLeft: "21%",

  marginTop: "5%",

  width: "27%",
  fontSize: "13px"
};

export default Login;
