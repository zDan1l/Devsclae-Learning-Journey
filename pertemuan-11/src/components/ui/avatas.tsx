interface AvatarProps {
  username: string;
}
export function Avatar({ username }: AvatarProps) {
  return (
        <div className="bg-blue-700 text-white font-medium size-8 rounded-full flex justify-center items-center">
          {username.charAt(0)}
        </div>
  );
}
