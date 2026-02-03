import { api } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

interface registerSchema {
  email: string;
  password: string;
}

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [],
    mutationFn: async ({ email, password }: registerSchema) => {
      const res = await api
        .post("auth/register", {
          json: { email, password },
        })
        .json();
      return res;
    },
    onSuccess: () => {
      toast.success("Success Register!! Redirecting to login...");
      setTimeout(() => {
        navigate({ to: "/login" });
      }, 500);
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
        return;
      }
      const error = err as { error: string };
      toast.error(error.error);
    },
  });
};
