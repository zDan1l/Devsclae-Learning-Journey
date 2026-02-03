import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

interface loginSchema {
  email: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: [],
    mutationFn: async ({ email, password }: loginSchema) => {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if(!res.ok) {
        throw new Error(data.error)
      }
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.accessToken)
      console.log(data)
      toast.success("Success Login, redirecting...");
      setTimeout(() => {
        navigate({to: "/"})
      }, 500)
    },
    onError : (err) => {
      if(err instanceof Error){
        toast.error(err.message)
        return
      }
      const error = err as {error : string}
      toast.error(error.error)
    }
  });
};
