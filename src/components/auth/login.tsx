import { authPostRequestOptions } from "../../common/cookie";
import Loader from "../../common/loader";
import { useState } from "react";
import axios from "axios";
function Login() {
  let [requestStatus, setRequestStatus] = useState(false);
  let [authStatus, setAuthStatus] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  async function handleSubmit(event: any) {
    setRequestStatus(true);
    let formData = { email: email, password: password };
    try {
      let auth: any = await axios.post(
        "https://api.powerworkplace.com/api:jPikx0Y1/auth/login",
        formData,
        authPostRequestOptions
      );
      if (auth.status == 200) {
        localStorage.setItem("token", auth.data.authToken);
        window.location.href = "/";
      } else {
        setAuthStatus(auth.data.message);
      }
    } catch (error: any) {
      console.log(error)
      setAuthStatus(error.response.data.message);
    }

    setRequestStatus(false);
  }
  function OnChangeEmail(event: any) {
    setEmail(event.target.value);
  }
  function onChangePassword(event: any) {
    setPassword(event.target.value);
  }

  if (requestStatus) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="container mt-5">
        <h1>Century Tower Admin Login</h1>
      </div>

      <div className="row">
        <form className="col-10 login-card container mt-5" id="loginForm">
          <div>
            <h4>
              <b>Email</b>
            </h4>
            <input
              type="email"
              className="formTextInput"
              title="email"
              name="email"
              value={email}
              onChange={(event) => OnChangeEmail(event)}
            />
          </div>
          <div>
            <h4>
              <b>Password</b>
            </h4>
            <input
              type="password"
              className="formTextInput"
              title="password"
              name="password"
              value={password}
              onChange={(event) => onChangePassword(event)}
            />
          </div>
          {authStatus && <h4 className="error">{authStatus}</h4>}
          <button
            type="button"
            onClick={(event) => handleSubmit(event)}
            className="btn upload-btn"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
