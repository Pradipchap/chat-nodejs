export interface FriendBoxInterface {
  username: string;
  latestMessage?: string;
  time?: Date;
  isActive?: boolean;
  _id: string;
  email: string;
  phone?: "";
  image: string;
  dateofbirth: Date;
}
export interface ChatterInterface {
  _id: string;
  combinedID: string;
  latestMessage?: {
    message: string;
    sender: string;
    _id: string;
    datetime: Date;
  };
  participantDetails: {
    _id: string;
    email: string;
    username: string;
    websocketId: string;
    __v: number;
  };
}
export interface UserFetchResults {
  users: FriendBoxInterface[];
  noOfUser: number;
}

export interface LoginResult {
  accessToken: string;
  email: string;
  username: string;
  userID: string;
  websocketId: string;
}

export interface MessageInterface {
  message: string;
  time?: Date;
  isReceiver: boolean;
}

export interface DetailsObjectInterface {
  type:
    | "newUser"
    | "message"
    | "callGoi"
    | "callInc"
    | "callEnd"
    | "callReq"
    | "callRej"
    | "callAcc"
    | "callTmo"
    | "getMess";
  sender: string;
  receiver: string;
}
