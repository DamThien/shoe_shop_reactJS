import React from "react";
import style from "../CSS/header.css";
import Header from "./Home";
import Product from "./Product";
import "../CSS/product.css";
import Admin from "./Admin";
import { BrowserRouter, Routes, Route, Link, NavLink, Redirect } from "react-router-dom";

class MainHeader extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <>
          
          
           
              <Routes>
                <Route path="/admin" element={<Admin/>} /> {/* Hiển thị component Admin khi truy cập vào /admin */}
              </Routes>
           
              <Routes>
                <Route path="/" element={<Product/>} /> {/* Hiển thị component Product khi truy cập vào trang chủ */}
              </Routes>
           
          
        </>
      </BrowserRouter>
    );
  }
}



export default MainHeader;
