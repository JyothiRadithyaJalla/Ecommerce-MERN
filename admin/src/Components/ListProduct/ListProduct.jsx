import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../Assets/cross_icon.png'
import { backend_url, currency } from "../../App";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const resolveImage = (img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    const cleanImg = img.replace(/^\//, ''); // remove leading slash if any
    
    // Ensure we don't duplicate /images/ if backend_url already has it somehow
    const baseUrl = backend_url.endsWith('/') ? backend_url.slice(0, -1) : backend_url;
    
    // Some corrupted DB entries might have the domain embedded without http
    if (cleanImg.includes('onrender.com')) {
       return `https://${cleanImg.replace('https://', '')}`;
    }
    
    return `${baseUrl}/images/${cleanImg}`;
  };

  const fetchInfo = () => {
    fetch(`${backend_url}/allproducts`)
      .then((res) => {
        if (!res.ok) { throw new Error(`HTTP error! status: ${res.status}`); }
        return res.json();
      })
      .then((data) => setAllProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  const removeProduct = async (id) => {
    await fetch(`${backend_url}/removeproduct`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })

    fetchInfo();
  }

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p> <p>Title</p> <p>Old Price</p> <p>New Price</p> <p>Category</p> <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((e, index) => (
          <div key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img className="listproduct-product-icon" src={resolveImage(e.image)} alt="" />
              <p className="cartitems-product-title">{e.name}</p>
              <p>{currency}{e.old_price}</p>
              <p>{currency}{e.new_price}</p>
              <p>{e.category}</p>
              <img className="listproduct-remove-icon" onClick={() => { removeProduct(e.id) }} src={cross_icon} alt="" />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
