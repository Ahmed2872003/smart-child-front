import { ASSETS } from "@/assets";
import authService from "@/services/authService";
import { LogOut } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const ParentDashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#FFFDF8]  flex items-center justify-between  top-0  px-6 md:px-12 py-6 max-w-7xl mx-auto sticky z-50">
      <img className="w-16 " src={ASSETS.logo} alt="smart-child-logo" />
      <div className="flex items-center gap-5">
        <button
          onClick={() => navigate("/")}
          className="text-gray-500 hover:text-gray-900 transition-colors font-bold text-sm hidden sm:block"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/parent-dashboard")}
          className="text-gray-900 font-bold text-sm hidden sm:block"
        >
          Dashboard
        </button>
        <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
        <Link
          to="/parent-profile"
          className="relative inline-block transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 rounded-full"
        >
          <img
            src={ASSETS.avatars.parent}
            className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            alt="Parent Profile"
          />
          <span className="absolute inset-0 rounded-full hover:bg-black/5 transition-colors"></span>
        </Link>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={authService.logout}
        >
          <LogOut
            size={18}
            className="text-gray-400 hover:text-black transition-colors"
          />
        </div>
      </div>
    </header>
  );
};

export { ParentDashboardHeader };
