function Card({ cart }) {
  return (
    <div className="card my-1">
      <div className="d-flex justify-content-between">
        <div className="img_conent d-flex align-items-center">
          <img src={cart.images[0].url} alt={cart.title} width="60px" />
          <div>
            <h4>{cart.title}</h4>
            <p>{cart.price}</p>
            <p>inStock: {cart.inStock}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
