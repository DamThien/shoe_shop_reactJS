import React from "react";
import axios from "axios";
import Header from "./Headers";
import Banner from "./Banner";
import "../CSS/Home.css";
import "../CSS/product.css";

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            cartItems: [],
        };
    }

    componentDidMount() {
        console.log("Fetching product data...");
        axios
            .get("https://63a572132a73744b008e28e1.mockapi.io/Product")
            .then((response) => {
                console.log("Product data fetched successfully");
                this.setState({ product: response.data });
            })
            .catch((error) => {
                console.log("Error fetching product data:", error);
            });

        console.log("Fetching cart items data...");
        axios
            .get("https://63a572132a73744b008e28e1.mockapi.io/shopping_cart")
            .then((response) => {
                console.log("Cart items data fetched successfully");
                this.setState({ cartItems: response.data });
            })
            .catch((error) => {
                console.log("Error fetching cart items data:", error);
            });
    }

    handleAddToCart = (productId) => {
        console.log("Adding product to cart:", productId);

        const { product, cartItems } = this.state;
        const selectedProduct = product.find((item) => item.id === productId);
        const idpr = selectedProduct.id;
        const existingCartItem = cartItems.find((item) => item.idpr === idpr);
        if (existingCartItem) {
            const updatedCartItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };

            axios
                .put(`https://63a572132a73744b008e28e1.mockapi.io/shopping_cart/${existingCartItem.id}`, updatedCartItem
                )
                .then((response) => {
                    console.log("Cart item updated successfully:", response);
                    const updatedProduct = product.map((item) => {
                        if (item.id === existingCartItem.idpr) {
                            return updatedCartItem;
                        }
                        return item;
                    });
                    this.setState({ product: updatedProduct });
                    alert("Add to cart successfully!")
                })
                .catch((error) => {
                    console.log("Error updating cart item:", error);
                });
        } else {
            const newCartItem = { ...selectedProduct, quantity: 1, idpr };

            axios
                .post(
                    "https://63a572132a73744b008e28e1.mockapi.io/shopping_cart",
                    newCartItem
                )
                .then((response) => {
                    console.log("Cart item added successfully:", response);
                    const updatedCartItems = [...cartItems, newCartItem];
                    this.setState({ cartItems: updatedCartItems });
                    alert("Add to cart successfully!")
                })
                .catch((error) => {
                    console.log("Error adding cart item:", error);
                });
        }
    };

    render() {
        return (
            <>
                <Header />
                <div className="containers">
                    <Banner />
                    <div className="abc">
                        <h2 className="Heading1">
                            <b>Products</b>
                        </h2>
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {this.state.product.map((product) => (
                                <div className="col" key={product.id}>
                                    <div className="cards">
                                        <div className="imgBox">
                                            <img
                                                src={product.Image}
                                                width={200}
                                                alt={product.Name}
                                            />
                                        </div>
                                        <div className="contentBox">
                                            <h3>{product.Name}</h3>
                                            <h2 className="price">{product.Price}</h2>
                                            <button class="cart" onClick={() => this.handleAddToCart(product.id)}>
                                                Add to cart
                                            </button>
                                            <button class="buy">
                                                Buy
                                            </button>
                                            <br></br>
                                            <br></br>
                                            <p>{product.Description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}