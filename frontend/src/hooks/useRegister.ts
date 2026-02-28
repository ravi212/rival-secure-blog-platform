import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

export const useRegister = () => {
  const { setAuth } = useAuthContext();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      const { message } = response;
      toast.success(message);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Registration failed";
      toast.error(message);
    },
  });
};