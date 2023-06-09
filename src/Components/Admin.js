import React from "react";
// import { ReactDOM } from "react";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
const mockAPI = "https://63a572132a73744b008e28e1.mockapi.io/Product"
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
          Mota:""
        };
    }
    setStatus = () => {
        this.setState({ showAddForm: !this.state.showAddForm });
    }
    componentDidMount() {
        axios
            .get(mockAPI)
            .then(response => {
                this.setState({ product: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }
    deleteBook = (id) => {
        axios
            .delete(mockAPI + "/" + id)
            .then(response => {
                console.log(response);
                const product = this.state.product.filter(item => item.id !== id);
                this.setState({ product });
            })
            .catch(error => {
                console.log(error);
            });
    }
    addBook = () => {
        const Productlist = {
            Name: this.state.Name,
            Price:this.state.Price,
            Quantity: this.state.Quantity,
            Image: this.state.Image,
            Description:this.state.Description
        };
        axios
            .post(mockAPI, Productlist)
            .then(response => {
                console.log(response);
                const product = [...this.state.product, response.data];
                this.setState({ product });
            })
            .catch(error => {
                console.log(error);
            });
    }
    editBook = (id) => {
        const Productlist = this.state.product.find(item => item.id === id);
        this.setState({
            id: id,
            Name: Productlist.Name,
            Price: Productlist.Price,
            Quantity: Productlist.Quantity,
            Image: Productlist.Image,
            Description: Productlist.Description,
            showEditForm: true
        });
    }
    formEditBook = () => {
        return (
            
                        <div className="card editform">
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Ten San Pham</label>
                                    <input type="text" className="form-control" value={this.state.Name} onChange={(e) => this.setState({ Name: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label> Price</label>
                                    <input type="text" className="form-control" value={this.state.Price} onChange={(e) => this.setState({ Price: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>So luong</label>
                                    <input type="number" className="form-control" value={this.state.Quantity} onChange={(e) => this.setState({ Quantity: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Image</label>
                                    <input type="text" className="form-control" value={this.state.Image} onChange={(e) => this.setState({ Image: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" className="form-control" value={this.state.Description} onChange={(e) => this.setState({ Description: e.target.value })} />
                                </div>
                                <button type="button" className="btn btn-primary" onClick={this.updateBook}>Update</button>
                            </div>
                        </div>
                   
        );
    }
    updateBook = () => {
        const Productlist = {
            Name: this.state.Name,
            Price: this.state.Price,
            Quantity: this.state.Quantity,
            Image: this.state.Image,
            Description: this.state.Description
        };
        axios
            .put(mockAPI + "/" + this.state.id, Productlist)
            .then(response => {
                console.log(response);
                const product = this.state.product.map(item => {
                    if (item.id=== this.state.id) {
                        return Productlist;
                    }
                    return item;
                });
                this.setState({ product });
            })
            .catch(error => {
                console.log(error);
            }
            );
    }
    formAddBook = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Ten San Pham</label>
                                    <input type="text" className="form-control" value={this.state.Name} onChange={(e) => this.setState({ Name: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label> Price</label>
                                    <input type="text" className="form-control" value={this.state.Price} onChange={(e) => this.setState({ Price: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>So luong</label>
                                    <input type="number" className="form-control" value={this.state.Quantity} onChange={(e) => this.setState({ Quantity: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Image</label>
                                    <input type="text" className="form-control" value={this.state.Image} onChange={(e) => this.setState({ Image: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" className="form-control" value={this.state.Description} onChange={(e) => this.setState({ Description: e.target.value })} />
                                </div>
                                <button type="button" className="btn btn-primary" onClick={this.addBook}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    render() {
        return (
            <div>
                <HeaderAdmin/>
                <br/> <br/> <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 class="Title_table">Product</h4>
                                    <p className="card-text">
                                    <button class="AddBtn" onClick={this.setStatus}>Add Sản Phẩm Mới</button>
                                        {/* <button class="AddBtn" onClick={this.setStatus}>Add Book</button> */}
                                    </p>
                                    {this.state.showAddForm ? this.formAddBook() : null}

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
                                                <tr>
                                                    <td><textbox type="text" name="id" onChange={this.handleChange} /> {products.id}</td>
                                                    <td>{products.Name}</td>
                                                    <td>{products.Price}</td>
                                                    <td>{products.Quantity}</td>
                                                    <td><img src={products.Image} width={50} height={50}></img> </td>
                                                    <td><button class="deleteBtn" onClick={() => this.deleteBook(products.id)}>Delete</button></td>
                                                    <td><button class="editBtn" onClick={() => this.editBook(products.id)}>Edit</button></td>
                                                </tr>
                                             ))}
                                        </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                  
                        </div>
                    </div>
                </div>
                {this.state.showEditForm ? this.formEditBook() : null}
             </div>
        );
     }
 }

