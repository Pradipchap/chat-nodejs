import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

import Loginstatus from "../components/Loginstatus";
import SearchFriends from "../components/Inputs/SearchFriends";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../../utils/constants";
import {
  updateFriendRequests,
  updateFriends,
  updateUsers,
} from "../../redux/slices/UsersSlice";
import Pagination from "../components/Pagination";

function getUrlValue(url: string) {
  const strings = url.split("/");
  return strings[2];
}

export default function Friends() {
  const currentUser = useAppSelector((state) => state.currentUser);
  const [pageNo, setPageNo] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const pathname = useLocation();
  const [currentPath, setcurrentPath] = useState(
    getUrlValue(pathname.pathname)
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setcurrentPath(getUrlValue(pathname.pathname));
  }, [pathname.pathname]);

  useEffect(() => {
    async function getData() {
      try {
        const apiUrl =
          currentPath === `addFriends`
            ? `users`
            : currentPath === "friendRequests"
            ? `getFriendRequests`
            : currentPath;
        const response = await fetch(
          SERVER_BASE_URL + "/api/" + `${apiUrl}?pageNo=${pageNo}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer" + " " + currentUser.accessToken,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (currentPath === "addFriends") {
            dispatch(updateUsers(data.users));
            setTotalData(data.noOfUsers);
          } else if (currentPath === "friendRequests") {
            dispatch(updateFriendRequests(data.users));
            setTotalData(data.noOfUsers);
          } else if (currentPath === "friends") {
            console.log("first");
            dispatch(updateFriends(data.users));
            setTotalData(data.noOfUsers);
          } else {
            console.log("nothing");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [currentPath]);
  return (
    <main className="flex">
      <div className="w-[20%] bg-blue-950 border-r border-blue-900">
        <Navigation />
      </div>
      <div className="w-[80%] flex flex-col gap-10">
        <SearchFriends />
        <Outlet />
        {totalData > 0 && (
          <Pagination
            currentPage={pageNo}
            dataLength={totalData}
            dataPerPage={10}
            onPageChange={setPageNo}
          />
        )}
      </div>
    </main>
  );
}

const NavigationItems = [
  { name: "Friends", url: "friends" },
  { name: "Friend Request", url: "friendRequests" },
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
