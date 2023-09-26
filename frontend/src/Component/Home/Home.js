import React, { useEffect, Fragment } from "react";
import { FaMouse } from "react-icons/fa";
import "./Home.css";
import Product from "./product.js";
import Metafield from "../Metadata.js";
import { getproducts } from "../../Action/Productaction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader.js";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, productCount, products, error } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if(error)
    {
      return alert.error(error);
    }
    dispatch(getproducts());
  }, [dispatch,error]);
  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <Metafield title="E-Commerece" />
          <div className="home">
            <h2>Welcome to Ecommerece Store</h2>
            <p> You find the amazzing products below</p>
            <a href="#container">
              <button class="btn-scroll">
                Scroll
                <FaMouse />
              </button>
            </a>
          </div>
          <div className="container">
            <h2>Feature Product</h2>
            <div className="container" id="container">
              {products &&
                products.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              ;
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
