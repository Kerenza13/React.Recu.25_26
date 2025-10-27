import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Header />
        <Login />
        <Footer />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Header />
        <Dashboard />
        <Footer />
      </ProtectedRoute>
    ),
  },
]);
