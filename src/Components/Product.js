import React from "react";
import { ReactDOM } from "react";
import axios from "axios";
import Header from "./Headers";
import Banner from "./Banner";
import "../CSS/product.css";
export default class Product extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            product: [],
          };
      }
     
      componentDidMount() {
          axios
          .get("https://63a572132a73744b008e28e1.mockapi.io/PRODUCT")
              .then(response => {
                  this.setState({ product: response.data });
              })
              .catch(error => {
                  console.log(error);
              });
      }

    render(){return(
        <>
            <Header/>
            <div className="containers">
                <Banner />
                 <div className="abc">
                    <h2 className="Heading1"><b>Products</b></h2>
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        {this.state.product.map((products) => (
                            <div class="col">
                                <div class="cards">

                                    <div class="imgBox">
                                        <img src={products.Image} width={200}></img>
                                    </div>

                                    <div class="contentBox">
                                        <h3>{products.Name}</h3>
                                        <h2 class="price">{products.Price}</h2>
                                        <a href="#" class="buy">Add to cart</a>
                                        <a href="#" class="buy">Buy Now</a>
                                        <p>{products.Description}</p>
                                    </div>

                                </div>
                                
                            </div>
                        ))}
                
                    </div>
                 </div>
                
            </div>
        </>
        
        
        
    )
    }
}