import { useAppSelector } from "../../utils/reduxHooks";

export default function Loginstatus() {
  const session = useAppSelector((state) => state.currentUser);
  return (
    <div className="flex items-center gap-2">
      {session.accessToken && (
        <>
          {/* <img
            src={session?.user?.image}
            alt="user image"
            height={50}
            width={50}
            className="h-10 w-10 rounded-full"
          /> */}
          <p>{session.username}</p>
          <p>{session.userID}</p>
        </>
      )}
    </div>
  );
}
