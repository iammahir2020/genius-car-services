import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useSignInWithEmailAndPassword,
  useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import axios from "axios";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, error1] =
    useSendPasswordResetEmail(auth);
  let errorElement;

  if (error || error1) {
    errorElement = (
      <p className="text-danger">
        {error?.message}
        {error1?.message}
      </p>
    );
  }

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (user) {
    // navigate(from, { replace: true });
  }

  const resetPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Email Sent");
    } else {
      toast("Please enter email address");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await signInWithEmailAndPassword(email, password);
    const { data } = await axios.post(
      "https://evening-peak-08998.herokuapp.com/login",
      { email }
    );
    localStorage.setItem("accessToken", data.accessToken);
    navigate(from, { replace: true });
  };

  return (
    <div className="container w-50 mx-auto">
      <PageTitle title="Login"></PageTitle>
      <h2 className="text-primary text-center mt-5">Please login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter Email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Button variant="primary w-50 mx-auto d-block mb-2" type="submit">
          Login
        </Button>
      </Form>
      {errorElement}

      <p>
        New to Genius Car?{" "}
        <Link className="text-primary text-decoration-none" to="/register">
          Please Register
        </Link>{" "}
      </p>
      <p>
        Forget Password?{" "}
        <button
          className="btn btn-link text-praimary text-decoration-none"
          onClick={resetPassword}
        >
          Reset Password
        </button>{" "}
      </p>

      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
