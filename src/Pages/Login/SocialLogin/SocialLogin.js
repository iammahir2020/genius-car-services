import React from "react";
import "./SocialLogin.css";
import {
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  let errorElement;
  if (error || error1) {
    errorElement = (
      <p className="text-danger">
        {error?.message}
        {error1?.message}
      </p>
    );
  }

  if (loading || loading1) {
    return (
      <div className="w-100 d-flex align-items-center justify-content-center gap-3">
        <Spinner animation="grow" />
        <Spinner animation="grow" />
        <Spinner animation="grow" />
        <Spinner animation="grow" />
        <Spinner animation="grow" />
      </div>
    );
  }

  if (user || user1) {
    navigate(from, { replace: true });
  }

  return (
    <div>
      <div className="d-flex align-items-center">
        <div style={{ height: "1px" }} className="bg-primary w-50"></div>
        <p className="mt-2 px-2">or</p>
        <div style={{ height: "1px" }} className="bg-primary w-50"></div>
      </div>
      {errorElement}
      <div>
        <button
          onClick={() => signInWithGoogle()}
          className="btn btn-light w-100 border mb-2"
        >
          <img
            style={{ height: "40px" }}
            className="me-3"
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
            alt=""
          />
          Google Sign In
        </button>
        <button className="btn btn-light w-100 border mb-2">
          <img
            style={{ height: "30px" }}
            className="me-3"
            src="https://www.pngmart.com/files/15/Circle-Facebook-Logo-PNG-Pic.png"
            alt=""
          />
          Facebook Sign In
        </button>
        <button
          onClick={() => signInWithGithub()}
          className="btn btn-light w-100 border mb-2"
        >
          <img
            style={{ height: "40px" }}
            className="me-3"
            src="https://pngimg.com/uploads/github/github_PNG40.png"
            alt=""
          />
          Github Sign In
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
