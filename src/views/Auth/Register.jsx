import SocialLogin from "@/components/auth/SocialLogin";
import InputField from "@/components/common/InputField";
import { THEME } from "@/constants/config";
import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  return (
    <div className="text-center animate-in fade-in duration-500">
      <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
        Create Account
      </h2>
      <p className="text-gray-500 mb-8 font-medium">
        Let's set up your parent dashboard.
      </p>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/verify-email", {
            state: { email: email || "parent@example.com" },
          });
        }}
      >
        <InputField placeholder="Full Name" type="text" icon={User} required />
        <InputField
          placeholder="Email Address"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          placeholder="Password"
          type="password"
          icon={Lock}
          required
        />
        <button
          type="submit"
          className={`w-full mt-4 ${THEME.primaryYellow} ${THEME.textBlack} font-bold py-4 px-4 rounded-full ${THEME.primaryYellowHover} transition-colors text-lg flex justify-center items-center gap-2`}
        >
          Sign up
        </button>
        <SocialLogin />
      </form>
      <div className="mt-8 text-sm font-semibold text-gray-500">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-black underline decoration-2 underline-offset-4 hover:text-[#FFC82C] transition-colors"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Register;
