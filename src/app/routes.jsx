import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

const lazyPage = (importer, exportName) =>
  lazy(() => importer().then((module) => ({ default: module[exportName] })));

const Landing = lazyPage(() => import("./pages/Landing"), "Landing");
const Login = lazyPage(() => import("./pages/Login"), "Login");
const Register = lazyPage(() => import("./pages/Register"), "Register");
const FarmerDashboard = lazyPage(() => import("./pages/farmer/Dashboard"), "FarmerDashboard");
const FarmerProducts = lazyPage(() => import("./pages/farmer/Products"), "FarmerProducts");
const FarmerOrders = lazyPage(() => import("./pages/farmer/Orders"), "FarmerOrders");
const FarmerAnalytics = lazyPage(() => import("./pages/farmer/Analytics"), "FarmerAnalytics");
const FarmerLearning = lazyPage(() => import("./pages/farmer/Learning"), "FarmerLearning");
const FarmerNotifications = lazyPage(() => import("./pages/farmer/Notifications"), "Notifications");
const BuyerBrowse = lazyPage(() => import("./pages/buyer/Browse"), "BuyerBrowse");
const BuyerCart = lazyPage(() => import("./pages/buyer/Cart"), "BuyerCart");
const BuyerOrders = lazyPage(() => import("./pages/buyer/Orders"), "BuyerOrders");
const BuyerSubscription = lazyPage(() => import("./pages/buyer/Subscription"), "BuyerSubscription");
const BuyerNotifications = lazyPage(() => import("./pages/buyer/Notifications"), "Notifications");
const AdminDashboard = lazyPage(() => import("./pages/admin/Dashboard"), "AdminDashboard");
const AdminUsers = lazyPage(() => import("./pages/admin/Users"), "AdminUsers");
const AdminProducts = lazyPage(() => import("./pages/admin/Products"), "AdminProducts");
const AdminAnalytics = lazyPage(() => import("./pages/admin/Analytics"), "AdminAnalytics");
const AdminContent = lazyPage(() => import("./pages/admin/Content"), "AdminContent");
const AdminNotifications = lazyPage(() => import("./pages/admin/Notifications"), "Notifications");
const Community = lazyPage(() => import("./pages/Community"), "Community");
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/farmer/dashboard",
    element: <FarmerDashboard />
  },
  {
    path: "/farmer/products",
    element: <FarmerProducts />
  },
  {
    path: "/farmer/orders",
    element: <FarmerOrders />
  },
  {
    path: "/farmer/analytics",
    element: <FarmerAnalytics />
  },
  {
    path: "/farmer/learning",
    element: <FarmerLearning />
  },
  {
    path: "/farmer/notifications",
    element: <FarmerNotifications />
  },
  {
    path: "/buyer/browse",
    element: <BuyerBrowse />
  },
  {
    path: "/buyer/cart",
    element: <BuyerCart />
  },
  {
    path: "/buyer/orders",
    element: <BuyerOrders />
  },
  {
    path: "/buyer/subscription",
    element: <BuyerSubscription />
  },
  {
    path: "/buyer/notifications",
    element: <BuyerNotifications />
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />
  },
  {
    path: "/admin/users",
    element: <AdminUsers />
  },
  {
    path: "/admin/products",
    element: <AdminProducts />
  },
  {
    path: "/admin/analytics",
    element: <AdminAnalytics />
  },
  {
    path: "/admin/content",
    element: <AdminContent />
  },
  {
    path: "/admin/notifications",
    element: <AdminNotifications />
  },
  {
    path: "/community",
    element: <Community />
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);
export {
  router
};
