import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import LogIn from "./pages/Auth/LogIn";
import Dashboard from "./pages/Users/Dashboard";
import PrivateRoute from "./components/Routed/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routed/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import ManageUsers from "./pages/Admin/ManageUsers";
import Orders from "./pages/Users/Orders";
import Profile from "./pages/Users/Profile";
import CreateSubCategories from "./pages/Admin/CreateSubCategories";
import CreateSupSubCategory from "./pages/Admin/CreateSupSubCategory";
import CreateBrand from "./pages/Admin/CreateBrand";
import CreateColor from "./pages/Admin/CreateColor";
import CreateSize from "./pages/Admin/CreateSize";
import ProductList from "./pages/Admin/ProductList";
import OrderList from "./pages/Admin/OrderList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route
            path="admin/update-category/:id"
            element={<CreateCategory />}
          />
          <Route
            path="admin/create-sub-category"
            element={<CreateSubCategories />}
          />
          <Route
            path="admin/update-sub-category/:id"
            element={<CreateSubCategories />}
          />
          <Route
            path="admin/create-sup-sub-category"
            element={<CreateSupSubCategory />}
          />

          <Route
            path="admin/update-sup-sub-category/:id"
            element={<CreateSupSubCategory />}
          />
          <Route path="admin/create-brand" element={<CreateBrand />} />
          <Route path="admin/create-color" element={<CreateColor />} />
          <Route path="admin/create-size" element={<CreateSize />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product-list" element={<ProductList />} />
          <Route path="admin/orders" element={<OrderList />} />
          <Route path="admin/users" element={<ManageUsers />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
