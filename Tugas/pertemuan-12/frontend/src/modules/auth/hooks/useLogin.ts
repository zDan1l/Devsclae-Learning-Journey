import { api } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

interface loginSchema {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    accessToken: string;
  };
}

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation<LoginResponse, Error, loginSchema>({
    mutationKey: [],
    mutationFn: async ({ email, password }: loginSchema) => {
      const data = await api
        .post("auth/login", {
          json: { email, password },
        })
        .json<LoginResponse>();
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.accessToken);
      console.log(data);
      toast.success("Success Login, redirecting...");
      setTimeout(() => {
        navigate({ to: "/" });
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
