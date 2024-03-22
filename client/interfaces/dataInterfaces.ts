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
export interface UserFetchResults {
  users: FriendBoxInterface[];
  noOfUser: number;
}

export interface LoginResult {
  accessToken: string;
  email: string;
  username: string;
  userID: string;
  websocketId:string
}

export interface MessageInterface {
  message: string;
  time?: Date;
  primaryChatter: string;
  secondaryChatter: string;
}
