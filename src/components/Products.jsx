import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Products= () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product List</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img src={product.image} alt={product.title} className="card-img-top p-3" style={{ height: '200px', objectFit: 'contain' }} />
              <div className="card-body">
                <h6 className="card-title">{product.title}</h6>
                <p className="card-text">₹ {product.price}</p>
                <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
