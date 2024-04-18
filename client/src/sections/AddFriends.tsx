import { useAppSelector } from "../../utils/reduxHooks";
import SendRequestCard from "../components/SendRequestCard";

export default function AddFriends() {
  const users = useAppSelector((state) => state.users.users);
  return (
    <div className="p-2">
      <div className="">
        {users.map((user) => {
          return (
            <SendRequestCard
              key={user._id}
              username={user.username}
              email={user.email}
              userID={user._id}
            />
          );
        })}
      </div>
    </div>
  );
}
