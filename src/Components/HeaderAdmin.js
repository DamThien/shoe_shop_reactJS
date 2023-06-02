import React from "react";
import { ReactDOM } from "react";

import { BrowserRouter, Routes, Route, Link, NavLink, Redirect } from "react-router-dom";
export default class HeaderAdmin extends React.Component{
    render(){
        return (
          <div className="header">
            <div className="left-header">
            <Link to="/">Home Page</Link>
            </div>
            <div className="logo">
              <h1>ADMIN PAGE</h1>
            </div>
            <div className="right-header">
              <Link to="/admin">Admin</Link>
            
              <span>
                <a href="#">Logout</a>
              </span>
              <span>
                <a href="#"></a>
              </span>
            </div>
          </div>
        );
      }

}