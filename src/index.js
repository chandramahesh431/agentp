import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Login from "./components/login";
import ForgotPassword from "./components/forgot-password";
import ResetPassword from "./components/reset-password";
import DashBoard from "./components/dashboard";
import HomePage from "./components/homepage";
import Merchant from "./components/merchant";
import InputPage from "./components/statements-settlements";
import { Router, Route, browserHistory } from "react-router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Template from "./components/template";
import MerchantTemplate from "./components/merchant_template";
import PayerTemplate from "./components/payer_template";
ReactDOM.render(<App />, document.getElementById("root"));
// ReactDOM.render(<statementsettlement />, document.getElementById('root'));

// ReactDOM.render(<InputPage />, document.getElementById('root'));
// ReactDOM.render(<ForgotPassword />, document.getElementById('root'));
// ReactDOM.render(<ResetPassword />, document.getElementById('root'));
// ReactDOM.render(<DashBoard />, document.getElementById('root'));
// ReactDOM.render(<HomePage />, document.getElementById('root'));
// ReactDOM.render(<Merchant />, document.getElementById('root'));
// ReactDOM.render(<Template />, document.getElementById('root'));
// ReactDOM.render(<MerchantTemplate />, document.getElementById('root'));
// ReactDOM.render(<PayerTemplate />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
