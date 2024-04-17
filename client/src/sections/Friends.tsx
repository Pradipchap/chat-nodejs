import { Outlet, useNavigate } from "react-router-dom";
import Button from "../components/Button";

import Loginstatus from "../components/Loginstatus";
export default function Friends() {
  return (
    <main className="flex">
      <div className="w-[20%] bg-blue-950 border-r border-blue-900">
        <Navigation />
      </div>
      <div className="w-[80%]">
        <Outlet />
      </div>
    </main>
  );
}

const NavigationItems = [
  { name: "Friends", url: "friends" },
  { name: "Friend Request", url: "requests" },
  { name: "Add friends", url: "addFriends" },
];
function Navigation() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="px-5 py-5 flex flex-col gap-2 items-start">
        <Button
          onClick={() => navigate("/")}
          className="text-white justify-center bg-transparent gap-2 items-center text-xl mb-10"
          iconClassName="text-white"
          icon="Back"
        >
          Back
        </Button>
        {NavigationItems.map((item) => {
          return (
            <Button
              key={item.url}
              onClick={() => navigate(item.url)}
              icon={"kj"}
              iconClassName="text-white"
              className="w-full text-white bg-transparent hover:bg-gray-200/10 gap-5 justify-start text-xl py-3"
            >
              {item.name}
            </Button>
          );
        })}
      </div>
      <Loginstatus />
    </div>
  );
}
