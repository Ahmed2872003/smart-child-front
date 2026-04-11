import { getCurrentUser } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

const useGetUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    refetchInterval: ({ state }) => {
      const isVerified = state.data?.verifiedEmail;

      return isVerified ? false : 5 * 1000;
    },
    retry: false,
  });
};

export { useGetUser };
