import React from "react";
import { Component } from "react";
import "../CSS/Home.css";
class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <div className="top-header">
                    <div className="left-header">
                        <MainLogo />
                        <Maintitle />
                    </div>
                    <RightHeader /></div>

                <NavigtionBar />
            </div>
        )
    }
}

function Maintitle() {
    return (
        <div className="Maintitle">
            <h1>TRƯỜNG CAO ĐẲNG NGHỀ ĐÀ NẴNG</h1>
            <h2>DANANG VOCATIONAL TRAINING COLLEGE</h2>
            <p className="location">99 Tô Hiến Thành, Sơn Trà, Đà Nẵng</p>
            <a href="danavtc@danavtc.edu.vn">danavtc@danavtc.edu.vn</a>
            <p>02363.942.790 – 02363.940.946</p>
        </div>
    )
}
function MainLogo() {
    return (
        <img src="Images/logo.png"></img>
    )
}
function RightHeader() {
    return (
        <div className="right-header">
            <div className="top-right-header">
                <a href="#">Đăng nhập</a>|
                <a href="#">Liên hệ</a>|
                <a href="#" style={{ marginTop: 6 + "px" }}><img src="Images/icon-en.png"></img></a>
            </div>
            <input type="text"></input>
        </div>
    )
}

function NavigtionBar() {
    return (
        <div className="navigationbar">
            <select>
                <option>SFsad</option>
                <option>asdasf</option>
                <option>gekqf</option>
                <option>poqwfk</option>
            </select>
        </div>
    )
}
export default Header;