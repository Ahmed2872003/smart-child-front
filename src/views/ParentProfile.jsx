import { useState, useRef } from "react";
import { useGetUser } from "@/hooks/user";
import { useForm } from "react-hook-form";
import InputField from "@/components/common/InputField";
import {
  User,
  Camera,
  Mail,
  Lock,
  BadgeCheck,
  AlertCircle,
  Save,
  ShieldCheck,
} from "lucide-react";
import GamifiedLoader from "./Games/GamifiedLoader";

const ParentProfile = () => {
  const userQuery = useGetUser();

  const user = userQuery.data;

  const fileInputRef = useRef(null);

  const { register } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      verifiedEmail: user?.verifiedEmail,
      photo: user?.photo,
    },
  });

  const handleImageClick = () => fileInputRef.current?.click();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log("Updating profile...", user.name);
  };

  if (userQuery.isLoading) return <GamifiedLoader />;

  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
            Parent Profile
          </h1>
          <p className="text-gray-500 font-medium">
            Manage your account settings and security
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <section className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-100">
          <form onSubmit={handleUpdateProfile} className="space-y-8">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-[#E5B427]" />
              <h2 className="text-xl font-bold">Personal Details</h2>
            </div>

            {/* Avatar Upload */}
            <div className="flex flex-col items-center sm:flex-row gap-8 pb-8 border-b border-slate-50">
              <div
                className="relative group cursor-pointer"
                onClick={handleImageClick}
              >
                <div className="w-32 h-32 rounded-full border-4 border-[#E5B427] p-1 overflow-hidden bg-slate-50">
                  <img
                    src={user.photo}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute bottom-1 right-1 bg-[#E5B427] p-2 rounded-full shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4 text-slate-900" />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => console.log(e.target.files[0])}
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-slate-900">Profile Picture</h3>
                <p className="text-sm text-slate-500 mb-3">
                  JPG, GIF or PNG. Max size of 2MB
                </p>
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="text-xs font-bold py-2 px-4 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Upload New Photo
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                type="text"
                placeholder="Display Name"
                icon={User}
                {...register("name")}
              />

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-4">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full bg-slate-100 border-none rounded-full py-4 pl-12 pr-6 text-slate-500 cursor-not-allowed font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Email Verification Banner */}
            {!user.verifiedEmail && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-orange-50 border border-orange-100 p-5 rounded-3xl">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-full shadow-sm text-orange-500">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Your email is not verified
                    </p>
                    <p className="text-xs text-slate-600">
                      Please verify your email to unlock all features.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="whitespace-nowrap bg-white text-slate-900 text-xs font-bold py-2.5 px-6 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  Send Verification
                </button>
              </div>
            )}

            {user.verifiedEmail && (
              <div className="flex items-center gap-2 text-green-600 ml-4">
                <BadgeCheck className="w-5 h-5" />
                <span className="text-sm font-bold">Verified Account</span>
              </div>
            )}

            <button
              type="submit"
              className="bg-[#E5B427] hover:bg-[#d4a520] text-slate-900 font-bold py-4 px-10 rounded-full shadow-lg shadow-yellow-100 transition-all active:scale-95 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </form>
        </section>

        {/* Section 2: Password Management */}
        <section className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-8">
            <ShieldCheck className="w-5 h-5 text-[#E5B427]" />
            <h2 className="text-xl font-bold">Security</h2>
          </div>

          <form className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-4">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border-none rounded-full py-4 pl-12 pr-6 focus:ring-2 focus:ring-[#E5B427] outline-none font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-4">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    className="w-full bg-slate-50 border-none rounded-full py-4 pl-12 pr-6 focus:ring-2 focus:ring-[#E5B427] outline-none font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-4">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    className="w-full bg-slate-50 border-none rounded-full py-4 pl-12 pr-6 focus:ring-2 focus:ring-[#E5B427] outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="bg-slate-900 text-white font-bold py-4 px-10 rounded-full hover:bg-slate-800 transition-all active:scale-95"
            >
              Update Password
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export { ParentProfile };
