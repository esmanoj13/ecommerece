import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function Product({ product }) {
  const options = {
    edit: false,
    color: "#808080",
    activeColor: "#FFFF00",
    value: product.ratings,
    isHalf: true,
    size: window.innerwidth < 600 ? 15 : 20,
  };
  return (
    <Link className="productcard" to={product._id}>
      <img src={product.productImage[0].url} alt={product.name} />
      <h4>{product.name}</h4>
      <div className="rating">
        {" "}
        <ReactStars {...options} />
        <span>{product.noOfReviews} reviews</span>
      </div>
      <p>
        <b>${product.price}</b>
      </p>
    </Link>
  );
}
export default Product;
