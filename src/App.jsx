import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Order } from "./Pages/Order/Order";
import { Cart } from "./Pages/Cart/Cart";
import { Dashboard } from "./Pages/Admin/Dashboard/Dashboard";
import { NoPage } from "./Pages/Admin/NoPage/NoPage";
import { MyState } from "./Context/Data/myState";
import { Login } from "./Pages/Registration/Login";
import { Signup } from "./Pages/Registration/Signup";
import { ProductInfo } from "./Pages/ProductInfo/ProductInfo";
import { AddProduct } from "./Pages/Admin/Pages/AddProduct";
import { UpdateProduct } from "./Pages/Admin/Pages/UpdateProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AllProducts } from "./Pages/allProduct/AllProducts";

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<AllProducts />} />

          <Route
            path="/order"
            element={
              <ProtectedRoutes>
                <Order />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <Cart />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProduct />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/updateproduct"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProduct />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
}

// user
export default App;

export const ProtectedRoutes = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

// admin
export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));

  if (admin.user.email === "sushant.ku.sh.70@gmail.com") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
