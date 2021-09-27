import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { addToCart } from "../store/Actions";
import Link from "next/link";
import { toast } from "react-toastify";

function ProductItem({ product }) {
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <a
            className="btn text-white me-1"
            style={{
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              background: "#1ac",
              flex: 1,
            }}
          >
            View
          </a>
        </Link>
        <button
          className="btn btn-success ms-1"
          style={{
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            flex: 1,
          }}
          disabled={product.inStock === 0 ? true : false}
          onClick={() => {
            dispatch(addToCart(product, cart));
          }}
        >
          Buy
        </button>
      </>
    );
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={product.images[0].url}
        alt={product.images[0].url}
      />
      <div className="card-body">
        <h5 className="card-title text-capitalize" title={product.title}>
          {product.title}
        </h5>

        <div className="d-flex justify-content-between mx-0">
          <h6 className="text-danger">
            <span style={{ fontSize: "25px" }}>৳</span>
            {product.price}
          </h6>
          {product.inStock > 0 ? (
            <h6 className="text-danger">In Stock: {product.inStock}</h6>
          ) : (
            <h6 className="text-danger">Out Stock</h6>
          )}
        </div>

        <p className="card-text" title={product.description}>
          {product.description}
        </p>

        <div className="row justify-content-between mx-0">
          {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
