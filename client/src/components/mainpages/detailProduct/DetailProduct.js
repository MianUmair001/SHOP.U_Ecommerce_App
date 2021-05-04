import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utills/ProductItem/ProductItem";
function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);
  const addCart = state.userAPI.addCart;
  useEffect(() => {
    if (params.id)
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailProduct(product);
        }
      });
  }, [params.id, products]);
  console.log(detailProduct);
  if (detailProduct.length === 0) {
    return null;
  }
  return (
    <span>
      <div className="detail">
        <img src={detailProduct.images && detailProduct.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
            <h6>#id:{detailProduct.product_id}</h6>
          </div>
          <span>$ {detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.concent}</p>
          <p>Sold: ${detailProduct.sold}</p>
          <Link
            to="/cart"
            className="cart"
            onClick={() => addCart(detailProduct)}
          >
            Buy Now
          </Link>
        </div>
      </div>
      <div>
        <h2>Related Product</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </span>
  );
}

export default DetailProduct;
