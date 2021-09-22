import Head from "next/head";
import Link from "next/link";

function signin() {
  return (
    <div className="container">
      <Head>
        <title>Login Page</title>
      </Head>
      <div className="my-5 px-1 mx-auto" style={{ maxWidth: "450px" }}>
        <form className="border p-3 shadow-sm bg-body rounded">
          <h2 className="text-center py-5">Login</h2>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button
            type="submit"
            className="btn btn-dark w-100 py-2 mb-3 text-uppercase"
          >
            sign in
          </button>
          <p>
            You don't have an account?{" "}
            <Link href="/register">
              <a className="text-danger">Register Now</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default signin;
