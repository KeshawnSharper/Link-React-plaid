import React, { Component } from "react";
import {PlaidLink} from "react-plaid-link";
import axios from 'axios';

class Link extends Component {
  constructor() {
    super();

    this.state = {
      linkToken: "",
    };

  }


  componentDidMount = async () =>{
    var response = await axios.post("http://localhost:3000/link_token").then()
    console.log(response.data)
    this.setState({linkToken: response.data["link_token"]});
  }

  handleOnSuccess = async (public_token, metadata) => {
    // send token to client server
    var data = {
      public_token: public_token,
      // use this as the dummy user for now 
    user_id:1
    }
    var response = await axios.post("http://localhost:3000/sync_user_to_bank_account", data)

    console.log("response",response)
    //to do set accessToken into sessionStorage then move onto UI calls in other components.
    localStorage.setItem("accessToken", response.data["access_token"])

    window.location.replace(`https://user-stock-funds.web.app/${response.data['access_token']}`);
    // let transactions = await axios.post("http://localhost:5000/user_transactions", {
    //     access_token: localStorage.getItem("accessToken"),
    //     start_date: '2018-01-01',
    //     end_date: '2022-01-12'
    // })
    // transactions = transactions.data["transactions"]
    // console.log(transactions)
    // let inv_response = await axios.post("http://localhost:5000/user_investments", {
    //     access_token: localStorage.getItem("accessToken")
    // });
    // let investments = {
    //     securities:inv_response.data["securities"],
    //     accounts:inv_response.data["accounts"],
    //     holdings:inv_response.data["holdings"]}
    // console.log(investments)
  }

   
  render() {
    return (
      <div>
          <PlaidLink
          token={this.state.linkToken}
          clientName="none"
          env="sandbox"
          product={["auth", "transactions","balance"]}
          publicKey="3a209bc027bedb366c96c93878a08a"
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}
          className="test"
        >
          Open Link and connect your bank!
        </PlaidLink> 
      </div>
    );
  }
}

export default Link;