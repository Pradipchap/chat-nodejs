import { useEffect } from "react";
import FriendBox from "./FriendBox";
import {
  FriendBoxInterface,
  UserFetchResults,
} from "../../interfaces/dataInterfaces";
import { SERVER_BASE_URL } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { updateUsers } from "../../redux/slices/UsersSlice";
import { updateCurrentChatter } from "../../redux/slices/ChatSlice";

export default function FriendList() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);
  const primaryChatter = useAppSelector((state) => state.currentUser.userID);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${SERVER_BASE_URL}/api/users`);
        const { users }: UserFetchResults = await response.json();
        const finalUsers = users.filter((user) => {
         return user._id !== primaryChatter;
        });
        dispatch(updateUsers(finalUsers));
        dispatch(
          updateCurrentChatter({
            primaryChatter,
            secondaryChatter: finalUsers[0]._id,
          })
        );
      } catch (error) {
        dispatch(updateUsers([]));
      }
    };
    fetchUsers();
  }, []);

  if (error) {
    return <p>something wrong happened</p>;
  }
  if (loading) {
    return <p>loading</p>;
  } else
    return (
      <div>
        {users.length === 0 ? (
          <p>No users</p>
        ) : (
          users.map((element: FriendBoxInterface) => {
            return (
              <FriendBox
                key={element.username}
                username={element.username}
                _id={element._id}
                dateofbirth={element.dateofbirth}
                email={element.email}
                image={element.image}
              />
            );
          })
        )}
      </div>
    );
}
