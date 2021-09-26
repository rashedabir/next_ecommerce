import { useState } from "react";
import ProductItem from "../components/ProductItem";
import { getData } from "../utils/fetchData";

const Home = (props) => {
  const [products, setProducts] = useState(props.products);

  return (
    <div className="products container mx-auto px-0">
      {products.length === 0 ? (
        <h1>No Products</h1>
      ) : (
        products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const res = await getData("product");

  return {
    props: {
      products: res.products,
      status: res.status,
    },
  };
}
