import React, { useState } from "react";

const Main = ({ createProduct, purchaseProduct, products, account }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });

  const { name, price } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, window.web3.utils.toWei(price.toString(), "Ether"));
    createProduct(name, window.web3.utils.toWei(price.toString(), "Ether"));
  };

  return (
    <div id="content">
      <h1>Add Product</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group mr-sm-2">
          <input
            id="productName"
            type="text"
            className="form-control"
            placeholder="Product Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="productPrice"
            type="text"
            className="form-control"
            placeholder="Product Price"
            name="price"
            value={price}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
      <p>&nbsp;</p>
      <h2>Buy Product</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Owner</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="productList">
          {products.map((product, key) => {
            return (
              <tr key={key}>
                <th scope="row">{product.id.toString()}</th>
                <td>{product.name}</td>
                <td>
                  {window.web3.utils.fromWei(product.price.toString(), "Ether")}{" "}
                  Eth
                </td>
                <td>{product.owner}</td>
                <td>
                  {account !== product.owner ? (
                    <button
                      className="btn btn-primary"
                      name={product.id}
                      value={product.price}
                      onClick={(event) => {
                        purchaseProduct(event.target.name, event.target.value);
                      }}
                    >
                      Buy
                    </button>
                  ) : (
                    <button className="btn btn-success">Owned</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Main;
