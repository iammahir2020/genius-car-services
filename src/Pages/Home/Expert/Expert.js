import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Expert = ({ expert }) => {
  const { name, img } = expert;
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div data-aos="slide-up" className=" g-5 col-sm-12 col-smd-6 col-lg-4">
      <div className="card" style={{ width: "18rem" }}>
        <img src={img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
};

export default Expert;
