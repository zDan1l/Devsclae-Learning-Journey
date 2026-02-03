import { api } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface registerSchema {
    email : string,
    password: string
}

export const useRegister = () => {
    return useMutation({
      mutationKey: [],
      mutationFn: async ({ email, password }: registerSchema) => {
        const res = await api.post("auth/register", {
          json : {email, password}
        }).json();
        return res;
      },
      onSuccess: () => {
        toast.success("Success Register!!");
      },
      onError: (err) => {
        if (err instanceof Error) {
          toast.error(err.message);
          return;
        }
        const error = err as { error: string };
        toast.error(error.error);
      }
    });
}