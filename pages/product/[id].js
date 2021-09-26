import Head from "next/head";
import { useState } from "react";
import { getData } from "../../utils/fetchData";

const DetailProduct = (props) => {
  const [product] = useState(props.product);

  return (
    <div className="container py-3">
      <Head>
        <title>Detail Product</title>
      </Head>
      <div className="row">
        <div className="col-lg-6 my-2">
          <div className="p-2">
            <img
              width="100%"
              src={product.images[0].url}
              alt={product.title}
              className="img-thumbnail"
            />
          </div>
        </div>
        <div className="col-lg-6 my-2">
          <div className="px-2">
            <h2 className="text-uppercase">{product.title}</h2>
            <h4 className="text-danger">
              <span style={{ fontSize: "30px" }} className="fw-bold">
                ৳
              </span>{" "}
              {product.price}
            </h4>
            <div className="text-danger d-flex justify-content-between">
              <h6>In Stock: {product.inStock}</h6>
              <h6>Sold: {product.sold}</h6>
            </div>
            <h6 className="py-3">{product.description}</h6>
            <button
              className="btn btn-dark text-uppercase px-5 py-2"
              disabled={product.inStock === 0}
            >
              buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);

  return {
    props: {
      product: res.product,
    },
  };
}
