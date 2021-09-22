import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  const isActive = (r) => {
    if (r === router.pathname) {
      return " active fw-bold";
    } else {
      return "";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" href="/">
          <h4 style={{ cursor: "pointer" }}>Navbar</h4>
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
            <li className="nav-item">
              <Link href="/cart">
                <a
                  className={"nav-link" + isActive("/cart")}
                  aria-current="page"
                >
                  <i className="fas fa-shopping-cart me-1"></i>Cart
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/signin">
                <a
                  className={"nav-link" + isActive("/signin")}
                  aria-current="page"
                >
                  <i className="fas fa-user me-1"></i>Sign in
                </a>
              </Link>
            </li>
            <li className="nav-item dropdown align-items-center">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user-circle me-1"></i>Dropdown link
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link href="/profile">
                    <a className="dropdown-item">Profile</a>
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
