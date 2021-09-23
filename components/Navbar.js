import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import ACTIONS from "../store/Actions";
import { DataContext } from "../store/GlobalState";
import Loading from "./Loading";

function Navbar() {
  const { state, dispatch } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const { auth } = state;
  const router = useRouter();

  const isActive = (r) => {
    if (r === router.pathname) {
      return " active fw-bold";
    } else {
      return "";
    }
  };

  const handleLogout = () => {
    setLoading(true);
    Cookies.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("login");
    dispatch({ type: ACTIONS.AUTH, payload: {} });
    dispatch({ type: ACTIONS.NOTIFY, payload: { success: "Logged Out" } });
    toast.success("Logged Out!");
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown align-items-center">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ textTransform: "capitalize", fontSize: "17px" }}
        >
          <img
            src={auth && auth.user.avatar}
            alt={auth && auth.user.fullName}
            width="25px"
            className="rounded-circle border me-1 border-dark"
            style={{ objectFit: "cover" }}
          />
          {auth && auth.user.userName}
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <li style={{ cursor: "pointer" }}>
            <Link href="/profile">
              <a className="dropdown-item">Profile</a>
            </Link>
          </li>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <a className="dropdown-item">Logout</a>
          </li>
        </ul>
      </li>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" href="/">
          <h4 style={{ cursor: "pointer", fontSize: "25px" }}>Navbar</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-3">
              <Link href="/cart">
                <a
                  className={"nav-link" + isActive("/cart")}
                  aria-current="page"
                  style={{ textTransform: "capitalize", fontSize: "17px" }}
                >
                  <i
                    className="fas fa-shopping-cart me-1"
                    style={{ fontSize: "20px" }}
                  ></i>
                  Cart
                </a>
              </Link>
            </li>
            {Object.keys(auth).length === 0 ? (
              <li className="nav-item">
                <Link href="/signin">
                  <a
                    className={"nav-link" + isActive("/signin")}
                    aria-current="page"
                    style={{ textTransform: "capitalize", fontSize: "17px" }}
                  >
                    <i
                      className="fas fa-user me-1"
                      style={{ fontSize: "20px" }}
                    ></i>
                    Sign in
                  </a>
                </Link>
              </li>
            ) : (
              loggedRouter()
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
