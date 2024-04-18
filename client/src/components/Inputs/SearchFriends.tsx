import { useLocation } from "react-router-dom";
import Icon from "../Icon";
import { useEffect, useState } from "react";
import useDebounce from "../../../customHooks/useDebounce";
import { SERVER_BASE_URL } from "../../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import {
  updateFriendRequests,
  updateFriends,
  updateUsers,
} from "../../../redux/slices/UsersSlice";

function getUrlValue(url: string) {
  const strings = url.split("/");
  return strings[2];
}

export default function SearchFriends() {
  const currentUser = useAppSelector((state) => state.currentUser);
  const [input, setInput] = useState("");
  const pathname = useLocation();
  const [currentPath, setcurrentPath] = useState(
    getUrlValue(pathname.pathname)
  );
  const dispatch = useAppDispatch();
  const debouncedValue = useDebounce(input);

  useEffect(() => {
    setInput("");
    setcurrentPath(getUrlValue(pathname.pathname));
  }, [pathname.pathname]);

  useEffect(() => {
    async function getData() {
      try {
        const apiUrl =
          currentPath === "addFriends"
            ? "notFriends"
            : currentPath === "friendRequests"
            ? "getFriendRequests"
            : currentPath;
        const response = await fetch(SERVER_BASE_URL + "/api/" + apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + currentUser.accessToken,
          },
          body: JSON.stringify({ searchString: debouncedValue }),
        });
        if (response.ok) {
          const data = await response.json();
          if (currentPath === "addFriends") {
            dispatch(updateUsers(data));
          } else if (currentPath === "friendRequests") {
            dispatch(updateFriendRequests(data.friendRequests));
          } else if (currentPath === "friends") {
            dispatch(updateFriends(data));
          } else {
            console.log("nothing");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [debouncedValue, currentPath]);

  return (
    <div className="w-full max-w-4xl  mx-auto mt-10">
      <div className="relative flex items-center border-gray-200 rounded-full border w-full h-12 shadow-lg transition-all focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <Icon name="Search" />
        </div>
        <input
          className="peer h-full w-full outline-none text-lg text-gray-700 pr-2"
          type="text"
          value={input}
          id="search"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search something.."
        />
      </div>
    </div>
  );
}
