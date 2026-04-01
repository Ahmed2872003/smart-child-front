import "./App.css";

import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";

import { AppContextProvider, useAppContext } from "./context/AppContext";

import {
  User,
  Lock,
  Mail,
  Calendar,
  ChevronRight,
  Smile,
  Shield,
  ArrowLeft,
  Image as ImageIcon,
  Play,
  BarChart2,
  MessageCircle,
  LogOut,
  Star,
  Puzzle,
  Heart,
  Sun,
  Sparkles,
  Palette,
  Eye,
  Hand,
  Brain,
  Ear,
  X,
  Link as LinkIcon,
  Upload,
  Plus,
  Timer,
  Trophy,
  RotateCcw,
  Circle,
  Square,
  Triangle,
  Bug,
  Volume2,
  PenTool,
  Trash2,
  Save,
  Eraser,
  Download,
  Printer,
  FileText,
  TrendingUp,
  Activity,
} from "lucide-react";

import { THEME, IS_DEV } from "./constants/config";

import {
  ASSETS,
  PREDEFINED_AVATARS,
  SOUNDS,
  playSound,
  HEARING_ITEMS,
} from "./assets/index";

import { FacebookIcon, InstagramIcon } from "./components/common/BrandIcons";

// ============================================================================
// FILE: src/constants/mockData.js
// ============================================================================
const MOCK_REPORTS_DATA = {
  memory: {
    title: "Memory Match",
    icon: Brain,
    color: "bg-[#86D293]",
    textColor: "text-[#86D293]",
    history: [
      { ar: 40, arl: 4.5 },
      { ar: 55, arl: 3.8 },
      { ar: 60, arl: 3.0 },
      { ar: 80, arl: 2.2 },
      { ar: 95, arl: 1.2 },
    ],
    insight:
      "Watch the orange dotted line! If it goes down while the green accuracy line stays high, it means the child is getting faster and remembering pairs automatically.",
    metrics: { Accuracy: "95.0%", "Average Speed": "1.2s", "Pairs Found": 8 },
  },
  reaction: {
    title: "Reaction Speed",
    icon: Hand,
    color: "bg-[#ff5e5e]",
    textColor: "text-[#ff5e5e]",
    history: [
      { pi: 40, mrt: 1800 },
      { pi: 55, mrt: 1500 },
      { pi: 60, mrt: 1200 },
      { pi: 75, mrt: 900 },
      { pi: 88, mrt: 640 },
    ],
    insight:
      "A downward red line is great—it means the child is reacting faster! The blue bars show accuracy, helping us see if they are focused or just tapping randomly.",
    metrics: {
      "Hit Accuracy": "88.0%",
      "Reaction Time": "640ms",
      "Total Hits": 44,
    },
  },
  color: {
    title: "Color Recognition",
    icon: Palette,
    color: "bg-[#60A5FA]",
    textColor: "text-[#60A5FA]",
    history: [70, 75, 80, 90, 100],
    rgbProfile: { r: 85, g: 100, b: 100 },
    insight:
      "The triangle chart shows how well the child spots different colors. If it looks balanced, color vision is great! If one corner is pulled in, they might need practice with that specific color.",
    metrics: {
      "Overall Accuracy": "100%",
      "Red Recognition": "85%",
      "Green Recognition": "100%",
      "Blue Recognition": "100%",
    },
  },
  hearing: {
    title: "Hearing Test",
    icon: Ear,
    color: "bg-[#a78bfa]",
    textColor: "text-[#a78bfa]",
    history: [
      { isr: 60, aarl: 3.5 },
      { isr: 65, aarl: 2.8 },
      { isr: 80, aarl: 2.0 },
      { isr: 85, aarl: 1.5 },
      { isr: 90, aarl: 0.8 },
    ],
    insight:
      "Kids often get the sounds right easily. The grey bars are the real clue—shorter bars mean the child is recognizing the sounds faster and with less effort!",
    metrics: {
      "Correct Sounds": "90.0%",
      "Response Time": "0.8s",
      "Sounds Heard": 10,
    },
  },
  drawing: {
    title: "Creative Canvas",
    icon: PenTool,
    color: "bg-[#fbbf24]",
    textColor: "text-[#fbbf24]",
  },
};

const OVERALL_RECOMMENDATION =
  "The child shows an excellent, balanced cognitive profile with an overall growth trend of +15% over the last 5 sessions. Memory and Color recognition are significant strengths. We recommend continuing the daily 15-minute sessions, with a slight focus on reaction-based activities to align motor-reflex speed with their high visual processing accuracy.";

const MOCK_HISTORY_DATA = [
  {
    id: "sess_001",
    date: "Today, 2:30 PM",
    title: "Daily Assessment",
    score: "Excellent",
    recommendation:
      "The child shows an excellent, balanced cognitive profile today. Memory and Color recognition are significant strengths. We recommend continuing the daily sessions.",
    tests: [
      {
        testId: "memory",
        title: "Memory Match",
        score: "95%",
        metrics: { Accuracy: "95.0%", "Average Speed": "1.2s" },
      },
      {
        testId: "reaction",
        title: "Reaction Bug",
        score: "88%",
        metrics: { "Hit Accuracy": "88.0%", "Reaction Time": "640ms" },
      },
      {
        testId: "color",
        title: "Color Explorer",
        score: "100%",
        metrics: { Accuracy: "100%", "Color Recognition": "Perfect" },
      },
      {
        testId: "hearing",
        title: "Sound Explorer",
        score: "90%",
        metrics: { Accuracy: "90.0%", "Response Time": "0.8s" },
      },
      {
        testId: "drawing",
        title: "Creative Canvas",
        score: "Completed",
        metrics: { Expression: "Happy 😊", Focus: "High" },
      },
    ],
  },
];

// ============================================================================
// FILE: src/components/common/Confetti.jsx
// ============================================================================
const Confetti = () => {
  const [particles] = useState(() =>
    Array.from({ length: 40 }).map(() => ({
      id: Math.random(),
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: ["#ef4444", "#22c55e", "#3b82f6", "#eab308", "#a855f7"][
        Math.floor(Math.random() * 5)
      ],
      animDuration: `${Math.random() * 1 + 0.5}s`,
      animDelay: `${Math.random() * 0.5}s`,
    })),
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-3 h-3 rounded-full animate-ping"
          style={{
            left: p.left,
            top: p.top,
            backgroundColor: p.color,
            animationDuration: p.animDuration,
            animationDelay: p.animDelay,
          }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// FILE: src/components/common/InputField.jsx
// ============================================================================
const InputField = ({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  name,
  actionLabel,
  onAction,
  disabled,
  required,
}) => (
  <div className="mb-4 text-left relative">
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        type={type}
        name={name}
        required={required}
        disabled={disabled}
        className={`w-full rounded-full border border-gray-300 bg-transparent px-5 py-3.5 text-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all ${Icon ? "pl-11" : ""} ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
    {actionLabel && (
      <div className="text-right mt-2">
        <button
          type="button"
          onClick={onAction}
          disabled={disabled}
          className="text-xs font-semibold text-gray-600 hover:text-black underline decoration-gray-300 underline-offset-2 disabled:opacity-50"
        >
          {actionLabel}
        </button>
      </div>
    )}
  </div>
);

// ============================================================================
// FILE: src/components/common/SelectField.jsx
// ============================================================================
const SelectField = ({ label, options, value, onChange, name, disabled }) => (
  <div className="mb-4 text-left">
    <select
      name={name}
      disabled={disabled}
      className={`w-full rounded-full border border-gray-300 bg-transparent px-5 py-3.5 text-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}`}
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>
        {label}
      </option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// ============================================================================
// FILE: src/components/auth/SocialLogin.jsx
// ============================================================================
const SocialLogin = () => (
  <div className="mt-8 text-center">
    <div className="text-sm text-gray-500 mb-4 font-medium">or log in with</div>
    <div className="flex justify-center gap-4">
      <button
        type="button"
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${THEME.primaryYellow} ${THEME.primaryYellowHover} transition-colors shadow-sm`}
      >
        <svg
          className="w-5 h-5 text-black"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      </button>
      <button
        type="button"
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${THEME.primaryYellow} ${THEME.primaryYellowHover} transition-colors shadow-sm`}
      >
        <svg className="w-5 h-5 text-black" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          />
        </svg>
      </button>
      <button
        type="button"
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${THEME.primaryYellow} ${THEME.primaryYellowHover} transition-colors shadow-sm`}
      >
        <svg
          className="w-5 h-5 text-black"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.34-.85 3.73-.78 1.18.06 2.3.43 3.08 1.14-2.5 1.5-2.05 4.85.35 5.86-1.1 2.3-2.1 4.54-3.24 5.95M12.03 7.24c-.16-2.73 2.15-4.5 4.19-4.85.45 2.73-2.4 4.88-4.19 4.85" />
        </svg>
      </button>
    </div>
  </div>
);

// ============================================================================
// FILE: src/layouts/AuthLayout.jsx
// ============================================================================
const AuthLayout = ({ children, onBack }) => (
  <div className={`min-h-screen ${THEME.bgBeige} flex`}>
    <div className="hidden md:block md:w-1/2 relative">
      <div className="absolute top-8 left-8 z-10 bg-white/90 p-2 rounded-2xl backdrop-blur-sm shadow-sm">
        {ASSETS.logo}
      </div>
      <img
        src={ASSETS.heroImage}
        alt="Child playing"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
    <div className="w-full md:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-8 right-8 text-gray-400 hover:text-black flex items-center gap-2 transition-colors font-semibold bg-white px-4 py-2 rounded-full shadow-sm"
        >
          <ArrowLeft size={18} /> Back
        </button>
      )}
      <div className="md:hidden absolute top-8 text-center w-full flex justify-center">
        {ASSETS.logo}
      </div>
      <div
        className={`${THEME.cardWhite} w-full max-w-md p-10 md:p-14 relative z-10`}
      >
        {children}
      </div>
    </div>
  </div>
);

const AuthLayoutWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBack = () => {
    if (location.pathname === "/login") navigate("/");
    else if (location.pathname === "/register") navigate("/login");
    else if (location.pathname === "/forgot-password") navigate("/login");
    else if (location.pathname === "/verify-email") navigate("/register");
    else if (location.pathname === "/reset-password") navigate("/login");
    else navigate(-1);
  };
  return (
    <AuthLayout onBack={handleBack}>
      <Outlet />
    </AuthLayout>
  );
};

// ============================================================================
// FILE: src/views/Auth/Login.jsx
// ============================================================================
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

// ============================================================================
// FILE: src/views/Auth/Register.jsx
// ============================================================================
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

// ============================================================================
// FILE: src/views/Auth/VerifyEmail.jsx
// ============================================================================
const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your@email.com";
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div className="text-center animate-in fade-in duration-500">
      <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail size={32} />
      </div>
      <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
        Check your email
      </h2>
      <p className="text-gray-500 mb-6 font-medium leading-relaxed">
        We've sent an activation link to <br />
        <span className="font-bold text-gray-800">{email}</span>
      </p>

      <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 text-blue-800 font-medium text-sm mb-6 shadow-sm">
        Once your account is activated, you can{" "}
        <button
          onClick={() => navigate("/login")}
          className="font-bold underline hover:text-blue-600 transition-colors"
        >
          log in here
        </button>
        .
      </div>

      <div className="mt-8 text-sm font-semibold text-gray-500">
        Didn't receive the email? <br />
        {timeLeft > 0 ? (
          <span className="text-gray-400 inline-block mt-2">
            Resend link in {timeLeft}s
          </span>
        ) : (
          <button
            onClick={() => setTimeLeft(60)}
            className="text-black underline decoration-2 underline-offset-4 hover:text-[#FFC82C] transition-colors mt-2"
          >
            Resend now
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// FILE: src/views/Auth/ForgotPassword.jsx
// ============================================================================
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (isSent && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isSent, timeLeft]);

  if (isSent) {
    return (
      <div className="text-center animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail size={32} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
          Link Sent!
        </h2>
        <p className="text-gray-500 mb-6 font-medium leading-relaxed">
          If an account exists for{" "}
          <span className="font-bold text-gray-800">
            {email || "that address"}
          </span>
          , we have sent a password reset link.
        </p>

        <button
          onClick={() => navigate("/login")}
          className={`w-full ${THEME.primaryYellow} ${THEME.textBlack} font-bold py-4 px-4 rounded-full ${THEME.primaryYellowHover} transition-colors text-lg`}
        >
          Back to Login
        </button>

        <div className="mt-8 text-sm font-semibold text-gray-500">
          Didn't receive the email? <br />
          {timeLeft > 0 ? (
            <span className="text-gray-400 inline-block mt-2">
              Resend link in {timeLeft}s
            </span>
          ) : (
            <button
              onClick={() => setTimeLeft(60)}
              className="text-black underline decoration-2 underline-offset-4 hover:text-[#FFC82C] transition-colors mt-2"
            >
              Resend now
            </button>
          )}
        </div>

        {/* DEV TOOL BUTTON */}
        {IS_DEV && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-xs text-gray-400 font-bold mb-2 uppercase tracking-wider">
              🛠️ Dev Tools
            </p>
            <button
              onClick={() => navigate("/reset-password")}
              className="text-sm font-bold text-blue-500 hover:text-blue-700 underline"
            >
              Simulate clicking link in email
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="text-center animate-in fade-in duration-500">
      <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <Lock size={32} />
      </div>
      <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
        Reset Password
      </h2>
      <p className="text-gray-500 mb-8 font-medium">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          setIsSent(true);
        }}
      >
        <InputField
          type="email"
          placeholder="Email Address"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`w-full mt-4 ${THEME.primaryYellow} ${THEME.textBlack} font-bold py-4 px-4 rounded-full ${THEME.primaryYellowHover} transition-colors text-lg`}
        >
          Send Reset Link
        </button>
      </form>
      <div className="mt-8 text-sm font-semibold text-gray-500">
        Remember your password?{" "}
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

// ============================================================================
// FILE: src/views/Auth/ResetPassword.jsx
// ============================================================================
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

// ============================================================================
// FILE: src/views/LandingPage.jsx
// ============================================================================
const LandingPage = () => {
  const navigate = useNavigate();
  const { parentData } = useAppContext();
  const isLoggedIn = !!parentData;

  return (
    <div
      className={`min-h-screen bg-white font-sans overflow-x-hidden text-gray-900`}
    >
      {/* NAVIGATION */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto bg-transparent relative z-50">
        <div className="scale-110">{ASSETS.logo}</div>
        <div className="hidden md:flex gap-10 font-bold text-gray-800 text-sm">
          <a
            href="#"
            className="hover:text-black border-b-2 border-transparent hover:border-yellow-400 transition-all pb-1"
          >
            Home
          </a>
          <a
            href="#how-it-works"
            className="hover:text-black border-b-2 border-transparent hover:border-yellow-400 transition-all pb-1"
          >
            How it works
          </a>
          <a
            href="#for-parents"
            className="hover:text-black border-b-2 border-transparent hover:border-yellow-400 transition-all pb-1"
          >
            For Parents
          </a>
          <a
            href="#assessments"
            className="hover:text-black border-b-2 border-transparent hover:border-yellow-400 transition-all pb-1"
          >
            Assessments
          </a>
        </div>
        <div className="flex gap-3 items-center">
          {isLoggedIn ? (
            <button
              onClick={() => navigate("/parent-dashboard")}
              className={`${THEME.primaryYellow} px-6 py-2.5 rounded-full font-bold shadow-sm hover:scale-105 transition-transform text-black text-sm`}
            >
              Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hidden sm:block px-6 py-2.5 rounded-full border-2 border-gray-200 hover:border-gray-300 font-bold text-gray-700 transition-all text-sm"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/register")}
                className={`${THEME.primaryYellow} px-6 py-2.5 rounded-full font-bold shadow-sm hover:scale-105 transition-transform text-black text-sm`}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col-reverse md:flex-row items-center max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 gap-12 bg-white relative">
        <div className="absolute top-0 right-[20%] text-yellow-400 opacity-60 z-0">
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          >
            <path d="M50 10 L50 20 M50 80 L50 90 M10 50 L20 50 M80 50 L90 50 M22 22 L29 29 M71 71 L78 78 M22 78 L29 71 M71 22 L78 29" />
          </svg>
        </div>

        <div className="flex-1 space-y-6 text-center md:text-left z-10">
          <h1 className="text-5xl md:text-[5.5rem] font-black text-gray-900 leading-[1.05] tracking-tight">
            This Is Not Just <br /> a Game.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium max-w-md mx-auto md:mx-0">
            Every tap, every swipe, every play is a growing step deeper about
            your child.
          </p>
          <div className="pt-4">
            <button
              onClick={() =>
                navigate(isLoggedIn ? "/parent-dashboard" : "/register")
              }
              className={`${THEME.primaryYellow} px-8 py-4 rounded-full font-black text-lg shadow-sm hover:scale-105 transition-transform text-gray-900`}
            >
              {isLoggedIn ? "Go to Dashboard" : "Get Started"}
            </button>
          </div>
        </div>
        <div className="flex-1 relative flex justify-center w-full min-h-[400px]">
          <div className="w-full max-w-md aspect-square relative mt-8">
            <div className="absolute -right-6 top-0 text-[#22c55e] text-[14rem] font-black rotate-12 leading-none z-0 select-none">
              3
            </div>
            <svg
              className="absolute -left-16 top-1/4 w-40 h-40 text-[#ec4899] z-20"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10,50 Q20,20 40,50 T70,50 T90,20" />
            </svg>
            <div className="w-full h-full rounded-full overflow-hidden shadow-xl relative z-10 border-[12px] border-white">
              <img
                src={ASSETS.heroImage}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                alt="Child playing"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        id="how-it-works"
        className="w-full bg-[#FFD95A] py-24 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tight text-gray-900">
            How it <span className="text-white drop-shadow-sm">Works</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[#ff5e5e] p-8 rounded-3xl shadow-sm text-white flex flex-col items-center text-center hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Sparkles
                  size={48}
                  fill="currentColor"
                  className="text-yellow-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Create an Account</h3>
              <p className="text-white/90 text-sm font-medium leading-relaxed">
                Sign up as a parent and set up your profile.
              </p>
            </div>
            <div className="bg-[#ec4899] p-8 rounded-3xl shadow-sm text-white flex flex-col items-center text-center hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center relative">
                <Heart
                  size={40}
                  fill="currentColor"
                  className="text-green-300 absolute -left-2 top-2"
                />
                <Heart
                  size={48}
                  fill="currentColor"
                  className="text-yellow-300 relative z-10"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Add Your Child</h3>
              <p className="text-white/90 text-sm font-medium leading-relaxed">
                Create a secure profile for each child.
              </p>
            </div>
            <div className="bg-[#86D293] p-8 rounded-3xl shadow-sm text-white flex flex-col items-center text-center hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Sun size={48} fill="currentColor" className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Play Tests</h3>
              <p className="text-white/90 text-sm font-medium leading-relaxed">
                Your child enjoys interactive games (tests) effortlessly.
              </p>
            </div>
            <div className="bg-[#60A5FA] p-8 rounded-3xl shadow-sm text-white flex flex-col items-center text-center hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Sun
                  size={48}
                  fill="currentColor"
                  className="text-yellow-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Get Reports</h3>
              <p className="text-white/90 text-sm font-medium leading-relaxed">
                View deep insights into your child's cognitive development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOR PARENTS SECTION */}
      <section
        id="for-parents"
        className="w-full bg-[#FFFDF8] py-24 px-6 md:px-12 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#E5B427]">
              <span className="text-gray-900">For</span> Parents
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-8 mb-6">
              What if play could tell you more?
            </h3>
            <div className="space-y-4 text-gray-600 font-medium text-lg leading-relaxed">
              <p>
                Through interactive and joyful activities, SMARTCHILD tracks
                every tap, interaction, and reaction.
              </p>
              <p>
                It's not just a game—it's a window into understanding your
                child's memory, reflexes, and developmental milestones.
              </p>
              <p>
                With visual dashboards and easy-to-read reports, you can monitor
                their progression and discover where they excel and where they
                might need a little extra encouragement—without them ever
                feeling like they are taking a test.
              </p>
            </div>
          </div>
          <div className="flex-1 relative flex justify-center items-center w-full">
            <div className="absolute top-0 right-12 text-yellow-400 opacity-80 z-20">
              <Sun size={48} />
            </div>
            <div
              className="w-full max-w-sm aspect-square relative z-10 overflow-hidden shadow-xl border-8 border-white bg-gray-200"
              style={{ borderRadius: "50% 50% 10% 10% / 40% 40% 10% 10%" }}
            >
              <img
                src="https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover"
                alt="Parent and child playing"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-16 px-6 border-t border-gray-100 flex flex-col items-center text-center">
        <div className="mb-6">{ASSETS.logo}</div>
        <p className="text-gray-600 font-bold mb-8">
          Helps you to discover your child's hidden talents
        </p>

        <div className="flex gap-4 mb-8 text-gray-800">
          <a
            href="#"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <MessageCircle size={18} />
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <FacebookIcon size={18} />
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <InstagramIcon size={18} />
          </a>
        </div>

        <div className="text-sm text-gray-400 font-medium">
          © 2026 SmartChild. Privacy · Terms
        </div>
      </footer>
    </div>
  );
};

// ============================================================================
// FILE: src/components/charts/Charts.jsx
// ============================================================================
const MiniLineChart = ({ data, colorClass }) => {
  const max = Math.max(...data) * 1.1;
  const min = 0;
  const range = max - min || 1;
  const points = data
    .map(
      (val, i) =>
        `${(i / (data.length - 1)) * 100},${100 - ((val - min) / range) * 100}`,
    )
    .join(" ");

  return (
    <svg viewBox="0 -10 100 120" className="w-full h-16 overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        className={colorClass}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((val, i) => (
        <circle
          key={i}
          cx={(i / (data.length - 1)) * 100}
          cy={100 - ((val - min) / range) * 100}
          r="4"
          fill="white"
          stroke="currentColor"
          strokeWidth="2"
          className={colorClass}
        />
      ))}
    </svg>
  );
};

const MemoryChartVisual = ({ data }) => {
  const maxArl = 5;
  const arPoints = data
    .map((d, i) => `${(i / (data.length - 1)) * 100},${100 - d.ar}`)
    .join(" ");
  const arlPoints = data
    .map(
      (d, i) =>
        `${(i / (data.length - 1)) * 100},${100 - (d.arl / maxArl) * 100}`,
    )
    .join(" ");

  return (
    <div className="w-full h-32 relative flex pt-2 pb-4">
      <div className="absolute left-0 top-2 bottom-4 flex flex-col justify-between text-[9px] font-black text-[#22c55e] z-10">
        <span>100%</span>
        <span>0%</span>
      </div>
      <div className="absolute right-0 top-2 bottom-4 flex flex-col justify-between text-[9px] font-black text-[#f97316] z-10 items-end">
        <span>5s</span>
        <span>0s</span>
      </div>
      <div className="w-full h-full px-6">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="#e5e7eb"
            strokeDasharray="2"
          />
          <polyline
            points={arPoints}
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={arlPoints}
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 2"
          />
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={100 - d.ar}
                  r="3"
                  fill="#22c55e"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <circle
                  cx={x}
                  cy={100 - (d.arl / maxArl) * 100}
                  r="3"
                  fill="#f97316"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>
      </div>
      <div className="absolute -bottom-2 w-full flex justify-center gap-4 text-[9px] font-bold">
        <span className="text-[#22c55e] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block"></span>{" "}
          Accuracy (AR)
        </span>
        <span className="text-[#f97316] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#f97316] inline-block"></span>{" "}
          Latency (ARL)
        </span>
      </div>
    </div>
  );
};

const ReactionChartVisual = ({ data }) => {
  const maxMrt = 2000;
  const barW = 8;
  const mrtPoints = data
    .map(
      (d, i) =>
        `${(i / (data.length - 1)) * 90 + 5},${100 - (d.mrt / maxMrt) * 100}`,
    )
    .join(" ");

  return (
    <div className="w-full h-32 relative flex pt-2 pb-4">
      <div className="absolute left-0 top-2 bottom-4 flex flex-col justify-between text-[9px] font-black text-[#ef4444] z-10">
        <span>2s</span>
        <span>0s</span>
      </div>
      <div className="absolute right-0 top-2 bottom-4 flex flex-col justify-between text-[9px] font-black text-[#60a5fa] z-10 items-end">
        <span>100%</span>
        <span>0%</span>
      </div>
      <div className="w-full h-full px-6">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 90 + 5;
            const h = d.pi;
            return (
              <rect
                key={`bar-${i}`}
                x={x - barW / 2}
                y={100 - h}
                width={barW}
                height={h}
                fill="#93c5fd"
                rx="2"
                opacity="0.8"
              />
            );
          })}
          <polyline
            points={mrtPoints}
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 90 + 5;
            return (
              <circle
                key={`dot-${i}`}
                cx={x}
                cy={100 - (d.mrt / maxMrt) * 100}
                r="3"
                fill="#ef4444"
                stroke="white"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>
      </div>
      <div className="absolute -bottom-2 w-full flex justify-center gap-4 text-[9px] font-bold">
        <span className="text-[#ef4444] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#ef4444] inline-block"></span>{" "}
          Mean Response Time (MRT)
        </span>
        <span className="text-[#3b82f6] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#93c5fd] inline-block"></span>{" "}
          Precision (PI)
        </span>
      </div>
    </div>
  );
};

const ColorChartVisual = ({ history, rgb }) => {
  const linePts = history
    .map((val, i) => `${(i / (history.length - 1)) * 100},${100 - val}`)
    .join(" ");
  const rad = Math.PI / 180;
  const getPt = (val, angle) => {
    const r = 35 * (val / 100);
    return `${50 + r * Math.sin(angle * rad)},${50 - r * Math.cos(angle * rad)}`;
  };
  const radarPts = `${getPt(rgb.r, 0)} ${getPt(rgb.g, 120)} ${getPt(rgb.b, 240)}`;
  const radarBg = `${getPt(100, 0)} ${getPt(100, 120)} ${getPt(100, 240)}`;

  return (
    <div className="w-full h-32 flex items-center gap-2 pt-2 pb-4">
      <div className="flex-[3] h-full relative border-r border-gray-200 pr-4">
        <div className="absolute left-0 top-2 bottom-4 flex flex-col justify-between text-[9px] font-black text-gray-400 z-10">
          <span>100%</span>
          <span>0%</span>
        </div>
        <div className="w-full h-full pl-6">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <polyline
              points={linePts}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {history.map((val, i) => (
              <circle
                key={i}
                cx={(i / (history.length - 1)) * 100}
                cy={100 - val}
                r="3"
                fill="#3b82f6"
                stroke="white"
                strokeWidth="1.5"
              />
            ))}
          </svg>
        </div>
      </div>
      <div className="flex-[2] h-full flex flex-col items-center justify-center relative">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <polygon
            points={radarBg}
            fill="#f3f4f6"
            stroke="#d1d5db"
            strokeWidth="1"
          />
          <line
            x1="50"
            y1="50"
            x2={getPt(100, 0).split(",")[0]}
            y2={getPt(100, 0).split(",")[1]}
            stroke="#e5e7eb"
          />
          <line
            x1="50"
            y1="50"
            x2={getPt(100, 120).split(",")[0]}
            y2={getPt(100, 120).split(",")[1]}
            stroke="#e5e7eb"
          />
          <line
            x1="50"
            y1="50"
            x2={getPt(100, 240).split(",")[0]}
            y2={getPt(100, 240).split(",")[1]}
            stroke="#e5e7eb"
          />
          <polygon
            points={radarPts}
            fill="rgba(59, 130, 246, 0.5)"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <text
            x="50"
            y="8"
            fontSize="10"
            textAnchor="middle"
            fill="#ef4444"
            fontWeight="black"
          >
            R
          </text>
          <text
            x="92"
            y="80"
            fontSize="10"
            textAnchor="middle"
            fill="#22c55e"
            fontWeight="black"
          >
            G
          </text>
          <text
            x="8"
            y="80"
            fontSize="10"
            textAnchor="middle"
            fill="#3b82f6"
            fontWeight="black"
          >
            B
          </text>
        </svg>
      </div>
      <div className="absolute -bottom-2 w-full flex justify-between px-8 text-[9px] font-bold text-gray-500">
        <span>Accuracy Line</span>
        <span>RGB Profile Radar</span>
      </div>
    </div>
  );
};

const HearingChartVisual = ({ data }) => {
  const maxAarl = 5;
  const barW = 8;
  const isrPoints = data
    .map((d, i) => `${(i / (data.length - 1)) * 90 + 5},${100 - d.isr}`)
    .join(" ");

  return (
    <div className="w-full h-32 relative flex pt-2 pb-4">
      <div className="absolute left-0 top-2 bottom-4 flex flex-col justify-between text-[9px] font-black text-[#a855f7] z-10">
        <span>100%</span>
        <span>0%</span>
      </div>
      <div className="absolute right-0 top-2 bottom-4 flex flex-col justify-between text-[9px] font-black text-gray-400 z-10 items-end">
        <span>5s</span>
        <span>0s</span>
      </div>
      <div className="w-full h-full px-6">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 90 + 5;
            const h = (d.aarl / maxAarl) * 100;
            return (
              <rect
                key={`bar-${i}`}
                x={x - barW / 2}
                y={100 - h}
                width={barW}
                height={h}
                fill="#e5e7eb"
                rx="2"
              />
            );
          })}
          <polyline
            points={isrPoints}
            fill="none"
            stroke="#a855f7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 90 + 5;
            return (
              <circle
                key={`dot-${i}`}
                cx={x}
                cy={100 - d.isr}
                r="3"
                fill="#a855f7"
                stroke="white"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>
      </div>
      <div className="absolute -bottom-2 w-full flex justify-center gap-4 text-[9px] font-bold">
        <span className="text-[#a855f7] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#a855f7] inline-block"></span>{" "}
          Success Rate (ISR)
        </span>
        <span className="text-gray-500 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-200 inline-block"></span>{" "}
          Latency (AARL)
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// FILE: src/views/Dashboards/ReportsDashboard.jsx
// ============================================================================
const ReportsDashboard = () => {
  const navigate = useNavigate();
  const { activeChild } = useAppContext();
  const [activePrintReport, setActivePrintReport] = useState(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  const childName = activeChild?.name || "Child";
  const childAge = activeChild?.age || "-";
  const childAvatar = activeChild?.avatar || ASSETS.avatars.child1;

  const handlePrint = (reportType, payload = null) => {
    setActivePrintReport({ type: reportType, data: payload });
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className={`min-h-screen ${THEME.bgBeige} relative`}>
      <style>{`@media print { body { background-color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; } .no-print { display: none !important; } @page { margin: 15mm; size: A4 portrait; } }`}</style>
      <div className={`no-print ${activePrintReport ? "hidden" : "block"}`}>
        <header className="bg-[#FFFDF8] px-8 py-5 flex items-center justify-between sticky top-0 z-10 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/parent-dashboard")}
              className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="scale-90 origin-left">{ASSETS.logo}</div>
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={ASSETS.avatars.parent}
              className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200"
              alt="Parent"
            />
          </div>
        </header>

        <main className="max-w-5xl mx-auto p-6 md:p-10 space-y-12 animate-in fade-in duration-500">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-gray-200 pb-8">
            <div className="flex items-center gap-6">
              <img
                src={childAvatar}
                className="w-20 h-20 rounded-full bg-blue-50 border-4 border-white shadow-sm object-cover"
                alt={childName}
              />
              <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-1">
                  {childName}'s Progress
                </h1>
                <p className="text-gray-500 font-medium flex items-center gap-2 mb-3">
                  <Calendar size={16} /> Last Assessment: Today, 2:30 PM
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-green-50 text-green-700 font-bold px-3 py-1.5 rounded-xl flex items-center gap-2 border border-green-100 w-fit text-sm">
                    <TrendingUp size={16} /> Overall Growth: +15%
                  </div>
                  <div className="bg-yellow-50 text-yellow-700 font-bold px-3 py-1.5 rounded-xl flex items-center gap-2 border border-yellow-100 w-fit text-sm">
                    <Smile size={16} /> Overall Feeling: Happy 😊
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => handlePrint("overall")}
              className={`${THEME.primaryYellow} text-black font-black px-6 py-4 rounded-full shadow-sm hover:-translate-y-1 transition-all flex items-center gap-2 text-lg`}
            >
              <Download size={22} /> Overall Report
            </button>
          </div>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp size={24} className="text-blue-500" /> General
              Progress (Last 5 Sessions)
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.entries(MOCK_REPORTS_DATA)
                .filter(([key]) => key !== "drawing")
                .map(([key, data]) => {
                  const Icon = data.icon;
                  let ChartComponent;
                  if (key === "memory")
                    ChartComponent = <MemoryChartVisual data={data.history} />;
                  else if (key === "reaction")
                    ChartComponent = (
                      <ReactionChartVisual data={data.history} />
                    );
                  else if (key === "color")
                    ChartComponent = (
                      <ColorChartVisual
                        history={data.history}
                        rgb={data.rgbProfile}
                      />
                    );
                  else if (key === "hearing")
                    ChartComponent = <HearingChartVisual data={data.history} />;
                  else
                    ChartComponent = (
                      <MiniLineChart
                        data={data.history}
                        colorClass={data.textColor}
                      />
                    );

                  return (
                    <div
                      key={key}
                      className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col h-full"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`w-12 h-12 rounded-2xl ${data.color} flex items-center justify-center text-white shadow-sm`}
                        >
                          <Icon size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-gray-900">
                            {data.title}
                          </h3>
                          <p
                            className={`text-xs font-bold text-gray-400 flex items-center gap-1 uppercase tracking-wider`}
                          >
                            {key === "drawing"
                              ? "Interactions"
                              : "Metrics & Trends"}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-5 relative flex-none mb-6">
                        {ChartComponent}
                      </div>
                      <div className="mt-auto p-4 bg-blue-50/50 rounded-xl text-sm text-gray-700 font-medium leading-relaxed border border-blue-100/50">
                        <strong className="text-blue-900 block mb-1 flex items-center gap-1.5">
                          <Activity size={16} /> Insight:
                        </strong>
                        {data.insight}
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <FileText size={24} className="text-pink-500" /> Assessment
              History
            </h2>
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              {MOCK_HISTORY_DATA.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedHistoryItem(item)}
                  className="p-5 md:p-6 border-b border-gray-50 flex items-center justify-between gap-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Puzzle size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-lg">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 font-bold">
                        {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block bg-gray-100 text-gray-700 text-xs font-black px-3 py-1.5 rounded-lg border border-gray-200">
                      Score: {item.score}
                    </span>
                    <ChevronRight
                      className="text-gray-300 group-hover:text-gray-600 transition-colors"
                      size={20}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {selectedHistoryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 no-print">
          <div
            className={`${THEME.cardWhite} w-full max-w-lg p-8 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto`}
          >
            <button
              onClick={() => setSelectedHistoryItem(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-4 mb-6 pr-8">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-sm">
                <Puzzle size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 leading-tight">
                  {selectedHistoryItem.title}
                </h2>
                <p className="text-gray-500 font-bold text-sm">
                  {selectedHistoryItem.date}
                </p>
              </div>
            </div>
            <div className="bg-blue-50 p-5 rounded-2xl mb-6 border border-blue-100 text-blue-900">
              <h3 className="font-black text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                <Activity size={16} className="text-blue-500" /> System
                Recommendation
              </h3>
              <p className="text-sm font-medium leading-relaxed">
                {selectedHistoryItem.recommendation}
              </p>
            </div>
            <div className="mb-8 space-y-4">
              <h3 className="font-black text-gray-900 mb-3 text-sm uppercase tracking-wider">
                Detailed Test Results
              </h3>
              {selectedHistoryItem.tests.map((test, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-4 rounded-xl border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-bold text-gray-800 flex items-center gap-2">
                      {React.createElement(
                        MOCK_REPORTS_DATA[test.testId].icon,
                        {
                          size: 16,
                          className: MOCK_REPORTS_DATA[test.testId].textColor,
                        },
                      )}
                      {test.title}
                    </div>
                    <div className="font-black text-gray-900">{test.score}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(test.metrics).map(([mKey, mVal], i) => (
                      <div
                        key={i}
                        className="bg-white p-2 rounded-lg border border-gray-100 flex justify-between items-center"
                      >
                        <span className="text-[10px] uppercase font-bold text-gray-400">
                          {mKey}
                        </span>
                        <span className="text-sm font-black text-gray-800">
                          {mVal}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedHistoryItem(null)}
                className="flex-1 bg-gray-100 text-gray-700 font-bold py-3.5 rounded-full hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handlePrint("individual", selectedHistoryItem);
                  setSelectedHistoryItem(null);
                }}
                className={`flex-[2] ${THEME.primaryYellow} ${THEME.textBlack} font-black py-3.5 rounded-full ${THEME.primaryYellowHover} transition-colors flex items-center justify-center gap-2`}
              >
                <Download size={18} /> Download Report
              </button>
            </div>
          </div>
        </div>
      )}

      {activePrintReport && (
        <div className="fixed inset-0 z-50 bg-gray-500/50 backdrop-blur-sm overflow-y-auto no-print">
          <div className="min-h-full flex justify-center items-start p-4 sm:p-10">
            <div className="fixed top-4 right-4 flex gap-3 z-[60]">
              <button
                onClick={() => window.print()}
                className="bg-blue-600 text-white font-bold px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-700"
              >
                <Printer size={20} /> Print PDF
              </button>
              <button
                onClick={() => setActivePrintReport(null)}
                className="bg-white text-gray-600 font-bold p-3 rounded-full shadow-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="bg-white w-full max-w-4xl shadow-2xl rounded-2xl relative print:rounded-none print:shadow-none print:w-full print:max-w-none print:h-auto print:static print:bg-transparent print:p-0">
              {activePrintReport.type === "overall" ? (
                <div className="p-6 sm:p-10 print:p-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-gray-200 pb-8 mb-8 print:flex-row">
                    <div>
                      <div className="scale-110 origin-top-left mb-6">
                        {ASSETS.logo}
                      </div>
                      <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                        Comprehensive Progress Report
                      </h1>
                      <h2 className="text-xl font-bold text-gray-500 mt-2">
                        Overall Cognitive Growth
                      </h2>
                    </div>
                    <div className="text-left sm:text-right print:text-right flex flex-col items-start sm:items-end print:items-end w-full sm:w-auto">
                      <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Generated On
                      </div>
                      <div className="text-lg font-bold text-gray-800 mb-4">
                        {new Date().toLocaleDateString()}
                      </div>
                      <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Child Profile
                      </div>
                      <div className="text-lg font-bold text-gray-800 mb-4">
                        {childName} (Age: {childAge})
                      </div>
                      <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Overall Feeling
                      </div>
                      <div className="text-lg font-bold text-gray-800">
                        Happy 😊
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4 border-b border-gray-100 pb-2">
                    System Recommendation
                  </h3>
                  <div className="bg-blue-50 p-6 rounded-2xl mb-10 border border-blue-100 text-blue-900 font-medium leading-relaxed text-lg">
                    {OVERALL_RECOMMENDATION}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4 border-b border-gray-100 pb-2">
                    Test Trajectories (Last 5 Sessions)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 print:grid-cols-2">
                    {Object.entries(MOCK_REPORTS_DATA)
                      .filter(([key]) => key !== "drawing")
                      .map(([key, data]) => {
                        const Icon = data.icon;
                        let ChartComponent;
                        if (key === "memory")
                          ChartComponent = (
                            <MemoryChartVisual data={data.history} />
                          );
                        else if (key === "reaction")
                          ChartComponent = (
                            <ReactionChartVisual data={data.history} />
                          );
                        else if (key === "color")
                          ChartComponent = (
                            <ColorChartVisual
                              history={data.history}
                              rgb={data.rgbProfile}
                            />
                          );
                        else if (key === "hearing")
                          ChartComponent = (
                            <HearingChartVisual data={data.history} />
                          );
                        else
                          ChartComponent = (
                            <MiniLineChart
                              data={data.history}
                              colorClass={data.textColor}
                            />
                          );

                        return (
                          <div
                            key={key}
                            className="bg-white p-6 rounded-2xl border-2 border-gray-100 flex flex-col break-inside-avoid"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <Icon size={20} className={data.textColor} />
                              <span className="font-black text-gray-900 text-lg">
                                {data.title}
                              </span>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 flex-none">
                              {ChartComponent}
                            </div>
                            <div className="mt-4 p-3 bg-blue-50/50 rounded-lg text-xs text-gray-700 font-medium leading-relaxed border border-blue-100/50 flex-1">
                              <strong className="text-blue-900 block mb-1 flex items-center gap-1.5">
                                <Activity size={12} /> Insight:
                              </strong>
                              {data.insight}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="mt-12 border-t border-gray-200 pt-6 flex justify-between items-center">
                    <p className="text-xs font-bold text-gray-400">
                      SMARTCHILD CONFIDENTIAL REPORT
                    </p>
                    <p className="text-xs font-bold text-gray-400 border border-gray-200 px-3 py-1 rounded-full">
                      Overall Summary Record
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6 sm:p-10 print:p-0">
                  {(() => {
                    const item = activePrintReport.data;
                    return (
                      <>
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-gray-200 pb-8 mb-8 print:flex-row">
                          <div>
                            <div className="scale-110 origin-top-left mb-6">
                              {ASSETS.logo}
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                              Assessment Result
                            </h1>
                            <h2 className="text-2xl font-bold text-indigo-500 mt-2 flex items-center gap-2">
                              <Puzzle size={24} /> {item.title}
                            </h2>
                          </div>
                          <div className="text-left sm:text-right print:text-right w-full sm:w-auto">
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                              Assessment Date
                            </div>
                            <div className="text-lg font-bold text-gray-800 mb-4 sm:mb-0">
                              {item.date}
                            </div>
                            <div className="mt-4 text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                              Child Profile
                            </div>
                            <div className="text-lg font-bold text-gray-800">
                              {childName} (Age: {childAge})
                            </div>
                          </div>
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-4 border-b border-gray-100 pb-2">
                          System Recommendation
                        </h3>
                        <div className="bg-gray-50 p-6 rounded-2xl mb-10 border border-gray-100 text-gray-700 font-medium leading-relaxed text-lg">
                          {item.recommendation}
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-4 border-b border-gray-100 pb-2">
                          Detailed Test Results
                        </h3>
                        <div className="space-y-6 mb-10">
                          {item.tests.map((test, idx) => {
                            const testData = MOCK_REPORTS_DATA[test.testId];
                            const Icon = testData.icon;
                            return (
                              <div
                                key={idx}
                                className="bg-white p-6 rounded-2xl border-2 border-gray-100 break-inside-avoid"
                              >
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-gray-100 pb-4 gap-2">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`p-2 rounded-lg ${testData.color} text-white`}
                                    >
                                      <Icon size={20} />
                                    </div>
                                    <span className="font-black text-gray-900 text-lg">
                                      {test.title}
                                    </span>
                                  </div>
                                  <div className="text-2xl font-black text-gray-900">
                                    {test.score}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 print:grid-cols-4">
                                  {Object.entries(test.metrics).map(
                                    ([mKey, mVal], i) => (
                                      <div key={i}>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                          {mKey}
                                        </div>
                                        <div className="text-xl font-black text-gray-800">
                                          {mVal}
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-12 border-t border-gray-200 pt-6 flex justify-between items-center">
                          <p className="text-xs font-bold text-gray-400">
                            SMARTCHILD CONFIDENTIAL REPORT
                          </p>
                          <p className="text-xs font-bold text-gray-400 border border-gray-200 px-3 py-1 rounded-full">
                            Assessment ID: {item.id}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// FILE: src/views/Dashboards/ParentDashboard.jsx
// ============================================================================
const ParentDashboard = () => {
  const navigate = useNavigate();
  const { profiles, setProfiles, setActiveChild, setParentData } =
    useAppContext();
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(PREDEFINED_AVATARS[0]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    code: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const openModal = (type, profile = null) => {
    setActiveModal(type);
    if (profile) {
      setSelectedProfileId(profile.id);
      setFormData({
        name: profile.name,
        age: profile.age,
        gender: profile.gender,
        code: "",
      });
      setAvatarUrl(profile.avatar);
    } else {
      setSelectedProfileId(null);
      setFormData({ name: "", age: "", gender: "", code: "" });
      setAvatarUrl(PREDEFINED_AVATARS[0]);
    }
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setActiveModal(null);
    setAvatarUrl(PREDEFINED_AVATARS[0]);
    setFormData({ name: "", age: "", gender: "", code: "" });
  };

  const handleFileUpload = (e) => {
    if (isSubmitting) return;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      if (activeModal === "ADD") {
        const newProfile = {
          id: Date.now().toString(),
          name: formData.name || "New Child",
          age: formData.age || "-",
          gender: formData.gender,
          avatar: avatarUrl,
          role: "owner",
          lastActive: "Just now",
        };
        setProfiles([...profiles, newProfile]);
        showToast("Profile created successfully!");
      } else if (activeModal === "EDIT") {
        setProfiles(
          profiles.map((p) =>
            p.id === selectedProfileId
              ? {
                  ...p,
                  name: formData.name,
                  age: formData.age,
                  gender: formData.gender,
                  avatar: avatarUrl,
                }
              : p,
          ),
        );
        showToast("Profile updated successfully!");
      } else if (activeModal === "LINK") {
        if (!formData.code || formData.code.trim().length < 5)
          throw new Error("Invalid connection code. Please try again.");
        const linkedProfile = {
          id: Date.now().toString(),
          name: "Linked Child",
          age: 7,
          gender: "O",
          avatar: PREDEFINED_AVATARS[2],
          role: "linked",
          lastActive: "Unknown",
        };
        setProfiles([...profiles, linkedProfile]);
        showToast("Profile linked successfully!");
      }
      closeModal();
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProfiles(profiles.filter((p) => p.id !== selectedProfileId));
    showToast("Profile deleted permanently.");
    setIsSubmitting(false);
    closeModal();
  };

  const ownerProfiles = profiles.filter((p) => p.role === "owner");
  const linkedProfiles = profiles.filter((p) => p.role === "linked");

  return (
    <div className={`min-h-screen ${THEME.bgBeige} relative`}>
      {toast && (
        <div
          className={`fixed bottom-8 right-8 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 z-[100] ${toast.type === "error" ? "bg-red-50 text-red-600 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}
        >
          {toast.type === "error" ? (
            <Shield size={20} />
          ) : (
            <Star size={20} className="fill-green-600" />
          )}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <header className="bg-[#FFFDF8] px-8 py-5 flex items-center justify-between sticky top-0 z-10">
        {ASSETS.logo}
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
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setParentData(null);
              setActiveChild(null);
              navigate("/");
            }}
          >
            <img
              src={ASSETS.avatars.parent}
              className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200"
              alt="Parent"
            />
            <LogOut
              size={18}
              className="text-gray-400 hover:text-black transition-colors"
            />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 md:p-10 space-y-12 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
              Dashboard
            </h1>
            <p className="text-gray-500 font-medium">
              Manage profiles and view progress
            </p>
          </div>
          <button
            onClick={() => openModal("ADD")}
            className={`${THEME.primaryYellow} ${THEME.textBlack} font-bold px-6 py-3 rounded-full hover:bg-[#E5B427] transition-colors shadow-sm`}
          >
            + Add Child
          </button>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
            Managed Profiles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownerProfiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center relative overflow-hidden group"
              >
                <div className="absolute top-4 left-4 text-xs font-bold text-[#4ade80] bg-green-50 px-3 py-1 rounded-full border border-green-100">
                  Owner
                </div>
                <div className="absolute top-4 right-4 flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openModal("EDIT", profile)}
                    className="p-2 bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                    title="Edit Profile"
                  >
                    <PenTool size={16} />
                  </button>
                  <button
                    onClick={() => openModal("DELETE", profile)}
                    className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete Profile"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <img
                  src={profile.avatar}
                  className="w-24 h-24 rounded-full bg-blue-50 border-4 border-white shadow-sm mb-4 object-cover"
                  alt={profile.name}
                />
                <h3 className="text-2xl font-black text-gray-900 mb-1">
                  {profile.name}
                  {profile.age !== "-" && `, ${profile.age}`}
                </h3>
                <p className="text-sm text-gray-400 font-medium mb-6">
                  Last active: {profile.lastActive}
                </p>

                <div className="flex flex-col w-full gap-3 mt-auto">
                  <button
                    onClick={() => openModal("PLAY_WARNING", profile)}
                    className={`w-full ${THEME.primaryYellow} ${THEME.textBlack} font-bold py-3 rounded-full hover:bg-[#E5B427] transition-colors text-sm flex justify-center items-center gap-2`}
                  >
                    <Play size={16} fill="currentColor" /> Play Mode
                  </button>
                  <button
                    onClick={() => {
                      setActiveChild(profile);
                      navigate("/loading", { state: { nextView: "/reports" } });
                    }}
                    className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-3 rounded-full transition-colors text-sm flex justify-center items-center gap-2"
                  >
                    <BarChart2 size={16} /> View Reports
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
            Linked Profiles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {linkedProfiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center relative overflow-hidden group"
              >
                <div className="absolute top-4 right-4 text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1">
                  <LinkIcon size={12} /> Linked
                </div>
                <img
                  src={profile.avatar}
                  className="w-24 h-24 rounded-full bg-blue-50 border-4 border-white shadow-sm mb-4 object-cover"
                  alt={profile.name}
                />
                <h3 className="text-2xl font-black text-gray-900 mb-1">
                  {profile.name}
                  {profile.age !== "-" && `, ${profile.age}`}
                </h3>
                <p className="text-sm text-gray-400 font-medium mb-6">
                  Last active: {profile.lastActive}
                </p>
                <div className="flex flex-col w-full gap-3 mt-auto">
                  <button
                    onClick={() => openModal("PLAY_WARNING", profile)}
                    className={`w-full ${THEME.primaryYellow} ${THEME.textBlack} font-bold py-3 rounded-full hover:bg-[#E5B427] transition-colors text-sm flex justify-center items-center gap-2`}
                  >
                    <Play size={16} fill="currentColor" /> Play Mode
                  </button>
                  <button
                    onClick={() => {
                      setActiveChild(profile);
                      navigate("/loading", { state: { nextView: "/reports" } });
                    }}
                    className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-3 rounded-full transition-colors text-sm flex justify-center items-center gap-2"
                  >
                    <BarChart2 size={16} /> View Reports
                  </button>
                </div>
              </div>
            ))}
            <div
              onClick={() => openModal("LINK")}
              className="border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-yellow-400 hover:bg-yellow-50/30 transition-all min-h-[300px]"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 text-gray-300 shadow-sm group-hover:scale-110 transition-transform">
                <Plus size={24} strokeWidth={3} />
              </div>
              <h3 className="text-xl font-bold text-gray-700">Link Profile</h3>
              <p className="text-sm text-gray-400 font-medium mt-1">
                Connect a read-only child profile
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Modals Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`${THEME.cardWhite} w-full max-w-md p-8 md:p-10 relative animate-in zoom-in-95 duration-200`}
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full"
            >
              <X size={20} />
            </button>

            {(activeModal === "ADD" || activeModal === "EDIT") && (
              <div className="text-center">
                <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
                  {activeModal === "ADD" ? "Add Child" : "Edit Profile"}
                </h2>
                <form className="space-y-4 mt-6" onSubmit={handleFormSubmit}>
                  <div className="flex flex-col items-center justify-center mb-6">
                    <div
                      className={`relative group mb-4 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      onClick={() =>
                        !isSubmitting && fileInputRef.current?.click()
                      }
                    >
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full bg-[#fdfcf8] border-4 border-gray-100 shadow-sm object-cover"
                      />
                      {!isSubmitting && (
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Upload className="text-white" size={24} />
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="flex gap-3 justify-center w-full">
                      {PREDEFINED_AVATARS.map((url, i) => (
                        <button
                          key={i}
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => setAvatarUrl(url)}
                          className={`w-12 h-12 rounded-full border-2 transition-all ${avatarUrl === url ? "border-[#FFC82C] scale-110 shadow-sm" : "border-transparent hover:scale-105 opacity-70 hover:opacity-100"} ${isSubmitting ? "cursor-not-allowed" : ""}`}
                        >
                          <img
                            src={url}
                            alt={`Icon ${i}`}
                            className="w-full h-full rounded-full object-cover bg-gray-50"
                          />
                        </button>
                      ))}
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 transition-all bg-gray-50 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:text-black hover:border-black hover:bg-white"}`}
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                  <InputField
                    name="name"
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Child's Nickname"
                    type="text"
                    icon={Smile}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      name="age"
                      disabled={isSubmitting}
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Age"
                      type="number"
                      icon={Calendar}
                    />
                    <SelectField
                      name="gender"
                      disabled={isSubmitting}
                      value={formData.gender}
                      onChange={handleInputChange}
                      label="Gender"
                      options={[
                        { value: "M", label: "Male" },
                        { value: "F", label: "Female" },
                        { value: "O", label: "Skip" },
                      ]}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-6 ${THEME.primaryYellow} ${THEME.textBlack} font-bold py-4 px-4 rounded-full ${isSubmitting ? "opacity-70 cursor-not-allowed" : THEME.primaryYellowHover} transition-colors text-lg flex justify-center items-center gap-2`}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    ) : null}
                    {isSubmitting
                      ? "Processing..."
                      : activeModal === "ADD"
                        ? "Create Profile"
                        : "Save Changes"}
                  </button>
                </form>
              </div>
            )}

            {activeModal === "LINK" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LinkIcon size={32} />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
                  Link Profile
                </h2>
                <p className="text-gray-500 font-medium text-sm mb-6">
                  Enter a code to connect a read-only profile.
                </p>
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <InputField
                    name="code"
                    disabled={isSubmitting}
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="e.g. CH-8X9P2"
                    type="text"
                    icon={User}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-6 ${THEME.primaryYellow} ${THEME.textBlack} font-bold py-4 px-4 rounded-full ${isSubmitting ? "opacity-70 cursor-not-allowed" : THEME.primaryYellowHover} transition-colors text-lg flex justify-center items-center gap-2`}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    ) : null}
                    {isSubmitting ? "Verifying Code..." : "Request Link"}
                  </button>
                </form>
              </div>
            )}

            {activeModal === "DELETE" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={32} />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
                  Delete Profile?
                </h2>
                <p className="text-gray-500 font-medium text-sm mb-8">
                  This action cannot be undone. All data and assessment history
                  for this profile will be permanently removed.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-100 text-gray-700 font-bold py-3.5 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    className="flex-1 bg-red-500 text-white font-bold py-3.5 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : null}
                    {isSubmitting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            )}

            {activeModal === "PLAY_WARNING" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play size={32} fill="currentColor" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
                  Enter Child Mode?
                </h2>
                <p className="text-gray-500 font-medium text-sm mb-8">
                  You are about to switch to the child's interface. To exit back
                  to the Parent Dashboard later, you will need to enter your
                  parent password.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-100 text-gray-700 font-bold py-3.5 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setActiveChild(
                        profiles.find((p) => p.id === selectedProfileId),
                      );
                      navigate("/child-dashboard");
                    }}
                    className={`flex-1 ${THEME.primaryYellow} ${THEME.textBlack} font-bold py-3.5 rounded-full hover:bg-[#E5B427] transition-colors flex items-center justify-center gap-2`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// FILE: src/views/Dashboards/ChildDashboard.jsx
// ============================================================================
const ChildDashboard = () => {
  const navigate = useNavigate();
  const { activeChild, globalStars } = useAppContext();

  const childName = activeChild?.name || "Child";
  const childAvatar = activeChild?.avatar || ASSETS.avatars.child1;

  const [isTestLocked, setIsTestLocked] = useState(true);
  const [countdown, setCountdown] = useState("");
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitPassword, setExitPassword] = useState("");
  const [exitError, setExitError] = useState(false);

  const handleExit = (e) => {
    e.preventDefault();
    navigate("/parent-dashboard");
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`min-h-screen ${THEME.bgBeige} font-sans relative overflow-hidden`}
    >
      <div className="relative z-10 max-w-4xl mx-auto p-6 py-10 flex flex-col min-h-screen">
        <header className="flex justify-between items-center mb-12">
          <button
            onClick={() => setShowExitModal(true)}
            className="bg-white border-2 border-gray-100 text-gray-600 px-5 py-3 rounded-full hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2 font-bold"
          >
            <Lock size={18} /> Exit
          </button>
          <div className="bg-white px-5 py-3 rounded-full font-black text-xl flex items-center shadow-sm border-2 border-gray-100 text-gray-800">
            <Star size={22} className="mr-2 text-yellow-400 fill-yellow-400" />{" "}
            {globalStars} Stars
          </div>
        </header>

        <div
          className="text-center mb-16 animate-in slide-in-from-top duration-700 cursor-pointer"
          onClick={() => setIsTestLocked(!isTestLocked)}
          title="Click to toggle lock state"
        >
          <img
            src={childAvatar}
            className="w-32 h-32 rounded-full mx-auto border-8 border-white shadow-sm mb-6 bg-[#b6e3f4] object-cover"
            alt={childName}
          />
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
            Hi, {childName}! 👋
          </h1>
          <p className="text-xl text-gray-500 mt-4 font-bold">
            What are we playing today?
          </p>
          <p className="text-xs text-gray-400 mt-2 font-medium">
            (Click name to toggle lock demo)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto mb-10 animate-in slide-in-from-bottom duration-700">
          <button
            disabled={isTestLocked}
            onClick={() =>
              !isTestLocked &&
              navigate("/game", {
                state: {
                  mode: "daily",
                  testQueue: [
                    "memory",
                    "reaction",
                    "color",
                    "hearing",
                    "drawing",
                  ],
                },
              })
            }
            className={`${isTestLocked ? "bg-gray-300 border-gray-400 cursor-not-allowed" : "bg-[#ff6b6b] border-[#e65a5a] hover:-translate-y-2"} text-white p-10 rounded-[2.5rem] shadow-sm transition-all flex flex-col items-center justify-center text-center group border-b-8`}
          >
            <div
              className={`${isTestLocked ? "bg-gray-400" : "bg-white/20 group-hover:scale-110"} p-6 rounded-full mb-6 transition-transform backdrop-blur-sm`}
            >
              {isTestLocked ? (
                <Lock className="w-14 h-14 text-white" />
              ) : (
                <Puzzle className="w-14 h-14 text-white" fill="currentColor" />
              )}
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-2">
              Daily Tests
            </h2>
            {isTestLocked ? (
              <div className="bg-gray-400/50 px-5 py-2.5 rounded-full mt-1">
                <p className="text-white font-bold text-lg flex items-center justify-center gap-2">
                  Next in {countdown}
                </p>
              </div>
            ) : (
              <p className="text-red-100 font-bold text-lg">
                Memory, Reaction & More!
              </p>
            )}
          </button>

          <button
            onClick={() => navigate("/free-play")}
            className="bg-[#4ade80] text-white p-10 rounded-[2.5rem] shadow-sm hover:-translate-y-2 transition-all flex flex-col items-center justify-center text-center group border-b-8 border-[#3bca70]"
          >
            <div className="bg-white/20 p-6 rounded-full mb-6 group-hover:scale-110 transition-transform backdrop-blur-sm">
              <Smile className="w-14 h-14 text-white" fill="currentColor" />
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-2">
              Free Play
            </h2>
            <p className="text-green-100 font-bold text-lg">
              Practice & Draw for Fun
            </p>
          </button>
        </div>
      </div>

      {/* Parent Gate Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`${THEME.cardWhite} w-full max-w-md p-8 md:p-10 relative animate-in zoom-in-95 duration-200`}
          >
            <button
              onClick={() => {
                setShowExitModal(false);
                setExitError(false);
                setExitPassword("");
              }}
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full"
            >
              <X size={20} />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={32} />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
                Parent Gate
              </h2>
              <p className="text-gray-500 mb-6 font-medium">
                Please enter your parent password to exit child mode.
              </p>

              <form onSubmit={handleExit} className="space-y-4">
                <InputField
                  type="password"
                  placeholder="Password (hint: 1234)"
                  icon={Lock}
                  value={exitPassword}
                  onChange={(e) => {
                    setExitPassword(e.target.value);
                    setExitError(false);
                  }}
                />
                {exitError && (
                  <p className="text-red-500 text-sm font-bold text-left px-4 -mt-2">
                    Incorrect password. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  className={`w-full mt-2 ${THEME.primaryYellow} ${THEME.textBlack} font-bold py-4 px-4 rounded-full ${THEME.primaryYellowHover} transition-colors text-lg`}
                >
                  Verify & Exit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// FILE: src/views/Games/GamifiedLoader.jsx
// ============================================================================
const GamifiedLoader = ({ delay = 3000 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const nextView = location.state?.nextView || "/";

  const [taps, setTaps] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(nextView);
    }, delay);
    return () => clearTimeout(timer);
  }, [navigate, nextView, delay]);

  const handleTap = () => {
    setTaps((prev) => prev + 1);
    try {
      const audio = new Audio(SOUNDS.click);
      audio.play().catch(() => {});
    } catch (e) {}
  };

  return (
    <div
      className={`min-h-screen ${THEME.bgBeige} flex flex-col items-center justify-center p-6 relative overflow-hidden touch-none select-none`}
      onPointerDown={handleTap}
    >
      <div
        className="absolute top-1/4 left-1/4 animate-bounce text-yellow-400"
        style={{ animationDuration: "2s" }}
      >
        <Star size={40} fill="currentColor" />
      </div>
      <div
        className="absolute bottom-1/4 right-1/4 animate-bounce text-blue-400"
        style={{ animationDuration: "1.5s" }}
      >
        <Puzzle size={40} fill="currentColor" />
      </div>
      <div
        className="absolute top-1/3 right-1/3 animate-ping text-pink-400"
        style={{ animationDuration: "3s" }}
      >
        <Heart size={30} fill="currentColor" />
      </div>

      <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-xl text-center z-10 flex flex-col items-center transform transition-transform active:scale-95 cursor-pointer">
        <div className="w-28 h-28 bg-gray-50 rounded-full flex items-center justify-center mb-6 relative">
          <div
            className={`absolute inset-0 border-4 border-yellow-400 border-t-transparent rounded-full ${taps > 5 ? "animate-spin-fast" : "animate-spin"}`}
            style={{ animationDuration: Math.max(0.2, 1 - taps * 0.05) + "s" }}
          ></div>
          <Sparkles
            className={`text-yellow-500 ${taps > 0 ? "animate-ping" : "animate-pulse"}`}
            size={48}
          />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">
          Loading...
        </h2>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
          Please Wait
        </p>

        <div className="bg-blue-50 text-blue-500 font-black px-4 py-2 rounded-full text-sm">
          Taps: {taps}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// FILE: src/views/Games/InteractiveGames.jsx
// ============================================================================
const FreePlayMenu = () => {
  const navigate = useNavigate();
  const { globalStars } = useAppContext();
  const [difficulty, setDifficulty] = useState("easy");

  return (
    <div className={`min-h-screen ${THEME.bgBeige} font-sans relative`}>
      <div className="max-w-4xl mx-auto p-6 py-10 flex flex-col h-full">
        <header className="flex justify-between items-center mb-10">
          <button
            onClick={() => navigate("/child-dashboard")}
            className="bg-white border-2 border-gray-100 text-gray-600 px-5 py-3 rounded-full hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2 font-bold"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <div className="bg-white px-5 py-2.5 rounded-full font-black text-lg flex items-center shadow-sm border-2 border-gray-100 text-gray-800">
            <Star size={20} className="mr-2 text-yellow-400 fill-yellow-400" />{" "}
            {globalStars} Stars
          </div>
        </header>

        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Choose a Game!
          </h1>
        </div>

        {/* Difficulty Selector */}
        <div className="flex justify-center mb-8 animate-in fade-in duration-500">
          <div className="bg-white rounded-full p-1.5 shadow-sm flex border border-gray-100 max-w-md w-full">
            {["easy", "medium", "hard"].map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`flex-1 py-3 rounded-full font-black text-sm capitalize transition-all ${difficulty === level ? THEME.primaryYellow + " text-black shadow-md scale-105" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 animate-in slide-in-from-bottom duration-500">
          <button
            onClick={() =>
              navigate("/game", {
                state: { mode: "free", gameId: "memory", difficulty },
              })
            }
            className="bg-[#86D293] text-white p-8 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-all flex flex-col items-center text-center border-b-8 border-[#5dbb6d]"
          >
            <div className="bg-white/20 p-5 rounded-full mb-4">
              <Brain size={48} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-black mb-2">Memory Match</h2>
            <p className="text-green-100 font-bold text-sm">
              Find the hidden pairs!
            </p>
          </button>

          <button
            onClick={() =>
              navigate("/game", {
                state: { mode: "free", gameId: "reaction", difficulty },
              })
            }
            className="bg-[#ff5e5e] text-white p-8 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-all flex flex-col items-center text-center border-b-8 border-[#e65a5a]"
          >
            <div className="bg-white/20 p-5 rounded-full mb-4">
              <Hand size={48} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-black mb-2">Reaction Bug</h2>
            <p className="text-red-100 font-bold text-sm">
              Tap bug as fast as you can!
            </p>
          </button>

          <button
            onClick={() =>
              navigate("/game", {
                state: { mode: "free", gameId: "color", difficulty },
              })
            }
            className="bg-[#60A5FA] text-white p-8 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-all flex flex-col items-center text-center border-b-8 border-[#3b82f6]"
          >
            <div className="bg-white/20 p-5 rounded-full mb-4">
              <Palette size={48} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-black mb-2">Color Explorer</h2>
            <p className="text-blue-100 font-bold text-sm">
              Find shapes hidden in colors!
            </p>
          </button>

          <button
            onClick={() =>
              navigate("/game", {
                state: { mode: "free", gameId: "hearing", difficulty },
              })
            }
            className="bg-[#a78bfa] text-white p-8 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-all flex flex-col items-center text-center border-b-8 border-[#8b5cf6]"
          >
            <div className="bg-white/20 p-5 rounded-full mb-4">
              <Ear size={48} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-black mb-2">Sound Explorer</h2>
            <p className="text-purple-100 font-bold text-sm">
              Listen and match the sounds!
            </p>
          </button>

          <button
            onClick={() =>
              navigate("/game", {
                state: { mode: "free", gameId: "drawing", difficulty },
              })
            }
            className="bg-[#fbbf24] text-white p-8 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-all flex flex-col items-center text-center border-b-8 border-[#f59e0b]"
          >
            <div className="bg-white/20 p-5 rounded-full mb-4">
              <PenTool size={48} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-black mb-2">Creative Canvas</h2>
            <p className="text-yellow-100 font-bold text-sm">
              Draw and upload pictures!
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// FILE: src/views/Games/components/MemoryGame.jsx
// ============================================================================
const MemoryGame = ({ onFinish, difficulty = "medium" }) => {
  const ALL_ICONS = ["🐶", "🐱", "🐭", "🐰", "🦊", "🐻", "🐸", "🐼"];
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isPreviewing, setIsPreviewing] = useState(true);
  const [previewTime, setPreviewTime] = useState(3);

  const [gameStartTime, setGameStartTime] = useState(null);
  const [pairTimestamps, setPairTimestamps] = useState([]);
  const [showDevMetrics, setShowDevMetrics] = useState(false);

  const targetPairs = difficulty === "easy" ? 3 : difficulty === "hard" ? 8 : 6;
  const gridColsClass = difficulty === "easy" ? "grid-cols-3" : "grid-cols-4";
  const cardSizeClass =
    difficulty === "easy"
      ? "text-5xl sm:text-6xl rounded-[1.5rem]"
      : "text-4xl sm:text-5xl rounded-xl";
  const iconSize = difficulty === "easy" ? 48 : 32;

  useEffect(() => {
    let pairCount = 6;
    let useJoker = false;

    if (difficulty === "easy") {
      pairCount = 3;
    }
    if (difficulty === "medium") {
      pairCount = 6;
      useJoker = false;
    }
    if (difficulty === "hard") {
      pairCount = 8;
    }

    const selectedIcons = ALL_ICONS.slice(0, pairCount);
    let deck = [...selectedIcons, ...selectedIcons].map((emoji, idx) => ({
      id: idx,
      emoji,
      isFlipped: true,
      isMatched: false,
      isJoker: false,
    }));

    if (useJoker) {
      deck.push({
        id: "joker",
        emoji: "🌟",
        isFlipped: true,
        isMatched: true,
        isJoker: true,
      });
    }
    deck.sort(() => Math.random() - 0.5);
    setCards(deck);

    let timeLeft = 3;
    const interval = setInterval(() => {
      timeLeft -= 1;
      setPreviewTime(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval);
        setCards((prevCards) =>
          prevCards.map((c) => ({ ...c, isFlipped: c.isJoker ? true : false })),
        );
        setIsPreviewing(false);
        setGameStartTime(Date.now());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [difficulty]);

  const handleCardClick = (index) => {
    if (
      isPreviewing ||
      flippedIndices.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    )
      return;

    playSound(SOUNDS.click);

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const currentMoves = moves + 1;
      setMoves(currentMoves);

      const currentClickTime = Date.now();
      const newTimestamps = [...pairTimestamps, currentClickTime];
      setPairTimestamps(newTimestamps);

      const match =
        newCards[newFlipped[0]].emoji === newCards[newFlipped[1]].emoji;

      if (match) {
        playSound(SOUNDS.match);
        newCards[newFlipped[0]] = {
          ...newCards[newFlipped[0]],
          isMatched: true,
        };
        newCards[newFlipped[1]] = {
          ...newCards[newFlipped[1]],
          isMatched: true,
        };
        setCards(newCards);
        setFlippedIndices([]);

        const currentMatches = matches + 1;
        setMatches(currentMatches);

        if (currentMatches === targetPairs) {
          const AR = ((currentMatches / currentMoves) * 100).toFixed(1);
          let sumDiff = 0;
          let prevT = gameStartTime;
          newTimestamps.forEach((t) => {
            sumDiff += t - prevT;
            prevT = t;
          });
          const ARL = (sumDiff / currentMoves / 1000).toFixed(2);

          setTimeout(
            () =>
              onFinish(Math.max(10, 50 - currentMoves), {
                AR,
                ARL,
                N: currentMoves,
                targetPairs: targetPairs,
              }),
            800,
          );
        }
      } else {
        setTimeout(() => {
          setCards((prevCards) => {
            const revertedCards = [...prevCards];
            if (revertedCards[newFlipped[0]])
              revertedCards[newFlipped[0]] = {
                ...revertedCards[newFlipped[0]],
                isFlipped: false,
              };
            if (revertedCards[newFlipped[1]])
              revertedCards[newFlipped[1]] = {
                ...revertedCards[newFlipped[1]],
                isFlipped: false,
              };
            return revertedCards;
          });
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const liveAR = moves === 0 ? 0 : ((matches / moves) * 100).toFixed(1);
  let liveSumDiff = 0;
  let livePrevT = gameStartTime;
  pairTimestamps.forEach((t) => {
    liveSumDiff += t - livePrevT;
    livePrevT = t;
  });
  const liveARL = moves === 0 ? 0 : (liveSumDiff / moves / 1000).toFixed(2);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto h-[60vh] relative">
      {IS_DEV && (
        <div className="absolute top-0 right-0 z-50 flex flex-col items-end transform translate-x-4 md:translate-x-12">
          <button
            onClick={() => setShowDevMetrics(!showDevMetrics)}
            className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 opacity-30 hover:opacity-100 transition-opacity"
          >
            {showDevMetrics ? "Hide Dev Metrics" : "Show Dev Metrics"}
          </button>
          {showDevMetrics && (
            <div className="bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-2xl shadow-xl border border-gray-700 w-52 text-left">
              <div className="font-bold text-white mb-2 border-b border-gray-700 pb-2">
                Live Dev Metrics
              </div>
              <div className="mb-1 text-blue-300">Metric A: Accuracy</div>
              <div className="mb-1 ml-2">- Target Pairs: {targetPairs}</div>
              <div className="mb-1 ml-2">- Correct: {matches}</div>
              <div className="mb-1 ml-2">- Selections: {moves}</div>
              <div className="mb-1 mt-2 pt-2 border-t border-gray-700">
                AR: <span className="text-white font-bold">{liveAR}%</span>
              </div>
              <div>
                ARL: <span className="text-white font-bold">{liveARL}s</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="h-16 w-full flex justify-center items-center mb-4">
        {isPreviewing && (
          <div className="bg-white px-8 py-3 rounded-full shadow-md text-[#FFC82C] font-black text-2xl animate-bounce border-2 border-[#FFC82C]">
            Memorize! ({previewTime}s)
          </div>
        )}
      </div>
      <div
        className={`grid ${gridColsClass} gap-3 md:gap-4 w-full px-4 touch-none select-none`}
      >
        {cards.map((card, idx) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(idx)}
            className={`aspect-square ${cardSizeClass} flex items-center justify-center cursor-pointer select-none transition-all duration-300 transform-gpu will-change-transform ${card.isFlipped || card.isMatched ? "bg-white shadow-md rotate-y-180" : "bg-[#FFC82C] border-b-8 border-[#E5B427] hover:scale-105"} ${card.isJoker ? "opacity-80" : ""}`}
          >
            {card.isFlipped || card.isMatched ? (
              card.emoji
            ) : (
              <Puzzle
                size={iconSize}
                className="text-yellow-600/30 pointer-events-none"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// FILE: src/views/Games/components/ReactionGame.jsx
// ============================================================================
const ReactionGame = ({ onFinish, difficulty = "medium" }) => {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [totalTaps, setTotalTaps] = useState(0);

  const initialTime =
    difficulty === "easy" ? 20 : difficulty === "hard" ? 10 : 12;
  const bugSizeClass =
    difficulty === "easy"
      ? "w-28 h-28"
      : difficulty === "hard"
        ? "w-12 h-12"
        : "w-16 h-16";
  const bugIconSize =
    difficulty === "easy" ? 56 : difficulty === "hard" ? 24 : 32;

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPlaying, setIsPlaying] = useState(false);

  const [appearTime, setAppearTime] = useState(null);
  const [sumResponseTime, setSumResponseTime] = useState(0);
  const [showDevMetrics, setShowDevMetrics] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && isPlaying) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      const PI =
        totalTaps === 0
          ? "0.0"
          : ((successfulHits / totalTaps) * 100).toFixed(1);
      const MRT =
        successfulHits === 0
          ? "0"
          : (sumResponseTime / successfulHits).toFixed(0);
      onFinish(successfulHits * 10, {
        MRT,
        PI,
        totalHits: successfulHits,
        totalTaps,
      });
    }
  }, [timeLeft, isPlaying]);

  const moveTarget = () => {
    setPosition({
      top: `${Math.random() * 70 + 10}%`,
      left: `${Math.random() * 70 + 10}%`,
    });
    setAppearTime(Date.now());
  };

  const handleStart = (e) => {
    e.stopPropagation();
    setIsPlaying(true);
    moveTarget();
  };

  const handleContainerTap = (e) => {
    if (isPlaying && timeLeft > 0) {
      setTotalTaps((t) => t + 1);
    }
  };

  const handleBugTap = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isPlaying || timeLeft === 0) return;

    playSound(SOUNDS.click);

    if (appearTime) {
      const rt = Date.now() - appearTime;
      setSumResponseTime((prev) => prev + rt);
    }

    setTotalTaps((t) => t + 1);
    setSuccessfulHits((s) => s + 1);
    moveTarget();
  };

  const livePI =
    totalTaps === 0 ? "0.0" : ((successfulHits / totalTaps) * 100).toFixed(1);
  const liveMRT =
    successfulHits === 0 ? "0" : (sumResponseTime / successfulHits).toFixed(0);

  return (
    <div
      onPointerDown={handleContainerTap}
      className="flex flex-col items-center w-full h-[60vh] bg-white rounded-3xl border-4 border-dashed border-gray-200 relative overflow-hidden cursor-crosshair touch-none select-none"
    >
      {IS_DEV && (
        <div className="absolute top-4 right-4 z-50 flex flex-col items-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDevMetrics(!showDevMetrics);
            }}
            className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 opacity-30 hover:opacity-100 transition-opacity"
          >
            {showDevMetrics ? "Hide Dev Metrics" : "Show Dev Metrics"}
          </button>
          {showDevMetrics && (
            <div
              className="bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-2xl shadow-xl border border-gray-700 w-52 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-bold text-white mb-2 border-b border-gray-700 pb-2">
                Live Dev Metrics
              </div>
              <div className="mb-1 text-blue-300">Metric A: Precision</div>
              <div className="mb-1 ml-2">- Hits: {successfulHits}</div>
              <div className="mb-1 ml-2">- Selections: {totalTaps}</div>
              <div className="mb-1 mt-2 pt-2 border-t border-gray-700">
                PI: <span className="text-white font-bold">{livePI}%</span>
              </div>
              <div>
                MRT: <span className="text-white font-bold">{liveMRT}ms</span>
              </div>
            </div>
          )}
        </div>
      )}

      {!isPlaying ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
          <button
            onClick={handleStart}
            className={`${THEME.primaryYellow} ${THEME.textBlack} font-black text-2xl px-10 py-5 rounded-full shadow-sm hover:scale-105 transition-all animate-bounce`}
          >
            START!
          </button>
        </div>
      ) : (
        <div className="absolute top-4 left-4 bg-gray-100 px-4 py-2 rounded-full font-bold text-gray-600 flex items-center gap-2 z-10 pointer-events-none">
          <Timer size={18} /> {timeLeft}s
        </div>
      )}

      <button
        onPointerDown={handleBugTap}
        style={{
          top: position.top,
          left: position.left,
          transform: "translate(-50%, -50%)",
        }}
        className={`absolute ${bugSizeClass} bg-[#ff5e5e] rounded-full flex items-center justify-center shadow-lg active:scale-75 transition-transform transform-gpu will-change-transform`}
      >
        <Bug size={bugIconSize} className="text-white pointer-events-none" />
      </button>
    </div>
  );
};

// ============================================================================
// FILE: src/views/Games/components/ColorGame.jsx
// ============================================================================
const ColorGame = ({ onFinish, difficulty = "medium" }) => {
  const SHAPES = [
    { id: "heart", Icon: Heart },
    { id: "star", Icon: Star },
    { id: "circle", Icon: Circle },
    { id: "square", Icon: Square },
    { id: "triangle", Icon: Triangle },
  ];

  const COLOR_VARIANTS = {
    Red: [
      { bg: "#fee2e2", fg: "#dc2626" },
      { bg: "#fca5a5", fg: "#ef4444" },
      { bg: "#f87171", fg: "#ef4444" },
    ],
    Green: [
      { bg: "#dcfce7", fg: "#16a34a" },
      { bg: "#86efac", fg: "#22c55e" },
      { bg: "#4ade80", fg: "#22c55e" },
    ],
    Blue: [
      { bg: "#dbeafe", fg: "#2563eb" },
      { bg: "#93c5fd", fg: "#3b82f6" },
      { bg: "#60a5fa", fg: "#3b82f6" },
    ],
  };

  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [totalSelections, setTotalSelections] = useState(0);
  const [correctIdentifications, setCorrectIdentifications] = useState(0);
  const [colorStats, setColorStats] = useState({
    Red: { prompts: 0, hits: 0 },
    Green: { prompts: 0, hits: 0 },
    Blue: { prompts: 0, hits: 0 },
  });
  const [showDevMetrics, setShowDevMetrics] = useState(false);

  useEffect(() => {
    let pool = [];
    if (difficulty === "easy") {
      pool = [
        { color: "Red", diff: 0 },
        { color: "Green", diff: 0 },
        { color: "Blue", diff: 0 },
        { color: "Red", diff: 0 },
      ].sort(() => Math.random() - 0.5);
    } else if (difficulty === "hard") {
      pool = [
        { color: "Red", diff: 2 },
        { color: "Green", diff: 2 },
        { color: "Blue", diff: 2 },
        { color: "Red", diff: 2 },
        { color: "Green", diff: 2 },
        { color: "Blue", diff: 2 },
        { color: "Red", diff: 2 },
        { color: "Green", diff: 2 },
      ].sort(() => Math.random() - 0.5);
    } else {
      pool = [
        { color: "Red", diff: 1 },
        { color: "Red", diff: 2 },
        { color: "Green", diff: 1 },
        { color: "Green", diff: 2 },
        { color: "Blue", diff: 1 },
        { color: "Blue", diff: 2 },
      ].sort(() => Math.random() - 0.5);
    }

    const generatedRounds = pool.map((item) => {
      const targetShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const options = [...SHAPES].sort(() => Math.random() - 0.5).slice(0, 4);
      if (!options.find((o) => o.id === targetShape.id)) {
        options[0] = targetShape;
        options.sort(() => Math.random() - 0.5);
      }
      return {
        color: item.color,
        diff: item.diff,
        variant: COLOR_VARIANTS[item.color][item.diff],
        targetShape,
        options,
      };
    });
    setRounds(generatedRounds);
  }, [difficulty]);

  const handleOptionClick = (shapeId) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const roundData = rounds[currentRound];
    const isCorrect = shapeId === roundData.targetShape.id;

    playSound(isCorrect ? SOUNDS.match : SOUNDS.click);

    const newTotalSelections = totalSelections + 1;
    setTotalSelections(newTotalSelections);

    const newColorStats = {
      ...colorStats,
      [roundData.color]: {
        prompts: colorStats[roundData.color].prompts + 1,
        hits: isCorrect
          ? colorStats[roundData.color].hits + 1
          : colorStats[roundData.color].hits,
      },
    };
    setColorStats(newColorStats);

    const newCorrectIdentifications = isCorrect
      ? correctIdentifications + 1
      : correctIdentifications;
    setCorrectIdentifications(newCorrectIdentifications);

    if (currentRound + 1 >= rounds.length) {
      const AR = (
        (newCorrectIdentifications / newTotalSelections) *
        100
      ).toFixed(1);
      const RedProfile =
        newColorStats.Red.prompts === 0
          ? "0.0"
          : (
              (newColorStats.Red.hits / newColorStats.Red.prompts) *
              100
            ).toFixed(1);
      const GreenProfile =
        newColorStats.Green.prompts === 0
          ? "0.0"
          : (
              (newColorStats.Green.hits / newColorStats.Green.prompts) *
              100
            ).toFixed(1);
      const BlueProfile =
        newColorStats.Blue.prompts === 0
          ? "0.0"
          : (
              (newColorStats.Blue.hits / newColorStats.Blue.prompts) *
              100
            ).toFixed(1);

      setTimeout(() => {
        onFinish(newCorrectIdentifications * 10, {
          AR,
          RedProfile,
          GreenProfile,
          BlueProfile,
          correctIdentifications: newCorrectIdentifications,
          totalSelections: newTotalSelections,
          rawColorStats: newColorStats,
        });
      }, 500);
    } else {
      setTimeout(() => {
        setCurrentRound((curr) => curr + 1);
        setIsTransitioning(false);
      }, 500);
    }
  };

  if (rounds.length === 0) return null;

  const roundData = rounds[currentRound];
  const TargetIcon = roundData.targetShape.Icon;

  const liveAR =
    totalSelections === 0
      ? "0.0"
      : ((correctIdentifications / totalSelections) * 100).toFixed(1);
  const liveRedPI =
    colorStats.Red.prompts === 0
      ? "0.0"
      : ((colorStats.Red.hits / colorStats.Red.prompts) * 100).toFixed(1);
  const liveGreenPI =
    colorStats.Green.prompts === 0
      ? "0.0"
      : ((colorStats.Green.hits / colorStats.Green.prompts) * 100).toFixed(1);
  const liveBluePI =
    colorStats.Blue.prompts === 0
      ? "0.0"
      : ((colorStats.Blue.hits / colorStats.Blue.prompts) * 100).toFixed(1);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto relative h-[70vh]">
      {IS_DEV && (
        <div className="absolute top-[-30px] right-0 z-50 flex flex-col items-end transform translate-x-4 md:translate-x-12">
          <button
            onClick={() => setShowDevMetrics(!showDevMetrics)}
            className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 opacity-30 hover:opacity-100 transition-opacity"
          >
            {showDevMetrics ? "Hide Dev Metrics" : "Show Dev Metrics"}
          </button>
          {showDevMetrics && (
            <div className="bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-2xl shadow-xl border border-gray-700 w-56 text-left">
              <div className="font-bold text-white mb-2 border-b border-gray-700 pb-2">
                Live Color Metrics
              </div>
              <div className="mb-1 text-blue-300">Metric A: Accuracy</div>
              <div className="mb-1 ml-2">- Hits: {correctIdentifications}</div>
              <div className="mb-1 ml-2">- Taps: {totalSelections}</div>
              <div className="mb-2">
                AR: <span className="text-white font-bold">{liveAR}%</span>
              </div>
              <div className="pt-2 border-t border-gray-700 text-blue-300 mb-1">
                Metric B: RGB Success
              </div>
              <div className="text-red-400">
                Red: {liveRedPI}% ({colorStats.Red.hits}/
                {colorStats.Red.prompts})
              </div>
              <div className="text-green-400">
                Green: {liveGreenPI}% ({colorStats.Green.hits}/
                {colorStats.Green.prompts})
              </div>
              <div className="text-blue-400">
                Blue: {liveBluePI}% ({colorStats.Blue.hits}/
                {colorStats.Blue.prompts})
              </div>
            </div>
          )}
        </div>
      )}

      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-gray-800">
          Find the hidden shape!
        </h2>
        <p className="text-gray-500 font-bold text-sm">
          Round {currentRound + 1} of {rounds.length}
        </p>
      </div>

      <div
        className={`relative w-full max-w-[250px] aspect-square rounded-[3rem] flex items-center justify-center shadow-inner mb-8 transition-colors duration-500 select-none overflow-hidden`}
        style={{ backgroundColor: roundData.variant.bg }}
      >
        <TargetIcon
          size={difficulty === "hard" ? 90 : 120}
          style={{
            color: roundData.variant.fg,
            opacity: roundData.diff === 2 ? 0.8 : 1,
          }}
          className="transition-colors duration-500 pointer-events-none relative z-0 transform-gpu will-change-transform"
          fill="currentColor"
        />
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-all duration-500 transform-gpu"
          style={{
            backgroundImage: `radial-gradient(${difficulty === "hard" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)"} 4px, transparent 4px)`,
            backgroundSize:
              difficulty === "easy"
                ? "30px 30px"
                : difficulty === "hard"
                  ? "12px 12px"
                  : "16px 16px",
          }}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full touch-none select-none">
        {roundData.options.map((opt) => {
          const OptionIcon = opt.Icon;
          return (
            <button
              key={opt.id}
              onPointerDown={() => handleOptionClick(opt.id)}
              className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-gray-200 hover:-translate-y-1 active:translate-y-0 active:border-b-0 transition-transform transform-gpu will-change-transform flex justify-center items-center select-none"
            >
              <OptionIcon
                size={40}
                className="text-gray-400 pointer-events-none"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// FILE: src/views/Games/components/HearingGame.jsx
// ============================================================================
const HearingGame = ({ onFinish, difficulty = "medium" }) => {
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const audioRef = useRef(null);

  const [audioEndTime, setAudioEndTime] = useState(null);
  const [correctIdentifications, setCorrectIdentifications] = useState(0);
  const [totalSoundsPlayed, setTotalSoundsPlayed] = useState(0);
  const [sumLatency, setSumLatency] = useState(0);
  const [showDevMetrics, setShowDevMetrics] = useState(false);

  useEffect(() => {
    const numOptions =
      difficulty === "easy" ? 3 : difficulty === "hard" ? 8 : 6;
    const numRounds = difficulty === "easy" ? 4 : difficulty === "hard" ? 8 : 6;

    const generatedRounds = [];
    for (let i = 0; i < numRounds; i++) {
      const shuffled = [...HEARING_ITEMS].sort(() => Math.random() - 0.5);
      const options = shuffled.slice(0, numOptions);
      const targetItem = options[Math.floor(Math.random() * numOptions)];
      generatedRounds.push({ options, targetItem });
    }
    setRounds(generatedRounds);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [difficulty]);

  const playCurrentSound = () => {
    if (isPlaying || isTransitioning) return;
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const newAudio = new Audio(rounds[currentRound].targetItem.sound);
    audioRef.current = newAudio;
    newAudio.onended = () => {
      setIsPlaying(false);
      setHasPlayed(true);
      setAudioEndTime(Date.now());
    };
    newAudio.play().catch((e) => {
      setIsPlaying(false);
      setHasPlayed(true);
      setAudioEndTime(Date.now());
    });
  };

  const handleOptionClick = (itemId) => {
    if (!hasPlayed || isPlaying || isTransitioning) return;
    setIsTransitioning(true);

    const roundData = rounds[currentRound];
    const isCorrect = itemId === roundData.targetItem.id;
    playSound(isCorrect ? SOUNDS.match : SOUNDS.click);

    const latency = Date.now() - audioEndTime;
    const newSumLatency = sumLatency + latency;
    setSumLatency(newSumLatency);

    const newCorrect = isCorrect
      ? correctIdentifications + 1
      : correctIdentifications;
    setCorrectIdentifications(newCorrect);

    const newTotalPlayed = totalSoundsPlayed + 1;
    setTotalSoundsPlayed(newTotalPlayed);

    if (currentRound + 1 >= rounds.length) {
      const ISR = ((newCorrect / newTotalPlayed) * 100).toFixed(1);
      const AARL = (newSumLatency / newTotalPlayed / 1000).toFixed(2);
      setTimeout(() => {
        onFinish(newCorrect * 10, {
          ISR,
          AARL,
          correctIdentifications: newCorrect,
          totalPlayed: newTotalPlayed,
        });
      }, 500);
    } else {
      setTimeout(() => {
        setCurrentRound((curr) => curr + 1);
        setHasPlayed(false);
        setAudioEndTime(null);
        setIsTransitioning(false);
      }, 500);
    }
  };

  if (rounds.length === 0) return null;

  const roundData = rounds[currentRound];
  const gridColsClass =
    roundData.options.length > 6
      ? "grid-cols-4"
      : roundData.options.length > 4
        ? "grid-cols-3"
        : "grid-cols-2";

  const liveISR =
    totalSoundsPlayed === 0
      ? "0.0"
      : ((correctIdentifications / totalSoundsPlayed) * 100).toFixed(1);
  const liveAARL =
    totalSoundsPlayed === 0
      ? "0.00"
      : (sumLatency / totalSoundsPlayed / 1000).toFixed(2);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto relative h-[70vh]">
      {IS_DEV && (
        <div className="absolute top-[-30px] right-0 z-50 flex flex-col items-end transform translate-x-4 md:translate-x-12">
          <button
            onClick={() => setShowDevMetrics(!showDevMetrics)}
            className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 opacity-30 hover:opacity-100 transition-opacity"
          >
            {showDevMetrics ? "Hide Dev Metrics" : "Show Dev Metrics"}
          </button>
          {showDevMetrics && (
            <div className="bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-2xl shadow-xl border border-gray-700 w-56 text-left">
              <div className="font-bold text-white mb-2 border-b border-gray-700 pb-2">
                Live Audio Metrics
              </div>
              <div className="mb-1 text-blue-300">Metric A: Success Rate</div>
              <div className="mb-1 ml-2">
                - Correct: {correctIdentifications}
              </div>
              <div className="mb-1 ml-2">
                - Sounds Played: {totalSoundsPlayed}
              </div>
              <div className="mb-2">
                ISR: <span className="text-white font-bold">{liveISR}%</span>
              </div>
              <div className="pt-2 border-t border-gray-700 text-blue-300 mb-1">
                Metric B: Latency
              </div>
              <div>
                AARL: <span className="text-white font-bold">{liveAARL}s</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-gray-800">
          Who makes this sound?
        </h2>
        <p className="text-gray-500 font-bold text-sm">
          Sound {currentRound + 1} of {rounds.length}
        </p>
      </div>

      <button
        onClick={playCurrentSound}
        disabled={isPlaying}
        className={`w-32 h-32 rounded-full shadow-lg flex items-center justify-center mb-8 transition-all select-none transform-gpu will-change-transform ${isPlaying ? "bg-purple-100 animate-pulse border-4 border-purple-400" : "bg-[#a78bfa] hover:bg-[#9061f9] hover:scale-105 active:scale-95"}`}
      >
        <Volume2
          size={48}
          className={isPlaying ? "text-purple-600" : "text-white"}
        />
      </button>

      <div
        className={`grid ${gridColsClass} gap-4 w-full transition-opacity duration-300 touch-none select-none ${!hasPlayed || isPlaying ? "opacity-30 pointer-events-none" : "opacity-100"}`}
      >
        {roundData.options.map((opt) => (
          <button
            key={opt.id}
            onPointerDown={() => handleOptionClick(opt.id)}
            className={`bg-white ${roundData.options.length > 6 ? "p-4 text-4xl" : "p-6 text-5xl"} rounded-3xl shadow-sm border-b-4 border-gray-200 hover:-translate-y-1 active:translate-y-0 active:border-b-0 transition-transform transform-gpu will-change-transform flex justify-center items-center select-none`}
          >
            {opt.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// FILE: src/views/Games/components/DrawingGame.jsx
// ============================================================================
const DrawingGame = ({ onFinish }) => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#1F2937");
  const [sizeIndex, setSizeIndex] = useState(1);
  const [isEraser, setIsEraser] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [showDevMetrics, setShowDevMetrics] = useState(false);

  const COLORS = [
    "#1F2937",
    "#ef4444",
    "#22c55e",
    "#3b82f6",
    "#eab308",
    "#a855f7",
    "#ec4899",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);

    const penSizes = [5, 12, 24];
    const eraserSizes = [20, 50, 100];

    ctx.strokeStyle = isEraser ? "#ffffff" : color;
    ctx.lineWidth = isEraser ? eraserSizes[sizeIndex] : penSizes[sizeIndex];
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setStrokeCount((s) => s + 1);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setStrokeCount(0);
    playSound(SOUNDS.click);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          const scale = Math.min(
            canvas.width / img.width,
            canvas.height / img.height,
          );
          const x = canvas.width / 2 - (img.width / 2) * scale;
          const y = canvas.height / 2 - (img.height / 2) * scale;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          setStrokeCount((s) => s + 1);
          playSound(SOUNDS.click);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDone = () => {
    playSound(SOUNDS.match);
    const dataUrl = canvasRef.current.toDataURL("image/png");
    onFinish(100, {
      type: "drawing",
      expression: [
        "Happy 😊",
        "Focused 🤔",
        "Relaxed 😌",
        "Excited 🤩",
        "Nervous 😟",
      ][Math.floor(Math.random() * 5)],
      imageBase64: dataUrl,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto relative">
      {IS_DEV && (
        <div className="absolute top-[-40px] right-0 z-50 flex flex-col items-end transform translate-x-4 md:translate-x-12">
          <button
            onClick={() => setShowDevMetrics(!showDevMetrics)}
            className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 opacity-30 hover:opacity-100 transition-opacity"
          >
            {showDevMetrics ? "Hide Dev Metrics" : "Show Dev Metrics"}
          </button>
          {showDevMetrics && (
            <div className="bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-2xl shadow-xl border border-gray-700 w-56 text-left">
              <div className="font-bold text-white mb-2 border-b border-gray-700 pb-2">
                Live Drawing Metrics
              </div>
              <div className="mb-1 text-blue-300">Metric: Interactions</div>
              <div>
                Total Strokes/Uploads:{" "}
                <span className="text-white font-bold">{strokeCount}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="w-full bg-white rounded-[2.5rem] shadow-sm border-4 border-gray-200 overflow-hidden mb-6 relative">
        <canvas
          ref={canvasRef}
          className="w-full touch-none cursor-crosshair object-cover"
          style={{ aspectRatio: "4/3" }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="w-full bg-white p-4 md:px-8 md:py-5 rounded-[2rem] shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-center mb-8">
        <div className="flex justify-between items-center w-full md:w-auto gap-6 md:border-r md:border-gray-200 md:pr-8">
          <div className="flex gap-2">
            <button
              onClick={() => setIsEraser(false)}
              className={`p-3 rounded-xl transition-colors ${!isEraser ? "bg-yellow-100 text-yellow-600 shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
              title="Pen"
            >
              <PenTool size={24} />
            </button>
            <button
              onClick={() => setIsEraser(true)}
              className={`p-3 rounded-xl transition-colors ${isEraser ? "bg-yellow-100 text-yellow-600 shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
              title="Eraser"
            >
              <Eraser size={24} />
            </button>
          </div>

          <div className="flex gap-2 items-center bg-gray-50 p-2 rounded-2xl">
            {[0, 1, 2].map((idx) => {
              const displaySize = [8, 14, 22][idx];
              return (
                <button
                  key={idx}
                  onClick={() => setSizeIndex(idx)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${sizeIndex === idx ? "bg-white shadow-sm border border-gray-200" : "hover:bg-gray-200"}`}
                  title={`Size ${idx + 1}`}
                >
                  <div
                    className={`rounded-full ${isEraser ? "border-2 border-gray-400 bg-white" : "bg-gray-800"}`}
                    style={{ width: displaySize, height: displaySize }}
                  ></div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full md:w-auto">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setIsEraser(false);
              }}
              className={`w-10 h-10 rounded-full border-2 transition-all ${color === c && !isEraser ? "scale-110 shadow-md border-gray-400" : "border-transparent hover:scale-105"}`}
              style={{ backgroundColor: c }}
              title="Color"
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4 w-full justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={clearCanvas}
            className="bg-gray-100 text-gray-600 p-4 rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
            title="Clear Canvas"
          >
            <Trash2 size={24} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gray-100 text-gray-600 p-4 rounded-full shadow-sm hover:bg-blue-50 hover:text-blue-500 transition-colors"
            title="Upload Image"
          >
            <Upload size={24} />
          </button>
        </div>
        <button
          onClick={handleDone}
          className="flex-1 bg-[#fbbf24] text-white font-black text-xl py-4 px-6 rounded-full shadow-sm hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Save size={24} /> Done
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// FILE: src/views/Games/GamePlay.jsx
// ============================================================================
const GamePlay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const { globalStars, setGlobalStars, testDifficulties, setTestDifficulties } =
    useAppContext();

  const mode = state.mode || "free";
  const testQueue = state.testQueue || [];

  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [dailyResults, setDailyResults] = useState({});
  const [sessionStarsEarned, setSessionStarsEarned] = useState(0);
  const [hasStartedDaily, setHasStartedDaily] = useState(false);

  const currentGameId =
    mode === "daily" ? testQueue[currentTestIndex] : state.gameId;

  const difficultyRef = useRef(
    mode === "daily"
      ? testDifficulties[currentGameId] || "easy"
      : state.difficulty || "easy",
  );
  const prevTestIndexRef = useRef(currentTestIndex);

  if (currentTestIndex !== prevTestIndexRef.current) {
    difficultyRef.current =
      mode === "daily"
        ? testDifficulties[currentGameId] || "easy"
        : state.difficulty || "easy";
    prevTestIndexRef.current = currentTestIndex;
  }
  const currentDifficulty = difficultyRef.current;

  const [gameOver, setGameOver] = useState(false);
  const [devMetrics, setDevMetrics] = useState(null);
  const [isFestival, setIsFestival] = useState(false);

  if (!currentGameId) return null;

  const gameDetails = {
    memory: {
      title: "Memory Match",
      color: "bg-[#86D293]",
      textColor: "text-[#86D293]",
      icon: <Brain size={24} fill="currentColor" />,
    },
    reaction: {
      title: "Reaction Bug",
      color: "bg-[#ff5e5e]",
      textColor: "text-[#ff5e5e]",
      icon: <Hand size={24} fill="currentColor" />,
    },
    color: {
      title: "Color Explorer",
      color: "bg-[#60A5FA]",
      textColor: "text-[#60A5FA]",
      icon: <Palette size={24} fill="currentColor" />,
    },
    hearing: {
      title: "Sound Explorer",
      color: "bg-[#a78bfa]",
      textColor: "text-[#a78bfa]",
      icon: <Ear size={24} fill="currentColor" />,
    },
    drawing: {
      title: "Creative Canvas",
      color: "bg-[#fbbf24]",
      textColor: "text-[#fbbf24]",
      icon: <PenTool size={24} fill="currentColor" />,
    },
  }[currentGameId];

  const handleFinish = (score, metrics) => {
    let isGoodGame = false;

    if (metrics) {
      if (metrics.type === "drawing") {
        isGoodGame = true;
      } else if (metrics.RedProfile !== undefined) {
        const arValue = parseFloat(metrics.AR);
        const rgbSum =
          parseFloat(metrics.RedProfile) +
          parseFloat(metrics.GreenProfile) +
          parseFloat(metrics.BlueProfile);
        isGoodGame = arValue >= 50 && rgbSum >= 50;
      } else if (metrics.ISR !== undefined) {
        const isrValue = parseFloat(metrics.ISR);
        const aarlValue = parseFloat(metrics.AARL);
        isGoodGame = isrValue >= 50 && aarlValue > 0 && aarlValue <= 3.0;
      } else if (metrics.AR !== undefined) {
        const arValue = parseFloat(metrics.AR);
        const arlValue = parseFloat(metrics.ARL);
        isGoodGame = arValue >= 50 && arlValue > 0 && arlValue <= 2.5;
      } else if (metrics.MRT !== undefined) {
        const piValue = parseFloat(metrics.PI);
        const mrtValue = parseFloat(metrics.MRT);
        isGoodGame = piValue >= 50 && mrtValue > 0 && mrtValue <= 1500;
      }
    } else {
      isGoodGame = score > 50;
    }

    if (mode === "free") {
      setDevMetrics(metrics);
      setGameOver(true);
      if (isGoodGame) {
        setIsFestival(true);
        playSound(SOUNDS.win);
      }
    } else if (mode === "daily") {
      let starDelta = 0;
      if (metrics?.type === "drawing") {
        starDelta = 2;
        setIsFestival(true);
        playSound(SOUNDS.win);
      } else if (isGoodGame) {
        starDelta =
          currentDifficulty === "hard"
            ? 7
            : currentDifficulty === "medium"
              ? 5
              : 3;
        setIsFestival(true);
        playSound(SOUNDS.win);
      } else {
        starDelta =
          currentDifficulty === "hard"
            ? -3
            : currentDifficulty === "medium"
              ? -2
              : -1;
      }

      const newSessionTotal = sessionStarsEarned + starDelta;
      setSessionStarsEarned(newSessionTotal);

      if (currentGameId !== "drawing") {
        setTestDifficulties((prev) => {
          const diff = prev[currentGameId];
          let newDiff = diff;
          if (isGoodGame) {
            if (diff === "easy") newDiff = "medium";
            else if (diff === "medium") newDiff = "hard";
          } else {
            if (diff === "hard") newDiff = "medium";
            else if (diff === "medium") newDiff = "easy";
          }
          return { ...prev, [currentGameId]: newDiff };
        });
      }

      const updatedResults = {
        ...dailyResults,
        [currentGameId]: { score, metrics, starDelta },
      };
      setDailyResults(updatedResults);

      if (currentTestIndex < testQueue.length - 1) {
        if (isGoodGame || metrics?.type === "drawing") {
          setTimeout(() => {
            setIsFestival(false);
            setCurrentTestIndex((prev) => prev + 1);
          }, 2500);
        } else {
          setCurrentTestIndex((prev) => prev + 1);
        }
      } else {
        setDevMetrics(updatedResults);
        const endDailySequence = () => {
          setGlobalStars((prev) => Math.max(0, prev + newSessionTotal));
          setGameOver(true);
        };
        if (isGoodGame || metrics?.type === "drawing") {
          setTimeout(() => {
            endDailySequence();
          }, 2500);
        } else {
          endDailySequence();
        }
      }
    }
  };

  if (gameOver) {
    let feedbackMessage = "Great Practice!";
    if (mode === "daily") {
      feedbackMessage = "Daily Tests Complete! 🌟";
    } else if (devMetrics) {
      if (devMetrics.type === "drawing") {
        feedbackMessage = "Beautiful Artwork! 🎨";
      } else if (devMetrics.RedProfile !== undefined) {
        const arValue = parseFloat(devMetrics.AR);
        if (arValue >= 100) feedbackMessage = "Eagle Eye! 🦅";
        else if (arValue >= 80) feedbackMessage = "Sharp Vision! 👁️";
        else if (arValue >= 50) feedbackMessage = "Great Spotting! 🎨";
        else feedbackMessage = "Good Try! Look closer next time! 💪";
      } else if (devMetrics.ISR !== undefined) {
        const isrValue = parseFloat(devMetrics.ISR);
        if (isrValue >= 100) feedbackMessage = "Perfect Hearing! 🦇";
        else if (isrValue >= 80) feedbackMessage = "Super Listener! 👂";
        else if (isrValue >= 50)
          feedbackMessage = "Great Job! Keep Listening! 👍";
        else feedbackMessage = "Good Try! Listen closely next time! 💪";
      } else if (devMetrics.AR !== undefined) {
        const arValue = parseFloat(devMetrics.AR);
        if (arValue >= 100) feedbackMessage = "Perfect Memory! 🌟";
        else if (arValue >= 80) feedbackMessage = "Amazing Recall! 🧠";
        else if (arValue >= 50)
          feedbackMessage = "Great Job! Keep Practicing! 👍";
        else feedbackMessage = "Good Try! You'll get it next time! 💪";
      } else if (devMetrics.PI !== undefined) {
        const piValue = parseFloat(devMetrics.PI);
        const mrtValue = parseFloat(devMetrics.MRT);
        if (piValue >= 80 && mrtValue < 1000)
          feedbackMessage = "Lightning Fast Precision! ⚡";
        else if (piValue >= 50 && mrtValue < 1500)
          feedbackMessage = "Great Reflexes! 🏃";
        else feedbackMessage = "Nice Try! Let's play again! 💪";
      }
    }

    return (
      <div
        className={`min-h-screen ${THEME.bgBeige} flex flex-col items-center justify-center p-6 relative overflow-y-auto`}
      >
        {isFestival && <Confetti />}
        <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl text-center max-w-md w-full animate-in zoom-in duration-500 relative z-10 my-8">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy size={48} className="text-yellow-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
            {feedbackMessage}
          </h1>

          {mode === "daily" ? (
            <div className="mb-8">
              <p className="text-xl text-gray-500 font-bold mb-2">
                Today's Session Result:
              </p>
              <p className="text-3xl font-black text-gray-800">
                {sessionStarsEarned > 0 ? "+" : ""}
                {sessionStarsEarned}{" "}
                <Star
                  size={28}
                  className="inline text-yellow-500 fill-yellow-500 mb-1"
                />
              </p>
              <p className="text-sm font-bold text-gray-400 mt-2">
                Total: {globalStars} Stars
              </p>
            </div>
          ) : (
            <p className="text-lg text-gray-400 font-bold mb-8">
              Practice makes perfect!
            </p>
          )}

          {IS_DEV && devMetrics && mode === "free" && (
            <div className="mb-8 bg-gray-50 border-2 border-dashed border-gray-200 p-4 rounded-2xl text-left">
              <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <BarChart2 size={14} /> Dev Purpose Metrics
              </p>
              <div className="space-y-2 font-mono text-sm">
                {devMetrics.type === "drawing" ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Test Type:</span>
                      <span className="font-bold text-gray-800">
                        Drawing Output (PNG)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Child Expression:</span>
                      <span className="font-bold text-gray-800">
                        {devMetrics.expression}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <img
                        src={devMetrics.imageBase64}
                        alt="Child's Drawing"
                        className="w-32 h-32 border border-gray-300 rounded-xl shadow-sm object-cover"
                      />
                    </div>
                  </>
                ) : devMetrics.RedProfile !== undefined ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Color Accuracy (AR):
                      </span>
                      <span className="font-bold text-gray-800">
                        {devMetrics.AR}%
                      </span>
                    </div>
                    <div className="flex justify-between mt-2 pt-2 border-t text-xs text-red-500">
                      <span className="font-bold">Red Profile:</span>
                      <span className="font-black">
                        {devMetrics.RedProfile}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-green-500">
                      <span className="font-bold">Green Profile:</span>
                      <span className="font-black">
                        {devMetrics.GreenProfile}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-blue-500">
                      <span className="font-bold">Blue Profile:</span>
                      <span className="font-black">
                        {devMetrics.BlueProfile}%
                      </span>
                    </div>
                  </>
                ) : devMetrics.ISR !== undefined ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Success Rate (ISR):</span>
                      <span className="font-bold text-gray-800">
                        {devMetrics.ISR}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Avg Latency (AARL):</span>
                      <span className="font-bold text-gray-800">
                        {devMetrics.AARL}s
                      </span>
                    </div>
                    <div className="flex justify-between border-t mt-2 pt-2 text-xs text-gray-400">
                      <span className="font-bold">
                        Correct: {devMetrics.correctIdentifications}
                      </span>
                      <span className="font-bold">
                        Total Sounds: {devMetrics.totalPlayed}
                      </span>
                    </div>
                  </>
                ) : devMetrics.AR !== undefined ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Hits (Pairs Found):</span>
                      <span className="font-bold text-gray-800">
                        {devMetrics.targetPairs}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Selections (Moves):</span>
                      <span className="font-bold text-gray-800">
                        {devMetrics.N}
                      </span>
                    </div>
                    <div className="flex justify-between border-t mt-2 pt-2">
                      <span className="text-gray-500 font-bold">
                        Accuracy (AR):
                      </span>
                      <span className="font-black text-blue-600">
                        {devMetrics.AR}%
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Successful Hits:</span>
                      <span className="font-bold text-gray-800">
                        {devMetrics.totalHits}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Selections:</span>
                      <span className="font-bold text-gray-800">
                        {devMetrics.totalTaps}
                      </span>
                    </div>
                    <div className="flex justify-between border-t mt-2 pt-2">
                      <span className="text-gray-500 font-bold">
                        Precision (PI):
                      </span>
                      <span className="font-black text-red-600">
                        {devMetrics.PI}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-bold">
                        Mean RT (MRT):
                      </span>
                      <span className="font-black text-green-600">
                        {devMetrics.MRT}ms
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {IS_DEV && devMetrics && mode === "daily" && (
            <div className="mb-8 bg-gray-900 p-4 rounded-2xl text-left overflow-hidden">
              <p className="text-xs font-black text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1 border-b border-gray-700 pb-2">
                <BarChart2 size={14} /> Final API Data Object
              </p>
              <div className="max-h-48 overflow-y-auto">
                <pre className="font-mono text-[10px] text-gray-300">
                  {JSON.stringify(
                    devMetrics,
                    (key, val) =>
                      key === "imageBase64" ? "[Base64 PNG String]" : val,
                    2,
                  )}
                </pre>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {mode === "free" && (
              <button
                onClick={() => {
                  setGameOver(false);
                  setDevMetrics(null);
                  setIsFestival(false);
                }}
                className={`w-full ${gameDetails.color} text-white font-bold py-4 rounded-full text-lg shadow-sm hover:opacity-90 transition-all flex justify-center items-center gap-2`}
              >
                <RotateCcw size={20} /> Play Again
              </button>
            )}
            <button
              onClick={() =>
                navigate(mode === "daily" ? "/child-dashboard" : "/free-play")
              }
              className="w-full bg-gray-100 text-gray-600 font-bold py-4 rounded-full text-lg shadow-sm hover:bg-gray-200 transition-all"
            >
              {mode === "daily" ? "Back to Dashboard" : "Back to Menu"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${THEME.bgBeige} font-sans relative`}>
      <div className="max-w-4xl mx-auto p-6 py-10 flex flex-col h-full">
        <header className="flex justify-between items-center mb-10">
          {mode === "free" ? (
            <button
              onClick={() => navigate("/free-play")}
              className="bg-white border-2 border-gray-100 text-gray-600 px-5 py-3 rounded-full hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2 font-bold"
            >
              <ArrowLeft size={18} /> Quit
            </button>
          ) : mode === "daily" && !hasStartedDaily ? (
            <button
              onClick={() => navigate("/child-dashboard")}
              className="bg-white border-2 border-gray-100 text-gray-600 px-5 py-3 rounded-full hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2 font-bold"
            >
              <ArrowLeft size={18} /> Back
            </button>
          ) : (
            <div className="w-[100px]"></div>
          )}

          <div className="bg-white px-5 py-3 rounded-full font-black text-xl flex items-center shadow-sm border-2 border-gray-100 text-gray-800 text-center">
            {mode === "daily"
              ? !hasStartedDaily
                ? "Daily Tests"
                : `Test ${currentTestIndex + 1}/${testQueue.length} : ${gameDetails.title} (${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)})`
              : currentGameId === "drawing"
                ? gameDetails.title
                : `${gameDetails.title} (${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)})`}
          </div>
          <div className="bg-white px-4 py-2 rounded-full font-black text-lg flex items-center shadow-sm border-2 border-gray-100 text-gray-800">
            <Star size={18} className="mr-2 text-yellow-400 fill-yellow-400" />{" "}
            {globalStars}
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center">
          {mode === "daily" && !hasStartedDaily ? (
            <div className="bg-white p-10 rounded-[3rem] shadow-xl text-center max-w-md w-full animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Puzzle size={48} className="text-blue-500" />
              </div>
              <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                Today's Tests
              </h1>

              <div className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200 text-left">
                <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                  <TrendingUp size={18} className="text-blue-500" /> Smart
                  Adaptive Tests
                </h3>
                <p className="text-xs text-blue-700 mb-2">
                  Each test tracks your child's performance individually based
                  on speed and accuracy!
                </p>
                <ul className="text-xs font-medium text-blue-800 space-y-1">
                  <li>
                    • <strong>Pass a test:</strong> It levels up (gets harder)
                    next time.
                  </li>
                  <li>
                    • <strong>Struggle:</strong> It levels down to help them
                    practice.
                  </li>
                  <li>
                    • <strong>Stars:</strong> Earned for completing tests.
                    Harder tests give more stars!
                  </li>
                </ul>
              </div>

              <div className="space-y-4 mb-8">
                {testQueue.map((testId, index) => {
                  const details = {
                    memory: {
                      title: "Memory Match",
                      icon: <Brain size={24} fill="currentColor" />,
                      color: "bg-[#86D293]",
                      text: "text-[#86D293]",
                    },
                    reaction: {
                      title: "Reaction Bug",
                      icon: <Hand size={24} fill="currentColor" />,
                      color: "bg-[#ff5e5e]",
                      text: "text-[#ff5e5e]",
                    },
                    color: {
                      title: "Color Explorer",
                      icon: <Palette size={24} fill="currentColor" />,
                      color: "bg-[#60A5FA]",
                      text: "text-[#60A5FA]",
                    },
                    hearing: {
                      title: "Sound Explorer",
                      icon: <Ear size={24} fill="currentColor" />,
                      color: "bg-[#a78bfa]",
                      text: "text-[#a78bfa]",
                    },
                    drawing: {
                      title: "Creative Canvas",
                      icon: <PenTool size={24} fill="currentColor" />,
                      color: "bg-[#fbbf24]",
                      text: "text-[#fbbf24]",
                    },
                  }[testId];
                  return (
                    <div
                      key={testId}
                      className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border-2 border-gray-100"
                    >
                      <div
                        className={`w-12 h-12 rounded-full ${details.color} flex items-center justify-center text-white`}
                      >
                        {details.icon}
                      </div>
                      <div className="text-left flex-1 flex items-center justify-between">
                        <div>
                          <p className="font-black text-gray-400 text-xs uppercase tracking-wider">
                            Test {index + 1}
                          </p>
                          <p className={`font-black text-lg ${details.text}`}>
                            {details.title}
                          </p>
                        </div>
                        {testId !== "drawing" && (
                          <span className="text-xs font-black text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 uppercase tracking-wider shadow-sm">
                            {testDifficulties[testId]}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => setHasStartedDaily(true)}
                className={`w-full ${THEME.primaryYellow} ${THEME.textBlack} font-black py-4 px-6 rounded-full ${THEME.primaryYellowHover} transition-all hover:scale-105 shadow-sm text-xl flex items-center justify-center gap-2`}
              >
                Start <Play size={20} fill="currentColor" />
              </button>
            </div>
          ) : (
            <>
              {currentGameId === "memory" && (
                <MemoryGame
                  key={`memory-${currentTestIndex}`}
                  difficulty={currentDifficulty}
                  onFinish={handleFinish}
                />
              )}
              {currentGameId === "reaction" && (
                <ReactionGame
                  key={`reaction-${currentTestIndex}`}
                  difficulty={currentDifficulty}
                  onFinish={handleFinish}
                />
              )}
              {currentGameId === "color" && (
                <ColorGame
                  key={`color-${currentTestIndex}`}
                  difficulty={currentDifficulty}
                  onFinish={handleFinish}
                />
              )}
              {currentGameId === "hearing" && (
                <HearingGame
                  key={`hearing-${currentTestIndex}`}
                  difficulty={currentDifficulty}
                  onFinish={handleFinish}
                />
              )}
              {currentGameId === "drawing" && (
                <DrawingGame
                  key={`drawing-${currentTestIndex}`}
                  onFinish={handleFinish}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// FILE: src/main.jsx
// ============================================================================
export default function App() {
  return (
    <AppContextProvider>
      <Router>
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
