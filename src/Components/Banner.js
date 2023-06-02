import React from "react";
import { ReactDOM } from "react";

import axios from "axios";
export default class Banner extends React.Component{
    render(){
        return (
            <div className="banner">
              <h1 className="bannertext">TS Shop</h1>
              <img
                className="under-bg"
                src="https://www.mensjournal.com/.image/t_share/MTk2MTM1ODE5NjI4MzI0MzU3/nike-zoomx-vaporfly-next-2.jpg"
                alt=""
              ></img>
            </div>
          );
    }

}