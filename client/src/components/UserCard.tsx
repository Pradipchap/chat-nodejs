import { useState } from "react";
import StatusButton from "./StatusButton";
import { SUBMIT_STATUS } from "../../utils/constants";

interface props {
  userID?: string;
  username: string;
  email: string;
  image?: string;
}
export default function UserCard({ username, email,userID }: props) {
  const [requestStatus, setRequestStatus] = useState<SUBMIT_STATUS>(
    SUBMIT_STATUS.IDLE
  );
  return (
    <div className="w-full max-w-[250px] h-max p-3 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col items-center justify-between">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="/docs/images/people/profile-picture-3.jpg"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{username}</h5>
        <span className="text-sm text-gray-500">{email}</span>
        <div className="flex mt-4 md:mt-6"></div>
        <div className="flex flex-col gap-2 w-full">
          <StatusButton
            idleIcon="Message"
            idleMessage="Message"
            requestStatus={requestStatus}
            onClick={() => {}}
          />
          {/* 
          <StatusButton
            idleIcon="Delete"
            className="bg-black"
            requestStatus={requestStatusDelete}
            onClick={deleteRequest}
            idleMessage="Delete Request"
            loadingMessage="Deleting"
            successMessage="Deleted"
            failedMessage="Couldn't Delete"
          /> */}
        </div>
      </div>
    </div>
  );
}
