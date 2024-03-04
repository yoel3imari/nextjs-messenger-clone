"use client";

import Avatar from "@/app/components/Avatar";
import GroupAvatar from "@/app/components/GroupAvatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ConversationBoxProps {
  data: FullConversationType;
  isSelected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  isSelected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handelClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  const hasSeen = useMemo(() => {
    if (!userEmail) return false;
    if (!lastMessage) return false;
    const seenArray = lastMessage.seen || [];
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, []);

  const lastMsgTxt = useMemo(() => {
    if (lastMessage?.image) return "sent an image";
    if (lastMessage?.body) return lastMessage.body;
    return "Started a conversation";
  }, []);

  return (
    <div
      onClick={handelClick}
      className={clsx(
        `
      p-2
      w-full
      relative
      flex
      items-center
      space-x-3
      bg-white
      hover:bg-neutral-100
      rounded-lg
      cursor-pointer
      transition
      `,
        isSelected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {
        data.isGroup ? (
          <GroupAvatar users={data.users} />
        ) : (
          <Avatar user={otherUser} />
        )
      }
      <div
        className="
          min-w-0
          flex-1
        "
      >
        <div
          className="
            focus:outline-none
          "
        >
          <div
            className="
            flex
            items-center
            justify-between
          "
          >
            <p
              className="
                text-md
                font-medium
                line-clamp-1
                text-gray-900
              "
            >
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                    text-xs
                    text-gray-400
                    font-light
                  "
              >
                {format(new Date(lastMessage?.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(`
              text-xs
              line-clamp-1`,
              hasSeen ? "text-neutral-500" : "text-neutral-900 font-semibold"
            )}
          >
            {lastMsgTxt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
