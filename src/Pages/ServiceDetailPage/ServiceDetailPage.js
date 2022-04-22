import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const ServiceDetailPage = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const [service, setService] = useState({});

  useEffect(() => {
    const url = `http://localhost:5000/service/${serviceId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, []);

  const goTocheckOut = () => {
    navigate("/checkout");
  };
  return (
    <div>
      <div className="text-center">
        <h2>You are about to book: {service.name}</h2>
        <Button variant="primary" onClick={goTocheckOut}>
          GO TO CHECKOUT
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
