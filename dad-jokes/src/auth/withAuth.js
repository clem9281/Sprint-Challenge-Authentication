import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

axios.interceptors.request.use(function (config) {
  config.headers.authorization = localStorage.getItem("token");
  return config;
});

export default function (Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem("token");
      return (
        <>{token ? <Component {...this.props} /> : <Redirect to="/login" />}</>
      );
    }
  };
}
