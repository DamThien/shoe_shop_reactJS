import React from "react";
// import { ReactDOM } from "react";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin.js";

import { ToastContainer, toast } from "react-toastify";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      id: null,
      Name: "",
      Price: "",
      Quantity: "",
      Image: "",
      Description: "",
    };
  }
  setStatus = () => {
    this.setState({ showAddForm: !this.state.showAddForm });
  };
  componentDidMount() {
    axios
      .get("https://63a572132a73744b008e28e1.mockapi.io/Product")
      .then((response) => {
        this.setState({ product: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deleteBook = (id) => {
    axios
      .delete("https://63a572132a73744b008e28e1.mockapi.io/Product/" + id)
      .then((response) => {
        console.log(response);
        const product = this.state.product.filter((item) => item.id !== id);
        this.setState({ product });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  addBook = () => {
    const Productlist = {
      Name: this.state.Name,
      Price: this.state.Price,
      Quantity: this.state.Quantity,
      Image: this.state.Image,
      Description: this.state.Description,
    };
    axios
      .post("https://63a572132a73744b008e28e1.mockapi.io/Product", Productlist)
      .then((response) => {
        console.log(response);
        const product = [...this.state.product, response.data];
        this.setState({ product });

        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  editBook = (id) => {
    const Productlist = this.state.product.find((item) => item.id === id);
    this.setState({
      id: id,
      Name: Productlist.Name,
      Price: Productlist.Price,
      Quantity: Productlist.Quantity,
      Image: Productlist.Image,
      Description: Productlist.Description
    });
  };
  formEditBook = () => {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="form-group">
                    <label>Ten San Pham</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.Name}
                      onChange={(e) => this.setState({ Name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label> Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.Price}
                      onChange={(e) => this.setState({ Price: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>So luong</label>
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.Quantity}
                      onChange={(e) =>
                        this.setState({ Quantity: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Image</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.Image}
                      onChange={(e) => this.setState({ Image: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      value={this.state.Description}
                      onChange={(e) =>
                        this.setState({ Description: e.target.value })
                      }
                    />
                  </div>
                  <button onClick={this.updateBook}>Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  updateBook = () => {
    const Productlist = {
      Name: this.state.Name,
      Price: this.state.Price,
      Quantity: this.state.Quantity,
      Image: this.state.Image,
      Description: this.state.Description,
    };
    console.log(this.state.id,Productlist);
    
    axios
      .put(
        "https://63a572132a73744b008e28e1.mockapi.io/Product/" + this.state.id,
        Productlist
      )
      .then((response) => {
        console.log(response);
        const product = this.state.product.map((item) => {
          if (item.id === this.state.id) {
            return Productlist;
          }
          return item;
        });
        this.setState({ product });
    
      })
      .catch((error) => {
        console.log(error);
      });
  };
  formAddBook = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="form-group">
                  <label>Ten San Pham</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.Name}
                    onChange={(e) => this.setState({ Name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label> Price</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.Price}
                    onChange={(e) => this.setState({ Price: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>So luong</label>
                  <input
                    type="number"
                    className="form-control"
                    value={this.state.Quantity}
                    onChange={(e) =>
                      this.setState({ Quantity: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.Image}
                    onChange={(e) => this.setState({ Image: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.Description}
                    onChange={(e) =>
                      this.setState({ Description: e.target.value })
                    }
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.addBook}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <HeaderAdmin />
        <br /> <br /> <br />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h4 class="Title_table">Product</h4>
                  <div>
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#modelAddProduct"
                      className="btn btn-primary"
                      style={{ width: 80 }}
                    >
                      Add
                    </button>
                    <div
                      className="modal fade"
                      id="modelAddProduct"
                      tabIndex={-1}
                      role="dialog"
                      aria-labelledby="modelTitleId"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Modal Add Product</h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                              id="closeModalAddBtn"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form
                              onSubmit={this.addBook}
                              encType="multipart/form-data"
                            >
                              <div className="form-group">
                                <label htmlFor="inputName">Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={this.state.Name}
                                  onChange={(e) =>
                                    this.setState({ Name: e.target.value })
                                  }
                                  placeholder="Enter name"
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="inputPrice">Price</label>
                                <input
                                  type="text"
                                 
                                  className="form-control"
                                  name="inputPrice"
                                  id="inputPrice"
                                  value={this.state.Price}
                                  onChange={(e) =>
                                    this.setState({ Price: e.target.value })
                                  }
                                  placeholder="Enter price"
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="inputQuantity">Quantity</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="inputPrice"
                                  id="inputPrice"
                                  value={this.state.Quantity}
                                  onChange={(e) =>
                                    this.setState({ Quantity: e.target.value })
                                  }
                                  placeholder="Enter price"
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="inputImage">Image</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="inputImage"
                                  id="inputImage"
                                  value={this.state.Image}
                                  onChange={(e) =>
                                    this.setState({ Image: e.target.value })
                                  }
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="inputDescription">
                                  Description
                                </label>
                                <input
                                  type="text"
                                  name="inputDescription"
                                  className="form-control"
                                  value={this.state.Description}
                                  onChange={(e) =>
                                    this.setState({
                                      Description: e.target.value,
                                    })
                                  }
                                  defaultValue={""}
                                />
                              </div>
                              <button type="submit" className="btn btn-primary">
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*EDIT*/}
                    <div
                      className="modal fade"
                      id="modelEditProduct"
                      tabIndex={-1}
                      role="dialog"
                      aria-labelledby="modelTitleId"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Modal Add Product</h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                              id="closeModalAddBtn"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form
                              onSubmit={this.updateBook}
                              encType="multipart/form-data"
                            >
                              <div className="form-group">
                                <label>Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={this.state.Name}
                                  onChange={(e) =>
                                    this.setState({ Name: e.target.value })
                                  }
                                  placeholder="Enter name"
                              
                                />
                              </div>
                              <div className="form-group">
                                <label >Price</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="inputPrice"
                                  id="inputPrice"
                                  value={this.state.Price}
                                  onChange={(e) =>
                                    this.setState({ Price: e.target.value })
                                  }
                                  placeholder="Enter price"
                                  
                                />
                              </div>
                              <div className="form-group">
                                <label >Quantity</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="inputPrice"
                                  id="inputPrice"
                                  value={this.state.Quantity}
                                  onChange={(e) =>
                                    this.setState({ Quantity: e.target.value })
                                  }
                                  placeholder="Enter price"
                                 
                                />
                              </div>

                              <div className="form-group">
                                <label >Image</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="inputImage"
                                  id="inputImage"
                                  value={this.state.Image}
                                  onChange={(e) =>
                                    this.setState({ Image: e.target.value })
                                  }
                                  
                                />
                              </div>

                              <div className="form-group">
                                <label >
                                  Description
                                </label>
                                <input
                                  type="text"
                                  name="inputDescription"
                                  className="form-control"
                                  value={this.state.Description}
                                  onChange={(e) =>
                                    this.setState({
                                      Description: e.target.value,
                                    })
                                  }
                                
                                />
                              </div>
                              <button type="submit" className="btn btn-primary">
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Giá</th>
                        <th>Số Lượng</th>
                        <th>Image</th>
                        <th>Xóa</th>
                        <th>Sửa</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.product.map((products) => (
                        <tr key={products.id}>
                          <td>
                          
                            {products.id}
                          </td>
                          <td>{products.Name}</td>
                          <td>{products.Price}</td>
                          <td>{products.Quantity}</td>
                          <td>
                            <img
                              src={products.Image}
                              width={50}
                              height={50}
                            ></img>{" "}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning"

                              onClick={() => this.deleteBook(products.id)}
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              data-tag="allowRowEvents"
                              className="btn btn-sm btn-warning"
                              style={{ width: "80px" }}
                              onClick={() => this.editBook(products.id)}

                              type="button"
                              data-toggle="modal"
                              data-target="#modelEditProduct"
                            >
                              Edit
                            </button>
                            
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
