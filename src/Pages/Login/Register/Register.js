import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Register.css";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const [agree, setAgree] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  // const [sendEmailVerification, sending, error1] =
  //   useSendEmailVerification(auth);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  let errorElement;

  if (error || updateError) {
    errorElement = (
      <p className="text-danger">
        {error?.message}
        {updateError?.message}
      </p>
    );
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    // const agree = event.target.terms.checked;
    // if (agree) {
    //   createUserWithEmailAndPassword(email, password);
    // }
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    console.log("profile updated");
    navigate(from, { replace: true });
  };

  if (user) {
    console.log("user", user);
  }

  return (
    <div className="register-form">
      <h2 style={{ textAlign: "center" }}>Please Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" id="name" placeholder="Name" />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
        <input
          onClick={() => setAgree(!agree)}
          type="checkbox"
          name="terms"
          id="terms"
        />
        {/* <label className={agree ? "" : "text-danger"} htmlFor="terms">
          Accept Terms and Conditions
        </label> */}
        <label className={`ps-2 ${agree ? "" : "text-danger"}`} htmlFor="terms">
          Accept Terms and Conditions
        </label>
        {/* <input
          className={`w-50 mx-auto btn btn-primary my-2 ${
            agree ? "" : "disabled"
          }`}
          type="submit"
          value="Register"
        /> */}
        <input
          disabled={!agree}
          className="w-50 mx-auto btn btn-primary my-2"
          type="submit"
          value="Register"
        />
      </form>
      {errorElement}

      <p>
        Already have an account?{" "}
        <Link className="text-primary text-decoration-none" to="/login">
          Please Login
        </Link>{" "}
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
