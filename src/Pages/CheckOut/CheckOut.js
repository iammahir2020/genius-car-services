import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useServiceDetail from "../../hooks/useServiceDetail";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";
import { toast } from "react-toastify";

const CheckOut = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetail(serviceId);
  const [user] = useAuthState(auth);

  // const [user, setUser] = useState({
  //   name: "Akbar",
  //   email: "akbar@gmail.com",
  //   address: "tajmohol ka pas",
  //   phone: "01711111111",
  // });

  // const handleAddressChange = (event) => {
  //   const { address, ...rest } = user;
  //   const newAddress = event.target.value;
  //   const newUser = { address: newAddress, ...rest };
  //   setUser(newUser);
  // };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const order = {
      email: user.email,
      service: service.name,
      serviceID: serviceId,
      address: event.target.address.value,
      phone: event.target.phone.value,
    };
    axios
      .post("https://evening-peak-08998.herokuapp.com/order", order)
      .then((res) => {
        const { data } = res;
        if (data.insertedId) {
          toast("Your Order is booked!");
          event.target.reset();
        }
      });
  };

  return (
    <div className="w-50 mx-auto">
      <h1>Please Order: {service.name} </h1>
      <form onSubmit={handlePlaceOrder}>
        <input
          className="w-100 mb-2"
          type="text"
          name="name"
          value={user?.displayName}
          id=""
          placeholder="Name"
          required
          disabled
        />{" "}
        <br />
        <input
          className="w-100 mb-2"
          type="email"
          name="email"
          value={user?.email}
          id=""
          placeholder="Email"
          required
          disabled
        />{" "}
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="service"
          value={service.name}
          id=""
          placeholder="Service"
          required
          readOnly
        />{" "}
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="address"
          id=""
          placeholder="Address"
          autoComplete="off"
          required
        />{" "}
        <br />
        <input
          className="w-100 mb-2"
          type="number"
          name="phone"
          id=""
          placeholder="Phone"
          required
        />{" "}
        <br />
        <input className="btn btn-primary" type="submit" value="Place Order" />
      </form>
    </div>
  );
};

export default CheckOut;
