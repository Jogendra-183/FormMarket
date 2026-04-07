import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import OTPLogin from "./pages/OTPLogin";

const lazyPage = (importer, exportName) =>
  lazy(() => importer().then((module) => ({ default: module[exportName] })));

const HomePage = lazyPage(() => import("./pages/HomePage"), "HomePage");
const Landing = lazyPage(() => import("./pages/Landing"), "Landing");
const Login = lazyPage(() => import("./pages/Login"), "Login");
// OTPLogin imported directly above
const Register = lazyPage(() => import("./pages/Register"), "Register");
const FarmerDashboard = lazyPage(() => import("./pages/farmer/Dashboard"), "FarmerDashboard");
const FarmerProducts = lazyPage(() => import("./pages/farmer/Products"), "FarmerProducts");
const FarmerOrders = lazyPage(() => import("./pages/farmer/Orders"), "FarmerOrders");
const FarmerAnalytics = lazyPage(() => import("./pages/farmer/Analytics"), "FarmerAnalytics");
const FarmerLearning = lazyPage(() => import("./pages/farmer/Learning"), "FarmerLearning");
const FarmerNotifications = lazyPage(() => import("./pages/farmer/Notifications"), "Notifications");
const FarmerProfile = lazyPage(() => import("./pages/farmer/Profile"), "default");
const FarmerAccount = lazyPage(() => import("./pages/farmer/Account"), "default");
const FarmerPreferences = lazyPage(() => import("./pages/farmer/Preferences"), "default");
const FarmerNotificationSettings = lazyPage(() => import("./pages/farmer/NotificationSettings"), "default");
const FarmerPrivacy = lazyPage(() => import("./pages/farmer/Privacy"), "default");
const FarmerHelp = lazyPage(() => import("./pages/farmer/Help"), "default");
const About = lazyPage(() => import("./pages/About"), "About");
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
const PublicInfoPage = lazyPage(() => import("./pages/PublicInfo"), "PublicInfoPage");
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/old-landing",
    element: <Landing />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/otp-login",
    element: <OTPLogin />
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
    path: "/farmer/profile",
    element: <FarmerProfile />
  },
  {
    path: "/farmer/account",
    element: <FarmerAccount />
  },
  {
    path: "/farmer/preferences",
    element: <FarmerPreferences />
  },
  {
    path: "/farmer/notifications-settings",
    element: <FarmerNotificationSettings />
  },
  {
    path: "/farmer/privacy",
    element: <FarmerPrivacy />
  },
  {
    path: "/farmer/help",
    element: <FarmerHelp />
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
    path: "/buyer/profile",
    element: <FarmerProfile />
  },
  {
    path: "/buyer/account",
    element: <FarmerAccount />
  },
  {
    path: "/buyer/preferences",
    element: <FarmerPreferences />
  },
  {
    path: "/buyer/notifications-settings",
    element: <FarmerNotificationSettings />
  },
  {
    path: "/buyer/privacy",
    element: <FarmerPrivacy />
  },
  {
    path: "/buyer/help",
    element: <FarmerHelp />
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
    path: "/admin/profile",
    element: <FarmerProfile />
  },
  {
    path: "/admin/account",
    element: <FarmerAccount />
  },
  {
    path: "/admin/preferences",
    element: <FarmerPreferences />
  },
  {
    path: "/admin/notifications-settings",
    element: <FarmerNotificationSettings />
  },
  {
    path: "/admin/privacy",
    element: <FarmerPrivacy />
  },
  {
    path: "/admin/help",
    element: <FarmerHelp />
  },
  {
    path: "/community",
    element: <Community />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/pricing",
    element: <PublicInfoPage page="pricing" />
  },
  {
    path: "/careers",
    element: <PublicInfoPage page="careers" />
  },
  {
    path: "/press",
    element: <PublicInfoPage page="press" />
  },
  {
    path: "/contact",
    element: <PublicInfoPage page="contact" />
  },
  {
    path: "/help",
    element: <PublicInfoPage page="help" />
  },
  {
    path: "/faqs",
    element: <PublicInfoPage page="faqs" />
  },
  {
    path: "/terms",
    element: <PublicInfoPage page="terms" />
  },
  {
    path: "/privacy",
    element: <PublicInfoPage page="privacy" />
  },
  {
    path: "/cookies",
    element: <PublicInfoPage page="cookies" />
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);
export {
  router
};
