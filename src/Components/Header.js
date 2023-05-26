import React from "react";
import style from "../CSS/header.css"
import Header from './Home';
class MainHeader extends React.Component{
    render() {
        return (
            <>
                <HeaderTD />
                <div className="container">
                    <Banner />
                    <div className="abc"></div>
                </div>
            </>
        )
    }
}

function HeaderTD() {
    return (
        <div className="header">
                <div className="left-header">
                    <p>Menu</p>
                </div>
                <div className="logo"><h1>TS</h1></div>
                <div className="right-header">
                    <span><p>Cart</p></span>
                    <span><a href="#">Login</a></span>
                </div>
            </div>
    )
}
function Banner() {
    return (
        <div className="banner">
            <h1 className="bannertext">TS Shop</h1>
            <img className="under-bg" src="https://www.mensjournal.com/.image/t_share/MTk2MTM1ODE5NjI4MzI0MzU3/nike-zoomx-vaporfly-next-2.jpg"></img>
           
        </div>
    )
}
export default MainHeader