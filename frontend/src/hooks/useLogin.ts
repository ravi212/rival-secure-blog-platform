import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

export const useLogin = () => {
  const { setAuth } = useAuthContext();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const { message, token, user } = response;

      setAuth(token, user);
      toast.success(message);
    },
    onError: () => {
      toast.error("Invalid credentials");
    },
  });
};