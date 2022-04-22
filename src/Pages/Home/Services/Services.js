import useServices from "../../../hooks/userServices";
import Service from "../Service/Service";
import "./Services.css";

const Services = () => {
  const [services] = useServices();

  return (
    <div id="services">
      <h1 className="text-center text-primary my-5">Our Services</h1>
      <div className="services-container">
        {services.map((service) => (
          <Service key={service._id} service={service}></Service>
        ))}
      </div>
    </div>
  );
};

export default Services;
