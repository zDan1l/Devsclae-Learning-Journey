
import { userAtom } from "@/atoms/userAtom";
import { useAtomValue } from "jotai";

export const Dashboard = () => {
  const data = useAtomValue(userAtom)

  return (
    <div className="flex-1 p-4">
      <div className="text-3xl">Welcome back, {data.username!}</div>
    </div>
  );
};
