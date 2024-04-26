import { Link } from "react-router-dom";
import { ChatterInterface } from "../../interfaces/dataInterfaces";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { updateCurrentChatter } from "../../redux/slices/ChatSlice";
import useDateDetails from "../../functions/useDateDetails";
import { useEffect } from "react";

export default function FriendBox({
  participantDetails,
  latestMessage,
  _id,
}: ChatterInterface) {
  console.log(latestMessage);
  const timePassed = useDateDetails(
    new Date(latestMessage?.datetime) || new Date()
  );

  useEffect(() => {
    console.log("rerendering");
  }, []);

  const primaryChatter = useAppSelector((state) => state.currentUser.userID);
  const currentChat = useAppSelector((state) => state.chat);

  const dispatch = useAppDispatch();
  if (typeof _id === "undefined") {
    return null;
  }
  const isActive = currentChat.secondaryChatter === participantDetails._id;
  function updateChatter() {
    dispatch(
      updateCurrentChatter({
        primaryChatter: primaryChatter,
        secondaryChatter: participantDetails._id,
      })
    );
  }
  return (
    <Link
      to={`chat/${participantDetails._id}`}
      onClick={updateChatter}
      className={`${
        isActive ? "bg-gray-700" : "b"
      } px-2 rounded-lg flex items-center h-16 gap-3 mt-2 w-full`}
    >
      <div className="relative w-14 h-14 bg-red-500 rounded-full">
        {/* <img
          src={image}
          alt="user image"
          height={20}
          width={20}
          className="h-full w-full rounded-full"
        /> */}
        <div className="h-3 w-3 bg-green-600 rounded-full absolute bottom-[2%] right-[10%]" />
      </div>

      <div className="flex-1 h-full py-1 flex flex-col justify-start items-start">
        {" "}
        <p className="text-lg font-bold text-white">
          {participantDetails.username}
        </p>
        <div className="flex justify-between items-center gap-2 pt-1 text-gray-400">
          <p className="text-[13px] max-w-32 truncate ">
            {latestMessage?.sender === primaryChatter
              ? "you"
              : participantDetails.username.slice(0, 5)}{" "}
            : {latestMessage?.message}
          </p>
          {latestMessage?.datetime && (
            <p className="text-[10px]">{timePassed}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
