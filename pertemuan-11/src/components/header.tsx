
import { Avatar } from "./ui/avatas";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms/userAtom";


export function Header() {
  const data = useAtomValue(userAtom);
  return (
    <header className="flex justify-between bg-gray-700 p-4 text-white">
      <div className="">Devscale Boot</div>
      <div className="flex gap-2 items-center">
        <div className="">{data.username}</div>
        <Avatar username={data.username} />
      </div>
    </header>
  );
}
