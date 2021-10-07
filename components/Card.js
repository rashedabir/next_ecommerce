import { ACTIONS, decrease, increase } from "../store/Actions";

function Card({ item, cart, dispatch }) {
  return (
    <div className="card border-end-0 border-start-0 py-2">
      <div className="d-flex justify-content-between align-items-center">
        <div className="img_conent d-flex align-items-center">
          <img
            className="img-thumbnail ms-3"
            src={item.images[0].url}
            alt={item.title}
            width="60px"
          />
          <div className="mx-3">
            <h4
              style={{ color: "#6c757d" }}
              className="m-0 p-0 text-capitalize"
            >
              {item.title}
            </h4>
            <p className="text-danger m-0 fw-bold">
              <span className="fs-3">৳</span> {item.price * item.quantity}
            </p>
            {item.inStock > 0 ? (
              <p className="text-danger m-0 fw-bold">inStock: {item.inStock}</p>
            ) : (
              <p className="text-danger m-0 fw-bold">
                outStock: {item.inStock}
              </p>
            )}
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="action d-flex align-items-center px-3">
            <button
              className="btn btn-outline-dark px-3"
              onClick={() => {
                dispatch(decrease(cart, item._id));
              }}
              disabled={item.quantity === 1 ? true : false}
            >
              -
            </button>
            <p className="px-3 pt-2 fs-5">{item.quantity}</p>
            <button
              className="btn btn-outline-dark px-3"
              onClick={() => {
                dispatch(increase(cart, item._id));
              }}
              disabled={item.inStock ? false : true}
            >
              +
            </button>
          </div>
          <i
            className="far fa-trash-alt text-danger"
            aria-hidden="true"
            style={{ fontSize: "18px", cursor: "pointer" }}
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() =>
              dispatch({
                type: ACTIONS.ADD_MODAL,
                payload: [
                  {
                    data: cart,
                    id: item._id,
                    title: item.title,
                    type: ACTIONS.ADD_CART,
                  },
                ],
              })
            }
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Card;
