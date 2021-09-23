import { ToastContainer } from "react-toastify";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { DataProvider } from "../store/GlobalState";

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </DataProvider>
  );
}

export default MyApp;
