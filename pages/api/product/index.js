import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";

connectDB();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      await getProducts(req, res);
      break;
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json({
      status: "success",
      result: products.length,
      products: products,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
