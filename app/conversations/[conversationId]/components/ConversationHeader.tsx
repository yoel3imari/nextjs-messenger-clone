"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";

interface ConversationHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
}) => {
  const otherUser = useOtherUser(conversation);
  const [drawer, setDrawer] = useState(false);
  const statusTxt = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "active";
  }, [conversation]);

  return (
    <>
      <ProfileDrawer data={conversation} isOpen={drawer} onClose={() => setDrawer(false)} />
      <div
        className="
      bg-white
        w-full
        flex
        border-b-[1px]
        sm:px-4
        py-3
        px-4
        lg:px-6
        justify-between
        items-center
        shadow-sm
      "
      >
        <div
          className="
          flex
          gap-3
          items-center
        "
        >
          <Link
            href="/conversations"
            className="
            lg:hidden
            block
            text-sky-500
            hover:text-sky-600
            transition
            cursor-pointer
          "
          >
            <HiChevronLeft size={32} />
          </Link>
          <Avatar user={otherUser} />
          <div
            className="
            flex flex-col
          "
          >
            <div>{conversation.name || otherUser.name}</div>
            <div
              className="
              text-sm
              font-semibold
              lowercase
              text-green-600       
            "
            >
              {statusTxt}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          className="
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          hover:bg-gray-100
          rounded-md
          transition
        "
          onClick={() => setDrawer(!drawer)}
        />
      </div>
    </>
  );
};

export default ConversationHeader;
