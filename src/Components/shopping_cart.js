import React from "react";
import axios from "axios";
import Header from "./Headers";
import "../CSS/product.css";
export default class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      sum: 0,
    };
  }

  formatCurrency = (amount) => {
    return new Intl.NumberFormat("vn-VN", {
      style: "currency",
      currency: "usd",
    }).format(amount);
  };

  componentDidMount() {
    console.log("Fetching product data...");
    axios
      .get("https://63a572132a73744b008e28e1.mockapi.io/shopping_cart")
      .then((response) => {
        console.log("Product data fetched successfully");
        this.setState({ cartItems: response.data });
      })
      .catch((error) => {
        console.log("Error fetching product data:", error);
      });
  }
  increaseQuantity = (cartItemId) => {
    const updatedCartItems = this.state.cartItems.map((item) => {
      if (item.id === cartItemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    this.setState({ cartItems: updatedCartItems });

    axios
      .put(
        `https://63a572132a73744b008e28e1.mockapi.io/shopping_cart/${cartItemId}`,
        {
          quantity: updatedCartItems.find((item) => item.id === cartItemId)
            ?.quantity,
        }
      )
      .then((response) => {
        console.log("Quantity updated successfully");
      })
      .catch((error) => {
        console.log("Error updating quantity:", error);
      });
  };

  decreaseQuantity = (cartItemId) => {
    const updatedCartItems = this.state.cartItems.map((item) => {
      if (item.id === cartItemId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    this.setState({ cartItems: updatedCartItems });

    axios
      .put(
        `https://63a572132a73744b008e28e1.mockapi.io/shopping_cart/${cartItemId}`,
        {
          quantity: updatedCartItems.find((item) => item.id === cartItemId)
            ?.quantity,
        }
      )
      .then((response) => {
        console.log("Quantity updated successfully");
      })
      .catch((error) => {
        console.log("Error updating quantity:", error);
      });
  };

  deleteCART = (id) => {
    axios
      .delete("https://63a572132a73744b008e28e1.mockapi.io/shopping_cart/" + id)
      .then((response) => {
        console.log(response);
        const updatedCartItems = this.state.cartItems.filter(
          (item) => item.id !== id
        );
        this.setState({ cartItems: updatedCartItems });
        alert("Successfully removed from cart!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { cartItems } = this.state;

    const total = cartItems.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.Price * currentItem.quantity,
      0
    );

    return (
      <div>
        <Header />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="container">
          <h2>Shopping Cart</h2>
          <div>
            <table className="table table-bordered border-primary">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Unit price</th>
                  <th scope="col">Into money</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td>
                      <img
                        src={cartItem.Image}
                        width={200}
                        height={200}
                        alt={cartItem.Name}
                      />
                    </td>
                    <td>{cartItem.Name}</td>
                    <td>{this.formatCurrency(cartItem.Price)}</td>
                    <td>
                      {this.formatCurrency(cartItem.Price * cartItem.quantity)}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => this.decreaseQuantity(cartItem.id)}
                      >
                        -
                      </button>
                      <span className="quantity">{cartItem.quantity}</span>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => this.increaseQuantity(cartItem.id)}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => this.deleteCART(cartItem.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h1>Total: {this.formatCurrency(total)}</h1>
            <button
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
