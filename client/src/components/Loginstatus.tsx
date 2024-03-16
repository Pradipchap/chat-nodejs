// import { getServerSession } from "next-auth";

export default function Loginstatus() {
  // const session = await getServerSession();
  return (
    <div className="flex items-center gap-2">
      {/* {session?.user?.image && (
        <>
          <img
            src={session?.user?.image}
            alt="user image"
            height={50}
            width={50}
            className="h-10 w-10 rounded-full"
          />
          <p>{session?.user?.name}</p>
        </>
      )} */}
    </div>
  );
}
