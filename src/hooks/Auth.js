import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/authService";
import { toast } from "react-toastify";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const onAuthSuccess = useAuthSuccess();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => onAuthSuccess(data, [`Hello ${data.data.user.name}!`]),
  });

  return loginMutation;
};

const useSignup = () => {
  const onAuthSuccess = useAuthSuccess();

  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: (data) =>
      onAuthSuccess(data, [
        "Account created successfully!",
        "Please check your email to verify your account.",
      ]),
  });

  return signupMutation;
};

const useAuthSuccess = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleAuthSuccess = (data, successMessages) => {
    const {
      token,
      data: { user },
    } = data;

    localStorage.setItem("jwt", token);

    queryClient.setQueryData(["currentUser"], user);

    for (let sucessMsg of successMessages) toast.success(sucessMsg);

    navigate("/parent-dashboard");
  };

  return handleAuthSuccess;
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
