import FriendBox from "./FriendBox";
import { FriendBoxInterface } from "../../interfaces/dataInterfaces";
import { useAppSelector } from "../../utils/reduxHooks";

export default function FriendList() {
  const users = useAppSelector((state) => state.users.users);
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);

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
