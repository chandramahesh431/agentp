import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router, Route, browserHistory, Redirect } from "react-router";
import login from "./components/login";
import forgotPassword from "./components/forgot-password";
import resetPassword from "./components/reset-password";
import Dashboard from "./components/dashboard";
import merchant from "./components/merchant";
import homepage from "./components/homepage";
import StatementsSettlements from "./components/statements-settlements";
import AccountEnquiry from "./components/account_enquiry";
import Profile from "./components/profile";
import PayerLoadFunds from "./components/payer_load_funds";
import MerchantTemplate from "./components/merchant_template";
import Template from "./components/template";
import PayerTemplate from "./components/payer_template";
import MerchantAccountEnquiry from "./components/merchant_account_enquiry";
import PayerAccountEnquiry from "./components/payer_account_enquiry";
import Statements from "./components/statements";
import Settlements from "./components/settlements";
import MerchantActivation from "./components/merchant_activation";
import CashRegister from "./components/cash_register";
import HelpPage from "./components/help";
import SystemParameters from "./components/system-parameters";
import systemLogs from "./components/systemLogs";
import jwtdecode from "jwt-decode";
import Cookies from "js-cookie";
import NotFound from "./components/not-found";
function requireAuth(nextState, replaceState) {
  try {
    if (!jwtdecode(Cookies.get("x-auth-token"))) {
      replaceState({ nextPathname: nextState.location.pathname }, "/");
    }
  } catch (e) {
    browserHistory.push("/");
  }
}
class App extends Component {
  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <Route path="/forgotPassword" component={forgotPassword} />
          <Route path="/restPassword" component={resetPassword} />
          <Route
            path="/dashboard"
            component={Dashboard}
            onEnter={requireAuth}
            // render={props => {
            //   return (
            //     <Redirect
            //       to={{
            //         pathname: "/",
            //         from: props.location.pathname
            //       }}
            //     />
            //   );
            // }}
          />
          <Route path="/homepage" component={homepage} onEnter={requireAuth} />
          <Route
            path="/systemParameters"
            component={SystemParameters}
            onEnter={requireAuth}
          />

          <Route path="/merchant" component={merchant} onEnter={requireAuth} />
          <Route
            path="/systemLogs"
            component={systemLogs}
            onEnter={requireAuth}
          />

          <Route
            path="/statementsAndSettlements"
            component={StatementsSettlements}
            onEnter={requireAuth}
          />
          <Route
            path="/account"
            component={AccountEnquiry}
            onEnter={requireAuth}
          />
          <Route path="/profile" component={Profile} onEnter={requireAuth} />
          <Route
            path="/payerload"
            component={PayerLoadFunds}
            onEnter={requireAuth}
          />
          <Route
            path="/merchantTemplate"
            component={MerchantTemplate}
            onEnter={requireAuth}
          />
          <Route
            path="/payerTemplate"
            component={PayerTemplate}
            onEnter={requireAuth}
          />

          <Route path="/template" component={Template} onEnter={requireAuth} />
          <Route
            path="/merchantAccountEnquiry"
            component={MerchantAccountEnquiry}
            onEnter={requireAuth}
          />
          <Route
            path="/payerAccountEnquiry"
            component={PayerAccountEnquiry}
            onEnter={requireAuth}
          />
          <Route
            path="/statements"
            component={Statements}
            onEnter={requireAuth}
          />
          <Route
            path="/settlements"
            component={Settlements}
            onEnter={requireAuth}
          />
          <Route
            path="/merchantActivation"
            component={MerchantActivation}
            onEnter={requireAuth}
          />
          {/* <Route
            path="/agentLoginGrid"
            component={agentLogin_grid}
            onEnter={requireAuth}
          /> */}
          <Route
            path="/cashRegister"
            component={CashRegister}
            onEnter={requireAuth}
          />
          <Route path="/helpPage" component={HelpPage} onEnter={requireAuth} />
          <Route path="/" component={login} />
          <Route path="*" component={NotFound} />
        </Router>
      </div>
    );
  }
}

export default App;
