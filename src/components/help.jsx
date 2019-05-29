import withMobileDialog from "@material-ui/core/withMobileDialog";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from "mdbreact";
import PropTypes from "prop-types";
import React, { Component } from "react";
import DashBoard from "./dashboard";




class HelpPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-12">
        <DashBoard />
        <MDBCol>
          <MDBCard
            style={{
              width: "1000px",
              height: "100%",
              marginTop: "120px",
              marginLeft: "180px"
            }}
          >
            <MDBCardBody style={{ fontSize: "14px" }}>
              {/* , fontFamily: "cursive"  */}
              <MDBCardTitle style={{ color: "#4D4F5C", fontSize: "20px" }}>
                Help
              </MDBCardTitle>
              <div className="col-md-12"> </div>
              <div className="col-md-4" />
              <div className="col-md-4">
                {" "}
                <b>Welcome to Agent Portal Help Page</b>
              </div>
              <div className="col-md-4" />
              <br />
              <br />
              <div className="col-md-12">
                {" "}
                <p>
                  {" "}
                  Agent web-portal is to perform some of the critical activities
                  as needed for the Attra eWallet, some of these activities are
                  temporarily needed as we load funds and settle through cash
                  mode. The sections available in the Agent portal are detailed
                  below
                </p>
                <br />
                <br />
                <div className="col-md-12">
                  <div className="col-md-5">
                    <b>1.Merchant Activation</b>
                  </div>
                  <div className="col-md-6" />
                </div>
                <br />
                <br />
                <div className="col-md-12">
                  <div className="col-md-1" />
                  <p>
                    a. Agent needs to validate merchant details based on the
                    registration details provided and activate or reject
                  </p>
                  <div className="col-md-1" />
                  <p style={{ marginLeft: "8%" }}>
                    b.Merchant status needs to be changed from INACTIVE to
                    ACTIVE or INACTIVE to REJECT depending on the verification
                    of the merchant details
                  </p>
                  <div className="col-md-1" />
                  <p style={{ marginLeft: "8%" }}>
                    c. Merchant status once changed to ACTIVE, QR code is
                    generated ask for QR code screen print from merchant to be
                    printed and handed back to merchant (merchant to send the QR
                    code screen print to agent email ID)
                  </p>
                  <div className="col-md-11" />
                  <br /> <br />
                </div>
                <div className="col-md-12">
                  <div className="col-md-5">
                    <b>2. Load Funds</b>
                  </div>
                  <div className="col-md-6" />
                </div>
                <div className="col-md-12">
                  <div className="col-md-1" />
                  <p>
                    a. Payer gives his mobile number and amount to be loaded to
                    his wallet account
                  </p>
                  <div className="col-md-1" />
                  <p style={{ marginLeft: "8%" }}>
                    b. Agent enters the details and INITIATEs fund load, OTP is
                    delivered to payer for the confirmation
                  </p>
                  <div className="col-md-1" />
                  <p style={{ marginLeft: "8%" }}>
                    c.Payer shares the OTP and cash, Agent verifies the cash
                    received and enters OTP to complete the load funds
                  </p>
                  <div className="col-md-11" />
                  <br /> <br />
                </div>
                <div className="col-md-12">
                  <div className="col-md-5">
                    <b>3.Account Inquiry</b>
                  </div>
                  <div className="col-md-6" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="col-md-1" />
                <p>
                  a. This is to check the Account status for Payer / Merchant,
                  only for inquiry no updates are allowed
                </p>
                <div className="col-md-11" />
                <br /> <br />
                <div className="col-md-12">
                  <div className="col-md-5">
                    <b>4.Statement and Settlement</b>
                  </div>
                  <div className="col-md-6" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="col-md-1" />
                <p>
                  a. This section is to check the statement and settlement of
                  the merchants
                </p>
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  b. Statement is view only data relating to the transactions
                  performed on daily basis to provide the detailed information,
                  this page is only for inquiry
                </p>
                <div className="col-md-1" />
                <p>
                  c. Settlement is to view the amount to be settled to the
                  merchant and also perform the settlement activity
                </p>
              </div>
              <div className="col-md-12">
                <div className="col-md-2" />
                <div className="col=md-3">
                  <p>
                    i. Agent to enter the merchant mobile number (also select
                    the settlement radio button)
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="col-md-2" />
                <div className="col=md-3">
                  <p style={{ marginLeft: "16%" }}>
                    ii. Settlement data for the merchant is displayed on daily
                    basis to indicate the amount to be settled and count of the
                    transactions performed.
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="col-md-2" />
                <div className="col=md-3">
                  <p style={{ marginLeft: "16%" }}>
                    iii. Agent to share the settlement amount to the merchant
                    and agreed, Select the row to be settled, OTP will initiated
                    to the merchant.
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="col-md-2" />
                <div className="col=md-3">
                  <p style={{ marginLeft: "16%" }}>
                    iv. OTP to be shared by the merchant to confirm the
                    settlement initiation. Agent pays the amount and settlement
                    is completed.
                  </p>
                </div>
                <br />
                <br />
                <div className="col-md-12">
                  <div className="col-md-5">
                    <b>5.Cash Register – From side loading menu</b>
                  </div>
                  <div className="col-md-6" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="col-md-1" />
                <p>
                  a.This section displays the cash position and the funds under
                  various heads
                </p>
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  b. System Balance gives the total balance held by the agent.
                  System Balance = (Balance yesterday + Today in Funds + Today
                  Bonus – Today Settled)
                </p>
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  c. Funds Loaded Today gives the total of the funds loaded by
                  payers today, as soon as load funds is performed it is added
                  here
                </p>
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  d. Bonus Today gives the total of the bonus applied to the
                  payers’ accounts who have been activated today
                </p>
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  e. Balance Yesterday gives the total funds position as of
                  yesterday EOD
                </p>
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  f. Pending Settlement gives the amount to be settled, as soon
                  as a payment is performed by the payer, transaction amount is
                  added here
                </p>
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  g. Today Settled gives the amount settled today, as soon as
                  settlement for a merchant is performed it is added here
                </p>
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  h. Yesterday Settled gives the amount settled yesterday only
                  for historical information
                </p>
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  i. Everyday at the end of the day / begin of the next day
                  perform the Cash Register Refresh by clicking on the refresh
                  icon, this is allowed only once in a day
                </p>
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  j. System Date and Time is displayed to indicate the system
                  cash position at that time
                </p>
                <div className="col-md-11" />
                <br /> <br />
                <div className="col-md-12">
                  <div className="col-md-5">
                    <b>6.Account Templates</b>
                  </div>
                  <div className="col-md-6" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  a.Template account types are maintained under this section, as
                  000n series is for Payer template account and 100n series is
                  for Merchant template account
                </p>
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  b. Payer template account will contain the account limit,
                  transaction limit and promotion bonus applied to the payer
                  account
                </p>
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  c. Merchant template account will contain the account limit,
                  transaction limit and settlement / statement frequency to be
                  applied to the merchant account
                </p>
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  d. Additional features when rolled out will be included in the
                  template accounts
                </p>
                <div className="col-md-1" />
                <p style={{ marginLeft: "8%" }}>
                  e. If any template changes are made, then the changes are
                  applicable only for the accounts setup after the changes, for
                  older accounts the limits preset will continue
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    );
  }
}
HelpPage.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};
export default withMobileDialog()(HelpPage);
