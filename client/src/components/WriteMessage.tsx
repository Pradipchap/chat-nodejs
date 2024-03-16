// import Icon from "./Icon";

export default function WriteMessage() {
  return (
    <div className="absolute bottom-0 w-full gap-5 h-16 flex items-center px-2">
      <button>
        {/* <Icon name="Plus" className="bg-blue-600 p-2 rounded-full" /> */}
      </button>
      <textarea
        className="flex-1 bg-gray-700 px-5 rounded-full py-3"
        rows={1}
        placeholder="Write your Message"
        autoFocus
      />
      {/* <Icon name="Plus" className=" bg-blue-600 p-2 rounded-full" /> */}
      {/* <Icon name="Plus" className=" bg-blue-600 p-2 rounded-full" /> */}
    </div>
  );
}
