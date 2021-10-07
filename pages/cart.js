import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import { ACTIONS } from "../store/Actions";
import { getData } from "../utils/fetchData";

function cart() {
  const { state, dispatch } = useContext(DataContext);
  const [cart, setCart] = useState(state.cart);
  const [total, setTotal] = useState(0);
  const [callback, setCallback] = useState(false);

  const { auth } = state;

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(res);
    };

    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("__next__cart"));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`);
          const { _id, title, images, price, inStock, sold } = res.product;
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }

        dispatch({ type: ACTIONS.ADD_CART, payload: newArr });
      };

      updateCart();
    }
  }, [callback]);

  if (cart.length === 0)
    return (
      <div className="container text-center mx-auto">
        <h1 className="my-3" style={{ color: "#6c757d" }}>
          CART IS EMPTY
        </h1>
        <img
          className="img-responsive w-100"
          src="https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/Flagship_100_Blog_2880x1800_Apparel.jpg"
          alt="not empty"
        />
      </div>
    );

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <h3 style={{ color: "#6c757d" }} className="py-4">
            SHOPPING CART
          </h3>
          <div className="">
            {cart &&
              cart.map((item, key) => (
                <Card key={key} item={item} dispatch={dispatch} cart={cart} />
              ))}
          </div>
        </div>
        <div className="col-lg-4 float-end">
          <h3 style={{ color: "#6c757d" }} className="pt-4 pb-3 text-end">
            SHIPPING
          </h3>
          <form className="text-end mx-auto">
            <div className="col-md-12 text-end mb-3">
              <label
                style={{ color: "#6c757d" }}
                className="form-label text-end"
              >
                ADDRESS
              </label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="Your Address"
              />
            </div>
            <div className="col-md-12 text-end mb-3">
              <label
                style={{ color: "#6c757d" }}
                className="form-label text-end"
              >
                MOBILE
              </label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="Your Mobile"
              />
            </div>
            <h4 style={{ color: "#6c757d" }} className="mb-3 text-end">
              TOTAL:{" "}
              <span className="text-danger">
                <span className="fw-bold fs-3">৳ </span>
                {total}
              </span>
            </h4>
            <Link href={auth.user ? "!#" : "/signin"}>
              <a className="btn btn-dark mb-5 px-3">PROCEED WITH PAYMENT</a>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default cart;
