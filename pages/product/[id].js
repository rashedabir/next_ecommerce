import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { getData } from "../../utils/fetchData";

const DetailProduct = (props) => {
  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);
  const imgRef = useRef();

  useEffect(() => {
    const images = imgRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace(
        "active",
        "img-thumbnail me-2 px-1"
      );
    }
    images[tab].className = "img-thumbnail me-2 px-1 active";
  }, [tab]);

  return (
    <div className="container py-3 detail_product">
      <Head>
        <title>Detail Product</title>
      </Head>
      <div className="row">
        <div className="col-lg-6 my-2">
          <div className="p-2">
            <img
              style={{ height: "400px", width: "100%", objectFit: "cover" }}
              src={product.images[tab].url}
              alt={product.title}
              className="mb-2"
            />
            <div className="row mx-0 my-2" ref={imgRef}>
              {product &&
                product.images.map((img, index) => (
                  <img
                    style={{
                      height: "80px",
                      width: "22%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    className="img-thumbnail me-2 px-1 mb-2"
                    key={index}
                    src={img.url}
                    alt=""
                    onClick={() => {
                      setTab(index);
                    }}
                  />
                ))}
            </div>
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
              {product.inStock > 0 ? (
                <h6>In Stock: {product.inStock}</h6>
              ) : (
                <h6>Out Stock</h6>
              )}
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
