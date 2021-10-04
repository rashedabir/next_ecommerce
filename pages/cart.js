import { useContext, useState } from "react";
import Card from "../components/Card";
import { DataContext } from "../store/GlobalState";

function cart() {
  const { state, dispatch } = useContext(DataContext);
  const [cart, setCart] = useState(state.cart);

  console.log(cart);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <h3>SHOPPING CART</h3>
          <div className="">
            {cart && cart.map((cart) => <Card cart={cart} />)}
          </div>
        </div>
        <div className="col-lg-3">
          <h3>SHIPPING</h3>
        </div>
      </div>
    </div>
  );
}

export default cart;
