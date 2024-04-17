import { useState } from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import { SERVER_BASE_URL } from "../../utils/constants";

interface props {
  userID?: string;
  username: string;
  email: string;
  image?: string;
}

export default function SendRequestCard({
  userID,
  username,
  email,
  image,
}: props) {
  const currentUser = useAppSelector((state) => state.currentUser);
  const [requestStatus, setrequestStatus] = useState<
    "sending" | "sucess" | "failed" | "idle"
  >("idle");
  async function sendRequest() {
    try {
      console.log("");
      const requestData = { friendID: userID };
      setrequestStatus("sending");
      const response = await fetch(SERVER_BASE_URL + "/api/sendFriendRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + " " + currentUser.accessToken,
        },
        body: JSON.stringify(requestData),
      });
      console.log("response", response);
      if (response.ok) {
        setrequestStatus("sucess");
      } else {
        throw new Error();
      }
    } catch (error) {
      setrequestStatus("failed");
      setTimeout(() => {
        setrequestStatus("idle");
      }, 5000);
    }
  }
  return (
    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow">
      current{userID}
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="/docs/images/people/profile-picture-3.jpg"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{username}</h5>
        <span className="text-sm text-gray-500">Visual Designer</span>
        <div className="flex mt-4 md:mt-6">
          <button
            onClick={sendRequest}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg"
          >
            {requestStatus === "idle" ? "Send Request" : requestStatus}
          </button>
        </div>
      </div>
    </div>
  );
}
