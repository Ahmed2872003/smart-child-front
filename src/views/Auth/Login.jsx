import SocialLogin from "@/components/auth/SocialLogin";
import InputField from "@/components/common/InputField";
import { THEME } from "@/constants/config";
import { useAppContext } from "@/context/AppContext";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setParentData } = useAppContext();

  const handleLogin = (e) => {
    e.preventDefault();
    setParentData({ name: "Parent", email: "parent@smartchild.app" });
    navigate("/parent-dashboard");
  };

  return (
    <div className="text-center animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
        Log in
      </h2>
      <div className="text-sm text-gray-600 mb-8 font-medium">
        New here?{" "}
        <button
          onClick={() => navigate("/register")}
          className="font-bold text-black underline decoration-gray-300 decoration-2 underline-offset-4 hover:decoration-[#FFC82C]"
        >
          Create an account
        </button>
      </div>
      <form className="space-y-3" onSubmit={handleLogin}>
        <InputField
          type="email"
          placeholder="Email"
          icon={Mail}
          actionLabel="Forget password?"
          onAction={() => navigate("/forgot-password")}
        />
        <InputField type="password" placeholder="Password" icon={Lock} />
        <button
          type="submit"
          className={`w-full mt-4 ${THEME.primaryYellow} ${THEME.textBlack} font-bold py-4 px-4 rounded-full ${THEME.primaryYellowHover} transition-colors text-lg`}
        >
          Log in
        </button>
        <SocialLogin />
      </form>
    </div>
  );
};

export default Login;
