import React from "react";
import { ReactDOM } from "react";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";

export default class Admin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          product: [],
          id: null,
          Tensp: "",
          Gia: "",
          Soluong: "",
          Hinhanh: "",
          Mota:""
        };
    }
    setStatus = () => {
        this.setState({ showAddForm: !this.state.showAddForm });
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
    deleteBook = (id) => {
        axios
            .delete("https://63a572132a73744b008e28e1.mockapi.io/PRODUCT" + id)
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
            Tensp: this.state.Tensp,
            Gia:this.state.Gia,
            Soluong: this.state.Soluong,
            Hinhanh: this.state.Hinhanh
        };
        axios
            .post("https://63a572132a73744b008e28e1.mockapi.io/PRODUCT", Productlist)
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
            Tensp: Productlist.Tensp,
            Gia: Productlist.Gia,
            Soluong: Productlist.Soluong,
            Hinhanh: Productlist.Hinhanh,
            showEditForm: true
        });
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
                                    <input type="text" className="form-control" value={this.state.Tensp} onChange={(e) => this.setState({ Tensp: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label> Gia</label>
                                    <input type="text" className="form-control" value={this.state.Gia} onChange={(e) => this.setState({ Gia: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>So luong</label>
                                    <input type="number" className="form-control" value={this.state.Soluong} onChange={(e) => this.setState({ Soluong: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Hinhanh</label>
                                    <input type="text" className="form-control" value={this.state.Hinhanh} onChange={(e) => this.setState({ Hinhanh: e.target.value })} />
                                </div>
                                <button type="button" className="btn btn-primary" onClick={this.addBook}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    formEditBook = () => {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Tên Sản Phẩm"
                    value={this.state.Tensp}
                    onChange={e => this.setState({ Tensp: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Giá"
                    value={this.state.Gia}
                    onChange={e => this.setState({ Gia: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Số Lượng"
                    value={this.state.Soluong}
                    onChange={e => this.setState({ Soluong: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Hinhanh"
                    value={this.state.Hinhanh}
                    onChange={e => this.setState({ Hinhanh: e.target.value })}
                />
                <button onClick={this.updateBook}>Update</button>
            </div>
        );
    }
    updateBook = () => {
        const Productlist = {
            Tensp: this.state.Tensp,
            Gia: this.state.Gia,
            Soluong: this.state.Soluong,
            Hinhanh: this.state.Hinhanh
        };
        axios
            .put("https://63a572132a73744b008e28e1.mockapi.io/PRODUCT" + this.state.id, Productlist)
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
                                                <th>Hinhanh</th>
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

