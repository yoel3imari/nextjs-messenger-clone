const EmptyState = () => {
  return (
    <div
      className="
        px-4
        py-10
        sm:px-6
        lg:px-8
        h-full
        flex
        justify-center
        items-center
        bg-gray-100
      "
    >
      <div
        className="
          text-center
          flex
          items-center
          flex-col
        "
      >
        <h3
          className="
            mt-2
            text-xl
            text-gray-950
          "
        >
          Select a chat to start a conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
