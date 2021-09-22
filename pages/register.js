import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

function register() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const valid = (data) => {
    const { fullName, userName, password, rePassword } = data;
    if (!fullName || !userName || !password || !rePassword) {
      return "Invalid Credentials.";
    }
    if (password.length < 4) {
      return "Password Must be 4 Lengths Long.";
    }
    if (password !== rePassword) {
      return "Password Doesn't Match";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      fullName: fullName,
      userName: userName,
      password: password,
      rePassword: rePassword,
    };
    const err = valid(data);
    if (err) {
      toast.error(err);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Register Page</title>
      </Head>
      <div className="my-5 px-1 mx-auto" style={{ maxWidth: "450px" }}>
        <form
          className="border p-3 shadow-sm bg-body rounded"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center py-5">Register</h2>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
            <label htmlFor="floatingInput">Full Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              value={userName}
              placeholder="name@example.com"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={rePassword}
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
            />
            <label htmlFor="floatingPassword">Repeat Password</label>
          </div>
          <button
            type="submit"
            className="btn btn-dark w-100 py-2 mb-3 text-uppercase"
          >
            sign up
          </button>
          <p>
            Already have an account?{" "}
            <Link href="/signin">
              <a className="text-danger">Login Now</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default register;
