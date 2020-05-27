import React, { useEffect, useState, Component } from "react";
import Web3 from "web3";
import "./App.css";
import Marketplace from "../abis/Marketplace.json";
import Navbar from "./Navbar";
import Main from "./Main";

const App = () => {
  const [account, setAccount] = useState("");
  const [productCount, setProductCount] = useState(null);
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marketplace, setMarketPlace] = useState({});

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
    //esl
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (1) {
      const marketplace = web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      setMarketPlace(marketplace);
      const productCount = await marketplace.methods.productCount().call();
      setProductCount(productCount);
      console.log(productCount);
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        products.push(product);
      }
      setproducts(products);
      setLoading(false);
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  };

  const createProduct = (name, price) => {
    setLoading(true);
    console.log(productCount);
    marketplace.methods
      .createProduct(name, price)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setLoading(false);
      });
  };

  const purchaseProduct = (id, price) => {
    setLoading(true);
    marketplace.methods
      .purchaseProduct(id)
      .send({ from: account, value: price })
      .once("receipt", (receipt) => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex">
            {loading ? (
              <div id="loader" className="text-center">
                <p className="text-center">Loading...</p>
              </div>
            ) : (
              <Main
                products={products}
                createProduct={createProduct}
                purchaseProduct={purchaseProduct}
                account={account}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
