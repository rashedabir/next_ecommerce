import { toast } from "react-toastify";

export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
};

export const addToCart = (product, cart) => {
  if (product.inStock === 0) {
    return toast.error("This Product is Out of Stock.");
  }

  const check = cart.every((item) => {
    return item._id !== product._id;
  });

  if (!check)
    return toast.error("This Product already has been added to cart.");

  return {
    type: ACTIONS.ADD_CART,
    payload: [...cart, { ...product, quantity: 1 }],
  };
};
