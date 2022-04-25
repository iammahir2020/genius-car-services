import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useServiceDetail from "../../hooks/useServiceDetail";

const ServiceDetailPage = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const [service] = useServiceDetail(serviceId);

  const goTocheckOut = (serviceId) => {
    navigate(`/checkout/${serviceId}`);
  };
  return (
    <div>
      <div className="text-center">
        <h2>You are about to book: {service.name}</h2>
        <Button variant="primary" onClick={() => goTocheckOut(serviceId)}>
          GO TO CHECKOUT
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
