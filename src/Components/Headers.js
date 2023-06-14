import React from "react";
import { ReactDOM } from "react";

import { BrowserRouter, Routes, Route, Link, NavLink, Redirect } from "react-router-dom";
export default class Header extends React.Component{
    render(){
        return (
          <div className="header">
            <div className="left-header">
            <Link to="/">Home Page</Link>
            </div>
            <div className="logo">
              <h1>TS</h1>
            </div>
            <div className="right-header">
              <Link to="/admin">Admin</Link>
              <span>
              <Link to="/cart">Cart</Link>
              </span>
              <span>
                <a href="#">Login</a>
              </span>
              <span>
                <a href="#"></a>
              </span>
            </div>
          </div>
        );
      }

}