
export default function Search() {

 
  // useEffect(() => {
  //   async function fetchUsers() {
  //     const response = await fetch(
  //       `${SERVER_BASE_URL}/api/users/search?searchString=${debouncedValue}`
  //     );
  //     const users: UserFetchResults = await response.json();
  //     dispatch(updateUsers(users.users));
  //   }
  //   fetchUsers();
  // }, [debouncedValue]);

  return (
    <div className="relative flex items-center rounded-lg px-2 sm:px-3 shadow-[0px_2px_10px_1px_#000000] h-10 w-full bg-gray-800">
      {/* <Icon name="Search" className="text-white px-2" /> */}
      <input
        type="search"
        name="searchString"
        id="search"
        className="outline-none h-full w-full text-white bg-gray-800"
        placeholder="Search"
      />
    </div>
  );
}
