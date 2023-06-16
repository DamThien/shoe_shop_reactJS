import React from "react";
// import { ReactDOM } from "react";
import axios from "axios";
import $ from "jquery";
import DataTable from "react-data-table-component";
import Header from "./Headers";
import Banner from "./Banner";
import "../CSS/Home.css";
import "../CSS/product.css";

export default class T1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
        };
        this.onSubmitHandle = this.onSubmitHandle.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.submitEditProduct = this.submitEditProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios
            .get("http://localhost:8000/api/get-T1")
            .then(response => {
                this.setState({ product: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }
    previewImage() {
        $(document).ready(function (e) {
            $("#inputImage").change(function () {
                let reader = new FileReader();
                reader.onload = (e) => {
                    $("#preview-image-before-upload").attr("src", e.target.result);
                };
                reader.readAsDataURL(this.files[0]);
            });
        });
    }

    previewEditImage() {
        $(document).ready(function (e) {
            $("#editImage").change(function () {
                let reader = new FileReader();
                reader.onload = (e) => {
                    $("#preview-image-before-edit").attr("src", e.target.result);
                };
                reader.readAsDataURL(this.files[0]);
            });
        });
    }

    async onSubmitHandle(e) {
        e.preventDefault();

        const fd = new FormData();
        fd.append("uploadImage", this.state.fileUpload);

        if ($("#inputImage").val().split("\\")[2]) {
            await axios
                .post(`http://localhost:8000/api/upload-t1-image`, fd)
                .then((res) => { });
        }

        await axios
            .post("http://localhost:8000/api/add-T1", {
                name: $("#inputName").val(),
                sold: $("#inputSold").val(),
                rating: $("#inputRating").val(),
                price: $("#inputPrice").val(),
                image: $("#inputImage").val().split("\\")[2],
            })
            .then((res) => {
                $("#inputImage").val("")
                alert("Thêm thành công");
                $("#closeModalAddBtn").click();
                this.componentDidMount();
            })
            .catch("Thêm không thành công");
    }

    async deleteProduct(id) {
        if (window.confirm(`Bạn muốn xóa sản phẩm có id là ${id}`)) {
            await axios
                .delete(`http://localhost:8000/api/delete-T1/${id}`, {})
                .then((res) => {
                    alert("Xóa thành công");
                    this.componentDidMount();
                })
                .catch(alert("Xóa không thành công"));
        } else {
            alert("Xóa không thành công");
        }
    }

    handleChange = (file) => {
        this.setState({ fileUpload: file[0] });
    };

    async submitEditProduct(e) {
        e.preventDefault();
        const id = $("#editID").val();
        const image =
            $("#editImage").val().split("\\")[2] !== "" &&
                $("#editImage").val().split("\\")[2] !== undefined
                ? $("#editImage").val().split("\\")[2]
                : $("#preview-image-before-edit").attr("src").split("/")[6];

        const fd = new FormData();
        fd.append("uploadImage", this.state.fileUpload);

        if ($("#editImage").val().split("\\")[2]) {
            await axios
                .post(`http://localhost:8000/api/upload-t1-image`, fd)
                .then((res) => { });
        }

        await axios
            .put(`http://localhost:8000/api/edit-T1/${id}`, {
                name: $("#editName").val(),
                sold: $("#editSold").val(),
                image: image,
                rating: $("#editRating").val(),
                price: $("#editPrice").val(),
            })
            .then(() => {
                $("#editImage").val("")
                alert("Chỉnh sửa thành công");
                $("#closeModalEditBtn").click();
                this.componentDidMount();
            });
    }

    async editProduct(id) {
        let product = this.state.products.find((product) => product.id === id);
        $("#editID").val(product.id);
        $("#editName").val(product.name);
        $("#editPrice").val(product.price);
        $("#editRating").val(product.sold);
        $("#preview-image-before-edit").attr(
            "src",
            `${"http://localhost:8000/api/upload-t1-image"/product.image}`
        );
        $("#editSold").val(product.sold);
    }

    columns = [
        {
            name: "ID",
            selector: "id",
            sortable: true,
        },
        {
            name: "Image",
            sortable: true,
            cell: (row) => (
                <img
                    data-tag="allowRowEvents"
                    src={`${row.image}`}
                    alt="preview"
                    style={{ width: "100px" }}
                />
            ),
        },
        {
            name: "Name",
            selector: "name",
            sortable: true,
            wrap: true,
            compact: true,
        },
        {
            name: "Price",
            selector: "price",
            sortable: true,
        },
        {
            name: "Sold",
            selector: "sold",
            sortable: true,
            wrap: true,
            compact: true,
        },
        {
            name: "Rating",
            selector: "rating",
            sortable: true,
            wrap: true,
            compact: true,
        },
        {
            name: "Action",
            selector: "id",
            cell: (row) => (
                <div>
                    <button
                        data-tag="allowRowEvents"
                        className="btn btn-sm btn-warning"
                        style={{ width: "80px" }}
                        onClick={() => {
                            this.editProduct(row.id);
                        }}
                        type="button"
                        data-toggle="modal"
                        data-target="#modelEditProduct"
                    >
                        Edit
                    </button>
                    <button
                        data-tag="allowRowEvents"
                        type="button"
                        className="btn btn-sm btn-danger"
                        style={{ width: "80px" }}
                        onClick={() => this.deleteProduct(row.id)}
                    >
                        Delete
                    </button>
                </div>
            ),
            compact: true,
        },
    ];
    render() {
        return (
            <>
                <Header />
                <div className="containers">
                    <Banner />
                    <div className="abc">
                        <h2 className="Heading1"><b>Products</b></h2>
                        <div class="row row-cols-1 row-cols-md-3 g-4">
                            {this.state.product.map((products) => (
                                <div class="col">
                                    <div class="cards">

                                        <div class="imgBox">
                                            <img src={products.image} width={200}></img>
                                        </div>

                                        <div class="contentBox">
                                            <h3>{products.name}</h3>
                                            <h2 class="price">{products.price}$</h2>
                                            <a href="#" class="buy">Add to cart</a>
                                            <a href="#" class="buy">Buy Now</a>
                                            <p>Đánh giá: {products.rating} Đã bán: {products.sold}</p>
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                        {/* add product */}
                        <div>
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
                                                onSubmit={this.onSubmitHandle}
                                                encType="multipart/form-data"
                                            >
                                                <div className="form-group">
                                                    <label htmlFor="inputName">Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="inputName"
                                                        id="inputName"
                                                        placeholder="Enter name"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputPrice">Price</label>
                                                    <input
                                                        type="number"
                                                        min={10000}
                                                        className="form-control"
                                                        name="inputPrice"
                                                        id="inputPrice"
                                                        placeholder="Enter price"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputSold">Sold</label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        className="form-control"
                                                        name="inputSold"
                                                        id="inputSold"
                                                        placeholder="Enter type"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputImage">Image file</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="inputImage"
                                                        id="inputImage"
                                                        placeholder="Enter image"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputRating">Rating</label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        className="form-control"
                                                        name="inputRating"
                                                        id="inputRating"
                                                        placeholder="Enter rating"
                                                        required
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

                        {/* edit product */}
                        <div>
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
                                            <h5 className="modal-title">Modal Edit Product</h5>
                                            <button
                                                type="button"
                                                className="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                id="closeModalEditBtn"
                                            >
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form
                                                onSubmit={this.submitEditProduct}
                                                encType="multipart/form-data"
                                            >
                                                <div className="form-group">
                                                    <label htmlFor="editID">ID</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="editID"
                                                        id="editID"
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="editName">Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="editName"
                                                        id="editName"
                                                        placeholder="Enter name"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="editSold">Sold</label>
                                                    <input
                                                        type="number"
                                                        min={10000}
                                                        className="form-control"
                                                        name="editSold"
                                                        id="editSold"
                                                        placeholder="Enter sold"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="editPrice">Price</label>
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        className="form-control"
                                                        name="editPrice"
                                                        id="editPrice"
                                                        placeholder="Enter price"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="editImage">Image file</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="editImage"
                                                        id="editImage"
                                                        placeholder="Enter image"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="editRating">Rating</label>
                                                    <input
                                                        type="number"
                                                        name="editRating"
                                                        id="editRating"
                                                        className="form-control"
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

                        {/* show product */}
                        <div className="container">
                            <button
                                type="button"
                                data-toggle="modal"
                                data-target="#modelAddProduct"
                                className="btn btn-primary"
                                style={{ width: 80 }}
                            >
                                Add
                            </button>
                            <DataTable
                                title="Show Products"
                                columns={this.columns}
                                data={this.state.product}
                                paginationPerPage={5}
                                defaultSortField="id"
                                pagination
                            />
                        </div>
                    </div>
                    
                </div>
               
            </>
        )
    }
}