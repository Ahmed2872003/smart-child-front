import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/authService";
import { toast } from "react-toastify";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      const {
        data: { user },
      } = data;

      localStorage.setItem("jwt", data.token);

      queryClient.setQueryData(["currentUser"], user);

      navigate("/parent-dashboard");
    },
  });

  return loginMutation;
};

const useSignup = () => {
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: (data) => {
      const {
        data: { user },
      } = data;

      toast.success("Account created");

      navigate("/verify-email", {
        state: { email: user.email },
      });
    },
  });

  return signupMutation;
};

const useForgotPass = () => {
  const forgotPassMutation = useMutation({
    mutationFn: authService.forgotPass,
  });

  return forgotPassMutation;
};

const useResetPass = () => {
  const navigate = useNavigate();

  const resetPassMutation = useMutation({
    mutationFn: ({ data, token }) => authService.resetPass(data, token),
    onSuccess: () => {
      toast.success("Password changed");
      navigate("/login");
    },
  });

  return resetPassMutation;
};

const useVerifyEmail = () => {
  const verifyEmailMutation = useMutation({
    mutationFn: authService.verifyEmail,
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });

  return verifyEmailMutation;
};

const useConfirmEmail = () => {
  const confirmEmailMutation = useMutation({
    mutationFn: authService.confirmEmail,
  });

  return confirmEmailMutation;
};

export {
  useLogin,
  useSignup,
  useForgotPass,
  useResetPass,
  useVerifyEmail,
  useConfirmEmail,
};
