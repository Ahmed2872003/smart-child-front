import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppContextProvider } from "./context/AppContext";

import LandingPage from "./views/LandingPage";
import ParentDashboard from "./views/Dashboards/ParentDashboard";
import ChildDashboard from "./views/Dashboards/ChildDashboard";
import FreePlayMenu from "./views/Games/InteractiveGames";
import GamifiedLoader from "./views/Games/GamifiedLoader";
import GamePlay from "./views/Games/GamePlay";
import ReportsDashboard from "./views/Dashboards/ReportsDashboard";
import AuthLayoutWrapper from "./layouts/AuthLayout";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import ForgotPassword from "./views/Auth/ForgotPassword";
import VerifyEmail from "./views/Auth/VerifyEmail";
import ResetPassword from "./views/Auth/ResetPassword";

const basename = import.meta.env.VITE_URL_BASENAME;

export default function App() {
  return (
    <AppContextProvider>
      <Router basename={basename || "/"}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/child-dashboard" element={<ChildDashboard />} />
          <Route path="/free-play" element={<FreePlayMenu />} />
          <Route path="/loading" element={<GamifiedLoader delay={2500} />} />
          <Route path="/game" element={<GamePlay />} />
          <Route path="/reports" element={<ReportsDashboard />} />

          <Route element={<AuthLayoutWrapper />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </Router>
    </AppContextProvider>
  );
}
