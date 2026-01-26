import { userAtom } from "@/atoms/userAtom";
import { useAtomValue } from "jotai";


export function Sidebar() {
  const data = useAtomValue(userAtom);

  return (
    <div className="bg-blue-700 text-white w-xs h-full flex px-8 py-10 ">
      <div className="text-start flex flex-col gap-5">
        <div className="">Dashboard</div>
        <div className="">Course</div>
        <div className="">Bootcamp</div>
        <div className="">Settings {data.username}</div>
      </div>
    </div>
  );
}
