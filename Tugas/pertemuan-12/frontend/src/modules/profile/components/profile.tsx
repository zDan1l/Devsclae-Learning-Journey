import { useProfile } from "../hooks/useProfile";
import { Loader } from "lucide-react"

export const Profile = () => {
  const { data, isLoading } = useProfile();

  if(isLoading) {
    <Loader />
  }
  return (
    <div className="flex gap-2 items-center">
      {data?.data.email}
      <div className="flex rounded-full bg-amber-700 justify-center items-center text-center w-10 h-10 text-white">{data?.data.email.charAt(0)}</div>
    </div>
  );
};
