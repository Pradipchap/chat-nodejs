import { FriendBoxInterface } from "../../interfaces/dataInterfaces";

export default function FriendBox({
  username,
  time,
  latestMessage,
  isActive = false,
  image,
}: FriendBoxInterface) {
  return (
    <div
      className={`${
        isActive ? "bg-gray-700" : "b"
      } px-2 rounded-lg flex items-center gap-2 mt-2`}
    >
      <div className="relative w-12 h-12 bg-red-500 rounded-full">
        <img
          src={image}
          alt="user image"
          height={20}
          width={20}
          className="h-full w-full rounded-full"
        />
        <div className="h-3 w-3 bg-green-600 rounded-full absolute bottom-[2%] right-[10%]" />
      </div>

      <div className="py-2 flex-1">
        {" "}
        <p className="text-lg font-bold">{username}</p>
        <div className="flex justify-between items-center gap-2 pt-1 text-gray-400">
          <p className="text-[13px] max-w-32 truncate">{latestMessage}</p>
          <p className="text-[10px]">{time?.toDateString() || ""}</p>
        </div>
      </div>
    </div>
  );
}
