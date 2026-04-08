import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/authService";
import { toast } from "react-toastify";

const useAuth = () => {
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

  return {
    login: loginMutation,
    signup: signupMutation,
  };
};

export default useAuth;
