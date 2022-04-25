import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Pages/About/About";
import Home from "./Pages/Home/Home/Home";
import Header from "./Pages/Shared/Header/Header";
import Footer from "./Pages/Shared/Footer/Footer";
import ServiceDetailPage from "./Pages/ServiceDetailPage/ServiceDetailPage";
import NotFound from "./Pages/Shared/NotFound/NotFound";
import Login from "./Pages/Login/Login/Login";
import Register from "./Pages/Login/Register/Register";
import RequireAuth from "./Pages/Login/RequireAuth/RequireAuth";
import CheckOut from "./Pages/CheckOut/CheckOut";
import AddService from "./Pages/Home/AddService/AddService";
import ManageServices from "./Pages/ManageServices/ManageServices";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Order from "./Pages/Order/Order";

function App() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div data-aos="fade-in">
      <Header></Header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route
            path="/service/:serviceId"
            element={<ServiceDetailPage></ServiceDetailPage>}
          ></Route>
          <Route
            path="/checkout/:serviceId"
            element={
              <RequireAuth>
                <CheckOut></CheckOut>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/addservice"
            element={
              <RequireAuth>
                <AddService></AddService>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/manage"
            element={
              <RequireAuth>
                <ManageServices></ManageServices>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <Order></Order>
              </RequireAuth>
            }
          ></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default App;
