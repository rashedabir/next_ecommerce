import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import ACTIONS from "../store/Actions";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function signin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(DataContext);

  const { auth, notify } = state;

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userName: userName,
      password: password,
    };
    dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } });
    const res = await postData("auth/login", data);
    if (res.err) {
      toast.error(res.err);
      return dispatch({ type: ACTIONS.NOTIFY, payload: { error: res.err } });
    }
    dispatch({ type: ACTIONS.NOTIFY, payload: { success: res.msg } });

    dispatch({
      type: ACTIONS.AUTH,
      payload: { token: res.access_token, user: res.user },
    });

    Cookies.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });
    localStorage.setItem("login", true);
    toast.success(res.msg);
  };

  if (notify.loading) {
    return <Loading />;
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  return (
    <div className="container">
      <Head>
        <title>Login Page</title>
      </Head>
      <div className="my-5 px-1 mx-auto" style={{ maxWidth: "450px" }}>
        <form
          className="border p-3 shadow-sm bg-body rounded"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center py-5">Login</h2>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                setUserName(e.target.value),
                  dispatch({ type: ACTIONS.NOTIFY, payload: {} });
              }}
              value={userName}
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
                setPassword(e.target.value),
                  dispatch({ type: ACTIONS.NOTIFY, payload: {} });
              }}
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
