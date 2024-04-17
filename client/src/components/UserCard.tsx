interface props {
  userID?: string;
  username: string;
  email: string;
  image?: string;
}
export default function UserCard({ username, email }: props) {
  return (
    <div className="h-64 min-w-52 w-64 shadow-md rounded p-2 flex flex-col justify-between">
      <div className="w-full h-44 bg-red-600"></div>
      <p className="text-xl m-auto">{username}</p>
    </div>
  );
}
