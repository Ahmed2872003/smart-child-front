import InputField from "@/components/common/InputField";
import { THEME } from "@/constants/config";
import { Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    navigate("/login");
  };

  return (
    <div className="text-center animate-in fade-in duration-500">
      <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <Lock size={32} />
      </div>
      <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
        Create New Password
      </h2>
      <p className="text-gray-500 mb-8 font-medium">
        Please enter your new password below.
      </p>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <InputField
          type="password"
          placeholder="New Password"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <InputField
          type="password"
          placeholder="Re-enter Password"
          icon={Lock}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isSubmitting}
        />
        {error && (
          <p className="text-red-500 text-sm font-bold text-left px-4 -mt-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-4 ${THEME.primaryYellow} ${THEME.textBlack} font-bold py-4 px-4 rounded-full ${isSubmitting ? "opacity-70 cursor-not-allowed" : THEME.primaryYellowHover} transition-colors text-lg flex justify-center items-center gap-2`}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          ) : null}
          {isSubmitting ? "Saving..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
